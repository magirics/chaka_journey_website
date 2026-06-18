import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { CollectionSlug } from 'payload'

type SubscribeBody = {
  name?: string
  email?: string
  locale?: string
}

const supportedLocales = new Set(['de', 'en', 'es', 'fr'])
type SubscriberData = {
  name: string
  email?: string
  locale: string
  active: boolean
}

function normalizeName(value: unknown) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, 80) : ''
}

function normalizeEmail(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase().slice(0, 254) : ''
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(req: Request) {
  let body: SubscribeBody

  try {
    body = (await req.json()) as SubscribeBody
  } catch {
    return Response.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  const name = normalizeName(body.name)
  const email = normalizeEmail(body.email)
  const locale = supportedLocales.has(body.locale || '') ? body.locale! : 'es'

  if (!name || !isValidEmail(email)) {
    return Response.json({ error: 'Name and a valid email are required' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const collection = 'subscribers' as CollectionSlug
  const existing = await payload.find({
    collection,
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const subscriber = existing.docs[0] as { id?: string | number; active?: boolean } | undefined

  if (subscriber?.id) {
    await payload.update({
      collection,
      id: subscriber.id,
      data: { name, locale, active: true } as SubscriberData,
      overrideAccess: true,
    })

    return Response.json({ ok: true, alreadySubscribed: true })
  }

  try {
    await payload.create({
      collection,
      data: { name, email, locale, active: true } as SubscriberData,
      overrideAccess: true,
    })
  } catch (error) {
    // A concurrent request may have inserted the same unique email.
    const duplicate = await payload.find({
      collection,
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (duplicate.totalDocs > 0) {
      return Response.json({ ok: true, alreadySubscribed: true })
    }

    payload.logger.error({ err: error }, 'Unable to create subscriber')
    return Response.json({ error: 'Unable to subscribe' }, { status: 500 })
  }

  return Response.json({ ok: true, alreadySubscribed: false }, { status: 201 })
}
