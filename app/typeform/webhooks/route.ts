import configPromise from '@payload-config'
import crypto from 'crypto'
import { getPayload } from 'payload'
import type { CollectionSlug } from 'payload'

type TypeformWebhookBody = {
  event_id?: string
  event_type?: string
  form_response?: {
    form_id?: string
    token?: string
    landed_at?: string
    submitted_at?: string
    hidden?: Record<string, unknown>
    calculated?: Record<string, unknown>
    answers?: unknown[]
    response_id?: string
  }
}

function timingSafeCompare(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) return false
  return crypto.timingSafeEqual(aBuffer, bBuffer)
}

function isValidTypeformSignature(rawBody: string, signatureHeader: string, secret: string): boolean {
  const normalized = signatureHeader.trim()
  const expectedBase64 = `sha256=${crypto.createHmac('sha256', secret).update(rawBody).digest('base64')}`
  const expectedHex = `sha256=${crypto.createHmac('sha256', secret).update(rawBody).digest('hex')}`

  return timingSafeCompare(normalized, expectedBase64) || timingSafeCompare(normalized, expectedHex)
}

export async function POST(req: Request) {
  const signatureHeader = req.headers.get('typeform-signature')
  const webhookSecret = process.env.TYPEFORM_WEBHOOK_SECRET?.trim()

  const rawBody = await req.text()

  if (!webhookSecret) {
    return Response.json({ error: 'TYPEFORM_WEBHOOK_SECRET is not configured' }, { status: 500 })
  }

  if (!signatureHeader || !isValidTypeformSignature(rawBody, signatureHeader, webhookSecret)) {
    return Response.json({ error: 'Invalid Typeform signature' }, { status: 401 })
  }

  let body: TypeformWebhookBody

  try {
    body = JSON.parse(rawBody) as TypeformWebhookBody
  } catch {
    return Response.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  const response = body.form_response

  // Typeform's unique response identifier is `token` — `response_id` is not sent in standard webhooks
  const responseId = response?.token

  if (!responseId || !response?.form_id || !response?.submitted_at) {
    return Response.json({ error: 'Missing required Typeform fields' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  const existing = await payload.find({
    collection: 'typeform-submissions' as CollectionSlug,
    where: {
      responseId: {
        equals: responseId,
      },
    },
    limit: 1,
  })

  if (existing.totalDocs > 0) {
    return Response.json({ ok: true, message: 'Already processed' }, { status: 200 })
  }

  await payload.create({
    collection: 'typeform-submissions' as CollectionSlug,
    data: {
      responseId: responseId,
      formId: response.form_id,
      submittedAt: response.submitted_at,
      landedAt: response.landed_at,
      token: response.token,
      hidden: response.hidden,
      calculated: response.calculated,
      answers: response.answers,
      rawPayload: body,
    } as any,
  })

  return Response.json({ ok: true }, { status: 200 })
}
