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

export async function POST(req) {
  try {
    const body = await req.json();

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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/stripe/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/stripe/cancel`,
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
