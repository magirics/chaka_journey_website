import { NextResponse } from "next/server";
import Stripe from "stripe";

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
      success_url: `${appBaseUrl}/stripe/success`,
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
