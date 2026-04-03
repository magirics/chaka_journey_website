import PageTitle from "@/ui/PageTitle";
import { Link } from "../../components/navigation";
import { experiencesCatalog } from "@/data/experiences";

export default function Experiences() {
  return (
    <>
      <PageTitle>Experiencias</PageTitle>

      <ul className="m-8 flex flex-col gap-16 md:mx-0 md:flex-row md:flex-wrap md:justify-center md:gap-8">
        {experiencesCatalog.map((experience) => (
          <ExperienceCard key={experience.image} {...experience} />
        ))}
      </ul>
    </>
  );
}

type ExperienceCardProps = {
  id: string;
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

function ExperienceCard({ id, image, user, master }: ExperienceCardProps) {
  return (
    <li className="max-w-120 list-none">
      <Link
        href={`/experiences/${id}`}
        className="group block transition-opacity hover:opacity-90"
      >
        <img src={image} alt={user.name} />
        <h2 className="mt-4">
          <strong>{user.name}</strong> de {user.country}. {master.craft} con{" "}
          <strong>{master.name}</strong> en {master.country}
        </h2>
      </Link>
    </li>
  );
}
