import PageTitle from "../components/ui/PageTitle";

const experiences = [
  {
    image: "/draft/experiences/image (1).avif",
    user: { name: "Steven", country: "Estados Unidos" },
    master: {
      craft: "Escultura de arcilla",
      name: "Kristine & Colin",
      country: "Estados Unidos",
    },
  },
  {
    image: "/draft/experiences/image (2).avif",
    user: { name: "Sadia", country: "Qatar" },
    master: {
      craft: "Fotomontaje",
      name: "Annette",
      country: "Grecia",
    },
  },
  {
    image: "/draft/experiences/image (3).avif",
    user: { name: "Allison", country: "Estados Unidos" },
    master: {
      craft: "Ceramica Ornamental",
      name: "Alina",
      country: "Croacia",
    },
  },
  {
    image: "/draft/experiences/image (4).avif",
    user: { name: "Andrea", country: "Honk Kong" },
    master: {
      craft: "Figuras de Cerámica",
      name: "Anastasia",
      country: "España",
    },
  },
];

export default function Experiences() {
  return (
    <>
      <PageTitle>Experiencias</PageTitle>

      <ul className="m-8 flex flex-col gap-16 md:mx-0 md:flex-row md:flex-wrap md:justify-center md:gap-8">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.image} {...experience} />
        ))}
      </ul>
    </>
  );
}

type ExperienceCardProps = {
  image: string;
  user: {
    name: string;
    country: string;
  };
  master: {
    craft: string;
    name: string;
    country: string;
  };
};

function ExperienceCard({ image, user, master }: ExperienceCardProps) {
  return (
    <div className="max-w-120">
      <img src={image} className=""></img>
      <h2 className="mt-4">
        <strong>{user.name}</strong> de {user.country}. {master.craft} con{" "}
        <strong>{master.name}</strong> en {master.country}
      </h2>
    </div>
  );
}
