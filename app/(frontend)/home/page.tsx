import MasterCarousel from "@/ui/MasterCarousel";

const experienceCarouselItems = [
  {
    image: "/draft/home/experience_card_1.avif",
    text: "A once in a lifetime opportunity. To experience a new country and culture through the eyes of a local persona and artist is an experience to be treasured forever.",
    master: {
      craft: "Japanese Calligraphy",
      city: "Kyoto",
      country: "Japan",
      name: "Chikako",
    },
    user: { name: "Katie" },
  },
  {
    image: "/draft/home/experience_card_2.avif",
    text: "A once in a lifetime opportunity. To experience a new country and culture through the eyes of a local persona and artist is an experience to be treasured forever.",
    master: {
      craft: "Japanese Calligraphy",
      city: "Kyoto",
      country: "Japan",
      name: "Chikako",
    },
    user: { name: "Katie" },
  },
  {
    image: "/draft/home/experience_card_3.avif",
    text: "A once in a lifetime opportunity. To experience a new country and culture through the eyes of a local persona and artist is an experience to be treasured forever.",
    master: {
      craft: "Japanese Calligraphy",
      city: "Kyoto",
      country: "Japan",
      name: "Chikako",
    },
    user: { name: "Katie" },
  },
];

export default function Home() {
  return (
    <>
      <div className="mb-8 flex h-[70vh] w-screen flex-col justify-center bg-[url('/draft/home/hero_top.jpg')]">
        <div className="text-primary-content relative ml-[10vw] flex w-80 flex-col text-center">
          <h1 className="text-5xl">EXPERIENCIAS INOLVIDABLES CON UN MAESTRO</h1>
          <h2 className="mb-6 w-70 text-right">
            Reserva unos dias con un maestro experto en aun arte unico. Yay o
            nah?
          </h2>
          <button className="btn btn-wide self-end">Explora</button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-6">
        <WideCarousel image="/draft/home/wide_1.jpg" text="Join Us Online" />
        <WideCarousel image="/draft/home/wide_2.jpg" text="Follow The Rabbit" />
      </div>

      <div className="relative max-w-screen">
        <div className="relative top-0 right-0 flex flex-col gap-4 overflow-x-scroll md:flex-row">
          {experienceCarouselItems.map((experiece) => (
            <ExperienceCard
              key={experiece.image}
              image={experiece.image}
              master={experiece.master}
              text={experiece.text}
              user={experiece.user}
            ></ExperienceCard>
          ))}
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4">
        <ChunkyCard
          image="/draft/home/chunky_1.jpg"
          title="Una nueva forma de viajar"
          description="VAWAA is a mini-apprenticeship with a curated master artist or craftsman, tailored to your skill level."
          link="How it Works"
        />
        <ChunkyCard
          image="/draft/home/chunky_2.jpg"
          title="A lifelong souvenir"
          description="Whether it’s honing a passion or getting fresh inspiration, we see travel as an opportunity to grow."
          link="Read guest stories"
        />
      </div>

      <div className="mb-8 px-6 md:w-screen">
        <MasterCarousel />
      </div>

      <div className="mb-10 flex flex-col items-center gap-4">
        <img src="/draft/home/hero_bottom.jpg" />
        <h2 className="w-70 text-center text-2xl">
          Rekindle your crush on the world. Book a VAWAA today.
        </h2>
        <button className="btn btn-neutral">Busca a tu maestro</button>
      </div>
    </>
  );
}

/*
  Thick
  Big
  Overlap
  Like MasterCard
*/

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
        <img src={image}></img>
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
