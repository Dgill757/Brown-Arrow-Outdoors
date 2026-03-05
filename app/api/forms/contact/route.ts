import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const webhook = process.env.GHL_CONTACT_WEBHOOK;
    if (!webhook) {
      console.error('Contact form disabled: missing GHL_CONTACT_WEBHOOK');
      return NextResponse.json(
        { error: 'Contact submissions are temporarily unavailable. Please email support@brokenarrow-outdoors.com.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const topic = String(body?.topic || '').trim();
    const message = String(body?.message || '').trim();
    const page = String(body?.page || '/contact').trim();
    const honeypot = String(body?.website || '').trim();
    const timestamp = new Date().toISOString();

    if (honeypot) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 });
    }

    const payload = { name, email, topic, message, page, timestamp };

    const result = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      return NextResponse.json({ error: 'Webhook request failed.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected contact form error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
