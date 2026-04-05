import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import type { CollectionSlug } from 'payload'

type CreateCommentBody = {
  name?: string
  comment?: string
  locale?: string
}

function sanitizeText(value: string, maxLength: number): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

export async function POST(req: Request) {
  let body: CreateCommentBody

  try {
    body = (await req.json()) as CreateCommentBody
  } catch {
    return Response.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? sanitizeText(body.name, 40) : ''
  const comment = typeof body.comment === 'string' ? sanitizeText(body.comment, 1000) : ''
  const locale = typeof body.locale === 'string' ? body.locale : 'en'

  if (!name || !comment) {
    return Response.json({ error: 'Name and comment are required' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  const homeResult = await payload.find({
    collection: 'home' as CollectionSlug,
    where: {
      version: {
        equals: 'main',
      },
    },
    limit: 1,
    depth: 0,
  })

  const homeDoc = homeResult.docs[0] as any

  if (!homeDoc?.id) {
    return Response.json({ error: 'Home document not found' }, { status: 404 })
  }

  const currentComments = Array.isArray(homeDoc.comments) ? homeDoc.comments : []

  const nextComments = [
    ...currentComments,
    {
      name,
      comment,
    },
  ]

  await payload.update({
    collection: 'home' as CollectionSlug,
    id: homeDoc.id,
    data: {
      comments: nextComments,
    } as any,
  })

  revalidatePath(`/${locale}/home`)

  return Response.json({ ok: true, item: { name, comment } }, { status: 200 })
}
