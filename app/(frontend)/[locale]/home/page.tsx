// app/(frontend)/[locale]/home/page.tsx
import getRequestConfig from '../../../../i18n/request';
import MasterCarousel from '@/ui/MasterCarousel';
import Image from 'next/image';

interface Props {
  params: { locale: string };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { messages } = await getRequestConfig({ requestLocale: Promise.resolve(locale) });

  // Obtenemos el contenido del home desde los mensajes del locale actual
  const home: any = (messages as any).Home || {};
  const hero: any = home.hero || {};
  const wideSections: any[] = home.wideSections || [];
  const chunkyCards: any[] = home.chunkyCards || [];
  const bottomHero: any = home.bottomHero || {};

  return (
    <>
      {/* HERO */}
      <section className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden">
        {hero?.backgroundImage && (
          <img
            src={hero.backgroundImage.url}
            alt={hero.backgroundImage.alt || 'Hero background'}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}

        <div className="relative z-10 flex flex-col items-center text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{hero?.title}</h1>
          <p className="mb-6 text-lg max-w-2xl">{hero?.subtitle}</p>

          {hero?.buttonText && (
            <button className="btn btn-wide btn-primary">
              {hero.buttonText}
            </button>
          )}
        </div>
      </section>

      {/* WIDE SECTIONS */}
      <div className="mb-8 flex flex-wrap justify-center gap-6">
        {wideSections.map((section, index) => (
          <WideCarousel
            key={index}
            image={section.image?.url}
            text={section.text}
          />
        ))}
      </div>

      {/* CHUNKY CARDS */}
      <div className="mb-8 flex flex-col gap-4">
        {chunkyCards.map((card, index) => (
          <ChunkyCard
            key={index}
            image={card.image?.url}
            title={card.title}
            description={card.description}
            link={card.linkText}
          />
        ))}
      </div>

      {/* MASTER CAROUSEL (mantenemos el mismo de antes) */}
      <div className="mb-8 px-6 md:w-screen">
        <MasterCarousel />
      </div>

      {/* BOTTOM HERO */}
      {bottomHero && (
        <div className="mb-10 flex flex-col items-center gap-4">
          {bottomHero.image?.url && (
            <img
              src={bottomHero.image.url}
              alt={bottomHero.image.alt || 'Bottom hero image'}
            />
          )}
          <h2 className="w-70 text-center text-2xl">{bottomHero.text}</h2>
          {bottomHero.buttonText && (
            <button className="btn btn-neutral">{bottomHero.buttonText}</button>
          )}
        </div>
      )}
    </>
  );
}

/* ——————————————————————————
  COMPONENTES REUTILIZADOS
—————————————————————————— */

type WideCarouselProps = {
  image: string;
  text: string;
};

function WideCarousel({ image, text }: WideCarouselProps) {
  return (
    <div className="mx-8 flex flex-col md:mx-0 md:h-60 md:w-120 md:flex-row">
      <div className="flex-2/3 overflow-hidden">
        <img src={image} className="min-h-full object-cover" />
      </div>
      <div className="text-primary-content bg-primary min-h-40 flex-1/3 p-6">
        <h3 className="text-2xl">{text}</h3>
      </div>
    </div>
  );
}

type ChunkyCardProps = {
  image: string;
  title: string;
  description: string;
  link: string;
};

function ChunkyCard({ image, title, description, link }: ChunkyCardProps) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-2/3 overflow-hidden">
        <img src={image} className="min-h-full object-cover" />
      </div>
      <div className="flex min-h-50 flex-1/3 flex-col justify-center p-6 md:pl-12">
        <h3 className="mb-4 text-3xl">{title}</h3>
        <p className="mb-8">{description}</p>
        <a className="underline decoration-0 underline-offset-4">{link}</a>
      </div>
    </div>
  );
}
