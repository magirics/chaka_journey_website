import { NextResponse } from "next/server";
import Stripe from "stripe";

// Inicializa Stripe con tu secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia", // 👈 ajusta a la versión que tengas habilitada en tu cuenta
});

export async function POST(req) {
  try {
    const body = await req.json();

    // 🔹 Datos que vienen del front
    const { name, price, days } = body;

    // 🔹 Crea la sesión en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${name} - ${days} días`,
            },
            unit_amount: price * 100, // Stripe espera centavos
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/stripe/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/stripe/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
