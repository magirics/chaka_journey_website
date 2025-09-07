import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: process.env.SERVICE_PRICE_ID, // tu precio creado en Stripe
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
