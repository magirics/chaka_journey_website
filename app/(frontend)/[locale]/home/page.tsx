import CommentsChat from "@/ui/CommentsChat";
import MasterCarousel from "@/ui/MasterCarousel";
import { Manrope } from "next/font/google";
import { useMessages } from "next-intl";
import { Link } from "@/navigation";

const vawaaSans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fallbackImages = {
  hero: "/draft/home/hero_top.jpg",
  wide: "/draft/home/wide_1.jpg",
  experience: "/draft/home/experience_card_1.avif",
  chunky: "/draft/home/chunky_1.jpg",
  bottomHero: "/draft/home/hero_bottom.jpg",
};

const fallbackText = {
  heroTitle: "Explora talleres unicos con artistas locales",
  heroSubtitle: "Descubre experiencias creativas guiadas por maestros en distintos destinos.",
  heroButton: "Explorar",
  bottomHeroText: "Reserva una experiencia autentica con un maestro local.",
  bottomHeroButton: "Ver maestros",
};

export default function Home() {
  const messages = useMessages();
  const home = (messages?.Home as Record<string, any>) || {};

  const hero = home?.hero || {};
  const wideSections = Array.isArray(home?.wideSections) ? home.wideSections : [];
  const chunkyCards = Array.isArray(home?.chunkyCards) ? home.chunkyCards : [];
  const experienceCarouselItems = Array.isArray(home?.experiences) ? home.experiences : [];
  const chatCommentsItems = Array.isArray(home?.comments)
    ? home.comments
        .filter((item: any) => item && (item.name || item.comment))
        .map((item: any) => ({
          name: item?.name || "Invitado",
          comment: item?.comment || "",
        }))
    : [];
  const bottomHero = home?.bottomHero || {};

  return (
    <>
      {/* Hero principal */}
      <section
        className={`relative mb-10 flex min-h-[calc(100vh-5rem)] w-screen items-end overflow-hidden bg-cover bg-center ${vawaaSans.className}`}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.34) 34%, rgba(0, 0, 0, 0.08) 64%, rgba(0, 0, 0, 0.08) 100%), url(${hero.backgroundImage?.url || fallbackImages.hero})`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />

        <div className="relative z-10 flex w-full justify-start px-6 pb-16 md:px-14 md:pb-24">
          <div className="grid max-w-5xl gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(240px,320px)] md:items-end md:gap-10">
            <h1 className="max-w-3xl text-[46px] leading-[0.95] font-medium tracking-[-0.05em] text-white uppercase sm:text-[60px] md:text-[82px] lg:text-[96px]">
              {hero.title || fallbackText.heroTitle}
            </h1>

            <div className="max-w-xs text-white md:pb-3">
              <p className="mb-5 text-base leading-[1.5] font-semibold tracking-[-0.015em] md:text-lg">
                {hero.subtitle || fallbackText.heroSubtitle}
              </p>
              <Link
                href={resolveHomeLink(hero.buttonText || fallbackText.heroButton)}
                className="inline-block border border-black/40 bg-white px-9 py-3 text-base font-medium tracking-[-0.015em] text-black transition hover:bg-neutral-100"
              >
                {hero.buttonText || fallbackText.heroButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secciones anchas */}
      <div className="mb-8 flex flex-wrap justify-center gap-6">
        {wideSections.map((section: any, index: number) => (
          <WideCarousel
            key={section.image?.id || index}
            image={section.image?.url || fallbackImages.wide}
            text={section?.text || "Experiencias inmersivas con enfoque artesanal."}
          />
        ))}
      </div>

      {/* Carrusel de experiencias */}
      <div className="relative max-w-screen">
        <div className="relative top-0 right-0 flex flex-col gap-4 overflow-x-scroll md:flex-row">
          {experienceCarouselItems.map((experience: any, index: number) => (
            <ExperienceCard
              key={experience.image?.id || index}
              image={experience.image?.url || fallbackImages.experience}
              master={normalizeMaster(experience?.master)}
              text={experience?.text || "Conoce una experiencia creada junto a un maestro local."}
              user={normalizeUser(experience?.user)}
            />
          ))}
        </div>
      </div>

      {/* Tarjetas gruesas */}
      <div className="mb-8 flex flex-col gap-4">
        {chunkyCards.map((card: any, index: number) => (
          <ChunkyCard
            key={card.image?.id || index}
            image={card.image?.url || fallbackImages.chunky}
            title={card?.title || "Descubre nuevos destinos"}
            description={card?.description || "Explora itinerarios creativos y encuentros unicos con maestros."}
            link={card?.linkText || "Ver mas"}
            linkHref={resolveHomeLink(card?.linkText || "")}
          />
        ))}
      </div>

      {/* Carrusel de maestros */}
      <div className="mb-8 px-6 md:w-screen">
        <MasterCarousel />
      </div>

      {/* Comentarios */}
      <CommentsChat items={chatCommentsItems} />

      {/* Hero inferior */}
      <section className={`mb-10 flex w-full flex-col items-center gap-8 px-6 py-16 md:px-14 md:py-24 ${vawaaSans.className}`}>
        <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-sm">
          <img
            src={bottomHero.image?.url || fallbackImages.bottomHero}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="max-w-2xl text-center text-3xl leading-[1.2] font-medium tracking-[-0.02em] text-neutral-900 md:text-4xl">
          {bottomHero.text || fallbackText.bottomHeroText}
        </h2>
        <Link
          href={resolveHomeLink(bottomHero.buttonText || fallbackText.bottomHeroButton)}
          className="inline-block border border-neutral-900 bg-white px-9 py-3 text-base font-medium tracking-[-0.015em] text-neutral-900 transition hover:bg-neutral-50"
        >
          {bottomHero.buttonText || fallbackText.bottomHeroButton}
        </Link>
      </section>
    </>
  );
}

function resolveHomeLink(label: string) {
  const normalized = (label || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (/(maestro|master)/.test(normalized)) return '/masters';
  if (/(experiencia|experience|explora|explore)/.test(normalized)) return '/masters';
  return '/masters';
}

function normalizeUser(user: any) {
  return {
    name: user?.name || "Invitado",
  };
}

function normalizeMaster(master: any) {
  return {
    name: master?.name || "Maestro invitado",
    craft: master?.craft || "Experiencia creativa",
    city: master?.city || "Destino por confirmar",
    country: master?.country || "",
  };
}

// COMPONENTES LOCALES

type WideCarouselProps = {
  image: string;
  text: string;
};

function WideCarousel({ image, text }: WideCarouselProps) {
  return (
    <div className="mx-6 flex flex-col overflow-hidden md:mx-0 md:h-52 md:w-120 md:flex-row">
      <div className="flex-2/3 overflow-hidden">
        <img src={image} className="min-h-full object-cover" />
      </div>
      <div className="flex min-h-40 flex-1/3 flex-col justify-center bg-neutral-50 px-8 py-6 md:px-12">
        <h3 className="text-2xl leading-[1.2] font-medium tracking-[-0.02em] text-neutral-900">
          {text}
        </h3>
      </div>
    </div>
  );
}

type ChunkyCardProps = {
  image: string;
  title: string;
  description: string;
  link: string;
  linkHref: string;
};

function ChunkyCard({ image, title, description, link, linkHref }: ChunkyCardProps) {
  return (
    <div className="mx-6 flex flex-col overflow-hidden md:mx-0 md:flex-row">
      <div className="flex-2/3 overflow-hidden">
        <img src={image} className="min-h-full object-cover" />
      </div>
      <div className="flex min-h-60 flex-1/3 flex-col justify-center bg-neutral-50 px-8 py-12 md:px-12">
        <h3 className="mb-6 text-3xl leading-[1.1] font-medium tracking-[-0.03em] text-neutral-900">
          {title}
        </h3>
        <p className="mb-8 text-base leading-[1.6] font-light text-neutral-600">
          {description}
        </p>
        <Link href={linkHref} className="inline-block w-fit border-b-2 border-neutral-900 pb-1 text-sm font-semibold tracking-[-0.01em] text-neutral-900 transition hover:border-neutral-600 hover:text-neutral-600">
          {link} →
        </Link>
      </div>
    </div>
  );
}
//Tarjeta de Experiencias
type ExperienceCardProps = {
  image: string;
  text: string;
  master: { name: string; craft: string; city: string; country: string };
  user: { name: string };
};


function ExperienceCard({ image, text, master, user }: ExperienceCardProps) {
  return (
    <div className="relative flex flex-col items-center md:min-w-72">
      <div className="overflow-hidden rounded-sm">
        <img src={image} className="h-64 w-full object-cover" />
      </div>
      <div className="relative flex w-11/12 flex-col bg-white p-6 shadow-sm md:-top-8 md:w-10/12">
        <p className="mb-6 text-sm leading-[1.6] font-light text-neutral-600">
          {text}
        </p>
        <div className="border-t border-neutral-200 pt-4">
          <p className="text-sm font-semibold tracking-[-0.01em] text-neutral-900">
            {user.name} × {master.name}
          </p>
          <p className="mt-1 text-xs font-light text-neutral-500">
            {master.craft} · {master.city}, {master.country}
          </p>
        </div>
      </div>
    </div>
  );
}