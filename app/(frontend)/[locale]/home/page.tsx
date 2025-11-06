import CommentsChat from "@/ui/CommentsChat";
import MasterCarousel from "@/ui/MasterCarousel";
import { useMessages } from "next-intl";

export default function Home() {
  const messages = useMessages();
  const home = messages?.Home;

  const hero = home?.hero || {};
  const wideSections = home?.wideSections || [];
  const chunkyCards = home?.chunkyCards || [];
  const experienceCarouselItems = home?.experiences || [];
  const chatCommentsItems = home?.comments || [];
  const bottomHero = home?.bottomHero || {};

  return (
    <>
      {/* Hero principal */}
      <div
        className="mb-8 flex h-[70vh] w-screen flex-col justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero.backgroundImage?.url || "/fallback.jpg"})`,
        }}
      >
        <div className="text-primary-content relative ml-[10vw] flex w-80 flex-col text-center">
          <h1 className="text-5xl">{hero.title}</h1>
          <h2 className="mb-6 w-70 text-right">{hero.subtitle}</h2>
          <button className="btn btn-wide self-end">{hero.buttonText}</button>
        </div>
      </div>

      {/* Secciones anchas */}
      <div className="mb-8 flex flex-wrap justify-center gap-6">
        {wideSections.map((section, index) => (
          <WideCarousel
            key={section.image?.id || index}
            image={section.image?.url || "/fallback.jpg"}
            text={section.text}
          />
        ))}
      </div>

      {/* Carrusel de experiencias */}
      <div className="relative max-w-screen">
        <div className="relative top-0 right-0 flex flex-col gap-4 overflow-x-scroll md:flex-row">
          {experienceCarouselItems.map((experience, index) => (
            <ExperienceCard
              key={experience.image?.id || index}
              image={experience.image?.url || "/fallback.jpg"}
              master={experience.master}
              text={experience.text}
              user={experience.user}
            />
          ))}
        </div>
      </div>

      {/* Tarjetas gruesas */}
      <div className="mb-8 flex flex-col gap-4">
        {chunkyCards.map((card, index) => (
          <ChunkyCard
            key={card.image?.id || index}
            image={card.image?.url || "/fallback.jpg"}
            title={card.title}
            description={card.description}
            link={card.linkText}
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
        <img src={bottomHero.image?.url || "/fallback.jpg"} />
        <h2 className="w-70 text-center text-2xl">{bottomHero.text}</h2>
        <button className="btn btn-neutral">{bottomHero.buttonText}</button>
      </div>
    </>
  );
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