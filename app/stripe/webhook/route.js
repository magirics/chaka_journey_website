import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { fulfillCheckout } from '@/fulfillCheckout';  

export const config = {
  api: { bodyParser: false },   
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  let event;

  // Obtén el raw body como ArrayBuffer
  const buf = await req.arrayBuffer();
  const signature = req.headers.get('stripe-signature');

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Error firma webhook:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      console.log('🔔 Webhook recibido:', session.id);
      await fulfillCheckout(session.id);
      console.log('✅ Fulfillment completado para:', session.id);
    } catch (err) {
      console.error('❌ Error en fulfillCheckout:', err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
