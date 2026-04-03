import { NextResponse } from 'next/server';
import { fulfillCheckout } from '../../fulfillCheckout';

export async function POST(req) {
  try {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
    }

    const body = await req.json();
    const sessionId = body?.sessionId;
    if (!sessionId) return NextResponse.json({ error: 'sessionId required' }, { status: 400 });

    console.log('Debug trigger: calling fulfillCheckout with', sessionId);
    await fulfillCheckout(sessionId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Debug trigger error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
