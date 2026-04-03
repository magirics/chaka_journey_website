import CommentsChat from "@/ui/CommentsChat";
import MasterCarousel from "@/ui/MasterCarousel";
import { useMessages } from "next-intl";

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
      <div
        className="mb-8 flex h-[70vh] w-screen flex-col justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero.backgroundImage?.url || fallbackImages.hero})`,
        }}
      >
        <div className="text-primary-content relative ml-[10vw] flex w-80 flex-col text-center">
          <h1 className="text-5xl">{hero.title || fallbackText.heroTitle}</h1>
          <h2 className="mb-6 w-70 text-right">
            {hero.subtitle || fallbackText.heroSubtitle}
          </h2>
          <button className="btn btn-wide self-end">
            {hero.buttonText || fallbackText.heroButton}
          </button>
        </div>
      </div>

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
      <div className="mb-10 flex flex-col items-center gap-4">
        <img src={bottomHero.image?.url || fallbackImages.bottomHero} />
        <h2 className="w-70 text-center text-2xl">
          {bottomHero.text || fallbackText.bottomHeroText}
        </h2>
        <button className="btn btn-neutral">
          {bottomHero.buttonText || fallbackText.bottomHeroButton}
        </button>
      </div>
    </>
  );
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
//Tarjeta de Experiencias
type ExperienceCardProps = {
  image: string;
  text: string;
  master: { name: string; craft: string; city: string; country: string };
  user: { name: string };
};


function ExperienceCard({ image, text, master, user }: ExperienceCardProps) {
  return (
    <div className="relative flex flex-col items-center md:min-w-200">
      <div>
        <img src={image} />
      </div>
      <div className="bg-primary-content relative flex flex-col items-center p-8 md:-top-10 md:w-4/5">
        <p className="pb-8">{text}</p>
        <span className="text-sm font-semibold">
          {user.name} and {master.name}
        </span>
        <span className="text-sm">
          {master.craft} - {master.city}, {master.country}
        </span>
      </div>
    </div>
  );
}