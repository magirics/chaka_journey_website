import { RichText } from '@payloadcms/richtext-lexical/react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

const images = [
  "/draft/experiences/experience/image_1.avif",
  "/draft/experiences/experience/image_2.avif",
  "/draft/experiences/experience/image_3.avif",
  "/draft/experiences/experience/image_4.avif",
  "/draft/experiences/experience/image_5.avif",
  "/draft/experiences/experience/image_6.avif",
];

// Convierte los nodos del editor de Payload (RichText)
const jsxConverters = ({ defaultConverters }: { defaultConverters: any }) => ({
  ...defaultConverters,

  "upload": ({ node }: { node: any }) => {
    const url = node.value.url;
    const alt = node.value.alt;
    return (
      <img src={url} alt={alt} width='100%' className="mx-auto my-1 max-w-150" />
    );
  },

});

// ✅ Nueva versión con soporte multilenguaje e i18n
export default async function ExperiencePage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;

  // Fetch a la API de Payload (dinámico según locale)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/experiences/${id}?locale=${locale}`,
    { next: { revalidate: 60 } } // cache 1 minuto (opcional)
  );

  if (!res.ok) return notFound();
  const body = await res.json();
  const data = body?.doc || body;

  // Si tu colección tiene campos `user` y `master` ya asociados, puedes extraerlos directamente:
  const user = data?.user || { name: 'Samantha', country: 'Estados Unidos' };
  const master = data?.master || { name: 'Merlyn', country: 'Reino Unido' };

  // Si también defines traducciones globales en i18n, las puedes cargar así:
  const t = await getTranslations( 'Experiences');

  return (
    <main className="mx-auto my-16 max-w-4xl px-4">
      <h1 className="text-5xl font-semibold">{data?.title || user.name}</h1>

      <small className="inline-block pb-4 text-gray-500">
        {user.country} | {t('with')} {master.name} {t('in')} {master.country}
      </small>

      {data?.content ? (
        <RichText converters={jsxConverters} data={data.content} />
      ) : (
        <p className="text-gray-600">{t('noContent')}</p>
      )}
    </main>
  );
}
