import { RichText } from '@payloadcms/richtext-lexical/react'
import type { ComponentProps } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchCollectionFirstDoc } from '../../../../i18n/request'

type PageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

type SectionDocument = {
  title?: string | null
  intro?: string | null
  content?: ComponentProps<typeof RichText>['data'] | null
}

type UploadNode = {
  value?: {
    url?: string | null
    alt?: string | null
  } | null
}

async function getSection(locale: string, slug: string): Promise<SectionDocument | null> {
  const searchParams = [
    `locale=${encodeURIComponent(locale)}`,
    'where[version][equals]=main',
    `where[slug][equals]=${encodeURIComponent(slug)}`,
    'limit=1',
    'depth=1',
  ].join('&')

  const section = (await fetchCollectionFirstDoc(`sections?${searchParams}`)) as SectionDocument
  return section?.title ? section : null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const section = await getSection(locale, slug)

  return section
    ? {
        title: `${section.title} | Chaka Journey`,
        description: section.intro || undefined,
      }
    : {}
}

const richTextConverters: NonNullable<ComponentProps<typeof RichText>['converters']> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  upload: ({ node }: { node: UploadNode }) => {
    const value = typeof node.value === 'object' ? node.value : null
    const url = value?.url
    if (!url) return null

    return (
      <img
        src={url}
        alt={value?.alt || ''}
        className="my-8 h-auto w-full object-cover"
      />
    )
  },
})

export default async function SectionPage({ params }: PageProps) {
  const { locale, slug } = await params
  const section = await getSection(locale, slug)

  if (!section) notFound()

  return (
    <article className="w-full px-6 py-16 md:px-14 md:py-24">
      <header className="mx-auto max-w-4xl border-b border-neutral-200 pb-10">
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-6xl">
          {section.title}
        </h1>
        {section.intro ? (
          <p className="mt-6 max-w-3xl text-lg leading-8 font-light text-neutral-600 md:text-xl">
            {section.intro}
          </p>
        ) : null}
      </header>

      {section.content ? (
        <section className="mx-auto mt-10 max-w-4xl text-lg leading-8 text-neutral-800 [&_a]:underline [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:text-3xl [&_h2]:font-semibold [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-2xl [&_h3]:font-semibold [&_li]:ml-6 [&_ol]:my-5 [&_ol]:list-decimal [&_p]:mb-5 [&_strong]:font-semibold [&_ul]:my-5 [&_ul]:list-disc">
          <RichText converters={richTextConverters} data={section.content} />
        </section>
      ) : null}
    </article>
  )
}
