import { RichText } from '@payloadcms/richtext-lexical/react';
import type { ComponentProps } from 'react';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { experiencesCatalog } from '@/data/experiences';

type MediaImage = {
  url?: string | null;
  alt?: string | null;
};

type Person = {
  name?: string | null;
  country?: string | null;
  craft?: string | null;
};

type ExperienceDocument = {
  title?: string | null;
  content?: ComponentProps<typeof RichText>['data'] | null;
  image?: MediaImage | string | null;
  user?: Person | null;
  master?: Person | null;
};

type MessagesObject = {
  Experiences?: Partial<Record<'with' | 'in' | 'noContent', string>>;
};

// Convierte los nodos del editor de Payload (RichText)
const jsxConverters: NonNullable<ComponentProps<typeof RichText>['converters']> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,

  "upload": ({ node }) => {
    const value =
      typeof node.value === 'object' && node.value !== null ? (node.value as MediaImage) : null;
    const url = value?.url;
    const alt = value?.alt;
    if (!url) return null;

    return (
      <img
        src={url}
        alt={alt || ''}
        width="100%"
        className="mx-auto mt-8 mb-2 w-full max-w-[980px] object-cover"
      />
    );
  },

});

//  Nueva versión con soporte multilenguaje e i18n
export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  // Paralelizar los awaits para evitar problemas de Next.js con múltiples awaits
  const [{ locale, id }, messages] = await Promise.all([
    params,
    getMessages().catch(() => ({})),
  ]);

  const fallbackByLocale: Record<string, { with: string; in: string; noContent: string }> = {
    es: { with: 'con', in: 'en', noContent: 'Sin contenido disponible.' },
    en: { with: 'with', in: 'in', noContent: 'No content available.' },
    fr: { with: 'avec', in: 'a', noContent: 'Aucun contenu disponible.' },
    de: { with: 'mit', in: 'in', noContent: 'Kein Inhalt verfugbar.' },
  };

  const fallbackExperience = experiencesCatalog.find(
    (experience) => experience.id === id
  );
  const isNumericId = /^\d+$/.test(id);

  // Prioriza Payload: por ID numerico o por clave personalizada (key).
  let data: ExperienceDocument | null = null;
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';
  
  try {
    const url = isNumericId
      ? `${baseUrl}/api/experiences/${id}?locale=${locale}&depth=1`
      : `${baseUrl}/api/experiences?where[key][equals]=${encodeURIComponent(id)}&limit=1&locale=${locale}&depth=1`;

    const res = await fetch(url, { next: { revalidate: 60 } });

    if (res.ok) {
      const body = (await res.json()) as {
        doc?: ExperienceDocument;
        docs?: ExperienceDocument[];
      } & ExperienceDocument;
      data = isNumericId ? (body?.doc || body) : (body?.docs?.[0] || null);
    }
  } catch {
    data = null;
  }

  if (!data && !fallbackExperience) return notFound();

  // Si tu colección tiene campos `user` y `master` ya asociados, puedes extraerlos directamente:
  const user =
    data?.user ||
    fallbackExperience?.user || { name: 'Samantha', country: 'Estados Unidos' };
  const master =
    data?.master ||
    fallbackExperience?.master || { name: 'Merlyn', country: 'Reino Unido' };
  const craft =
    data?.master?.craft ||
    fallbackExperience?.master?.craft ||
    '';

  // Si falta el namespace en mensajes, usamos fallback para evitar MISSING_MESSAGE.
  const localeFallback = fallbackByLocale[locale] || fallbackByLocale.en;
  const messagesObj = messages as MessagesObject;
  const tt = (key: 'with' | 'in' | 'noContent') =>
    messagesObj?.Experiences?.[key] || localeFallback[key];

  const detailTitle = user?.name || data?.title || fallbackExperience?.title;
  const payloadImageUrl =
    typeof data?.image === 'object' && data?.image?.url
      ? data.image.url
      : null;
  const payloadImageAlt =
    typeof data?.image === 'object' && typeof data?.image?.alt === 'string' && data.image.alt.trim()
      ? data.image.alt
      : detailTitle;

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-8 md:py-14">
      <header className="max-w-[1020px]">
        <h1 className="text-4xl font-semibold tracking-tight text-black md:text-5xl">
          {detailTitle}
        </h1>
        <small className="mt-2 inline-block text-sm text-slate-500 md:text-base">
          {user.country} | {craft} {tt('with')} {master.name}
        </small>
      </header>

      {payloadImageUrl ? (
        <img
          src={payloadImageUrl}
          alt={payloadImageAlt}
          className="mx-auto mt-8 w-full max-w-[980px] object-cover"
        />
      ) : null}

      {data?.content ? (
        <section className="mt-6 max-w-[1080px] text-[19px] leading-relaxed text-slate-900 [&_p]:mb-5 [&_strong]:font-semibold md:text-[20px]">
          <RichText converters={jsxConverters} data={data.content} />
        </section>
      ) : fallbackExperience?.story?.length ? (
        <section className="mt-6 max-w-[1080px] space-y-5 text-[19px] leading-relaxed text-slate-900 md:text-[20px]">
          {fallbackExperience.story.map((paragraph, index) => (
            <p key={`${fallbackExperience.id}-${index}`}>{paragraph}</p>
          ))}
          <img
            src={fallbackExperience.image}
            alt={fallbackExperience.title}
            className="mx-auto mt-8 w-full max-w-[980px] object-cover"
          />
        </section>
      ) : (
        <p className="mt-6 text-lg text-slate-600">{tt('noContent')}</p>
      )}
    </main>
  );
}
