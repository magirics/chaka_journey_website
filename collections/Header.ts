import type { CollectionConfig, CollectionSlug } from 'payload'

const LOCALES = new Set(['en', 'es', 'de', 'fr'])
const RESERVED_NAV_SLUGS = new Set([
  'home',
  'masters',
  'experiences',
  'us',
  'contact',
  'gift',
  'favorites',
  'privacy',
  'terms',
  'be-a-master',
  'admin',
])

const toSectionSlugFromHref = (href?: string | null): string | null => {
  if (!href || typeof href !== 'string') return null
  const trimmed = href.trim()
  if (!trimmed || /^https?:\/\//i.test(trimmed)) return null

  try {
    const pathname = new URL(trimmed, 'https://chaka.local').pathname
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length === 0) return null

    const withoutLocale = LOCALES.has(parts[0]?.toLowerCase()) ? parts.slice(1) : parts
    if (withoutLocale.length !== 1) return null

    const slug = withoutLocale[0].toLowerCase()
    if (!/^[a-z0-9-]+$/.test(slug)) return null
    if (RESERVED_NAV_SLUGS.has(slug)) return null

    return slug
  } catch {
    return null
  }
}

const toTitle = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ')

export const Header: CollectionConfig = {
  slug: 'header',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const sectionsCollection = 'sections' as unknown as CollectionSlug
        const links = Array.isArray(doc?.links) ? doc.links : []
        const slugs = new Set<string>()

        for (const link of links) {
          const slug = toSectionSlugFromHref(link?.href)
          if (slug) slugs.add(slug)
        }

        for (const slug of slugs) {
          const existing = await req.payload.find({
            collection: sectionsCollection,
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 0,
          })

          if (existing.totalDocs > 0) continue

          await req.payload.create({
            collection: sectionsCollection,
            data: {
              version: 'main',
              slug,
              title: toTitle(slug),
              intro: 'Edita este contenido desde Payload CMS.',
            } as any,
          })
        }
      },
    ],
  },
  fields: [
    {
      name: 'version',
      type: 'text',
    },
    {
      name: 'links',
      label: 'Navigation links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social links',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon file name inside /public/icons without .svg',
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
  ],
}
