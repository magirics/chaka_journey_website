import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPayload } from "payload";
import config from "../../../payload.config";

// Inicializa Stripe con tu secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia", // 👈 ajusta a la versión que tengas habilitada en tu cuenta
});

function sanitizeMetadataText(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function normalizeBaseUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return null;

  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;

  try {
    return new URL(candidate).origin;
  } catch {
    return null;
  }
}

function resolveAppBaseUrl(req) {
  const fromEnv = normalizeBaseUrl(process.env.NEXT_PUBLIC_APP_URL);
  if (fromEnv) return fromEnv;

  const forwardedHost = req.headers.get('x-forwarded-host');
  const forwardedProto = req.headers.get('x-forwarded-proto') || 'http';
  if (forwardedHost) {
    const fromForwarded = normalizeBaseUrl(`${forwardedProto}://${forwardedHost}`);
    if (fromForwarded) return fromForwarded;
  }

  const host = req.headers.get('host');
  if (host) {
    const fromHost = normalizeBaseUrl(`http://${host}`);
    if (fromHost) return fromHost;
  }

  try {
    return new URL(req.url).origin;
  } catch {
    return null;
  }
}

function startOfUtcDay(input) {
  const date = new Date(input);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
}

function endOfUtcDay(input) {
  const date = new Date(input);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));
}

function isValidDate(value) {
  return typeof value === "string" && value.trim() !== "" && !Number.isNaN(new Date(value).getTime());
}

async function validateReservationAvailability({ masterId, startDate, endDate }) {
  if (!masterId || !isValidDate(startDate) || !isValidDate(endDate)) {
    return {
      ok: false,
      status: 400,
      error: "Selecciona fechas válidas antes de continuar con el pago.",
    };
  }

  const start = startOfUtcDay(startDate);
  const end = endOfUtcDay(endDate);

  if (start > end) {
    return {
      ok: false,
      status: 400,
      error: "La fecha final no puede ser anterior a la fecha inicial.",
    };
  }

  const payload = await getPayload({ config });
  let master;

  try {
    master = await payload.findByID({
      collection: "masters",
      id: masterId,
    });
  } catch {
    return {
      ok: false,
      status: 404,
      error: "No pudimos encontrar al maestro seleccionado.",
    };
  }

  const availability = Array.isArray(master?.availability) ? master.availability : [];
  const isInsideAvailability = availability.some((period) => {
    if (!isValidDate(period?.from) || !isValidDate(period?.to)) return false;
    return start >= startOfUtcDay(period.from) && end <= endOfUtcDay(period.to);
  });

  if (!isInsideAvailability) {
    return {
      ok: false,
      status: 409,
      error: "Las fechas seleccionadas están fuera de la disponibilidad del maestro.",
    };
  }

  const overlapping = await payload.find({
    collection: "reserves",
    where: {
      and: [
        {
          or: [
            { masterRef: { equals: String(master.id) } },
            { master: { equals: master.id } },
          ],
        },
        { startDate: { less_than_equal: end.toISOString() } },
        { endDate: { greater_than_equal: start.toISOString() } },
        { status: { equals: "paid" } },
      ],
    },
    limit: 1,
  });

  if (overlapping.totalDocs > 0) {
    return {
      ok: false,
      status: 409,
      error: "Estas fechas ya están reservadas. Selecciona otro rango para continuar.",
    };
  }

  return { ok: true };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const appBaseUrl = resolveAppBaseUrl(req);

    if (!appBaseUrl) {
      console.error('CreateCheckoutSession: invalid app base URL. Check NEXT_PUBLIC_APP_URL and request headers.');
      return NextResponse.json(
        { error: 'Server misconfiguration: invalid app URL' },
        { status: 500 }
      );
    }

    // 🔹 Datos que vienen del front
    const { name, price, days } = body;
    const checkoutType = body.checkoutType === 'gift' ? 'gift' : 'reserve';
    const safePrice = Number(price) || 0;
    const safeDeliveryFee = Number(body.deliveryFee) || 0;
    const recipientName = sanitizeMetadataText(body.recipientName, 120);
    const deliveryAddress = sanitizeMetadataText(body.deliveryAddress, 450);
    const giftNote = sanitizeMetadataText(body.giftNote, 450);
    const subtotalAmount = safePrice;
    const totalAmount = checkoutType === 'gift' ? safePrice + safeDeliveryFee : safePrice;
    const productName =
      checkoutType === 'gift'
        ? `${name} - Regalo ${body.giftType === 'digital' ? 'Digital' : 'Fisico'}`
        : `${name} - ${days} dias`;

    if (checkoutType === "reserve") {
      const availability = await validateReservationAvailability({
        masterId: body.masterId,
        startDate: body.startDate,
        endDate: body.endDate,
      });

      if (!availability.ok) {
        return NextResponse.json(
          { error: availability.error, code: "RESERVATION_UNAVAILABLE" },
          { status: availability.status }
        );
      }
    }

    // 🔹 Crea la sesión en Stripe
    console.log('CreateCheckoutSession: body payload', {
      name,
      price,
      days,
      checkoutType,
      giftId: body.giftId,
      giftType: body.giftType,
      deliveryFee: safeDeliveryFee,
      recipientName,
      deliveryAddress,
      giftNote,
      masterId: body.masterId,
      startDate: body.startDate,
      endDate: body.endDate,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(totalAmount * 100), // Stripe espera centavos
          },
          quantity: 1,
        },
      ],
      success_url: `${appBaseUrl}/stripe/success?checkout_type=${checkoutType}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appBaseUrl}/stripe/cancel`,
      metadata: {
        checkoutType,
        giftId: body.giftId || '',
        giftType: body.giftType || '',
        recipientName,
        deliveryAddress,
        giftNote,
        masterId: body.masterId || '',
        startDate: body.startDate || '',
        endDate: body.endDate || '',
        subtotalAmount: String(subtotalAmount),
        deliveryFee: String(safeDeliveryFee),
      },
    });

    console.log('CreateCheckoutSession: created session id', session.id);
    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
