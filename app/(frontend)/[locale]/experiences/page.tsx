import PageTitle from "@/ui/PageTitle";
import { Link } from "../../components/navigation";
import { experiencesCatalog } from "@/data/experiences";

type PayloadExperience = {
  id: number | string;
  key?: string;
  user?: {
    name?: string;
    country?: string;
  };
  master?: {
    craft?: string;
    name?: string;
    country?: string;
  };
  image?: {
    url?: string;
  } | number | null;
};

async function getExperiencesFromPayload(locale: string): Promise<PayloadExperience[]> {
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000";

  try {
    const url = `${baseUrl}/api/experiences?limit=100&locale=${encodeURIComponent(locale)}&depth=1&sort=-createdAt`;
    const response = await fetch(url, { next: { revalidate: 60 } });

    if (!response.ok) return [];

    const body = await response.json();
    return Array.isArray(body?.docs) ? body.docs : [];
  } catch {
    return [];
  }
}

export default async function Experiences({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = experiencesUiByLocale[locale] || experiencesUiByLocale.en;
  const payloadExperiences = await getExperiencesFromPayload(locale);

  const payloadCards = payloadExperiences.reduce<ExperienceCardProps[]>((acc, experience) => {
    const id = (experience.key || experience.id)?.toString();
    const image =
      typeof experience.image === "object" && experience.image?.url
        ? experience.image.url
        : "";

    if (!id || !image) return acc;

    acc.push({
      id,
      locale,
      image,
      user: {
        name: experience.user?.name || "",
        country: experience.user?.country || "",
      },
      master: {
        craft: experience.master?.craft || "",
        name: experience.master?.name || "",
        country: experience.master?.country || "",
      },
    });

    return acc;
  }, []);

  const cards: ExperienceCardProps[] = payloadCards.length
    ? payloadCards
    : experiencesCatalog.map((experience) => ({
        id: experience.id,
      locale,
        image: experience.image,
        user: experience.user,
        master: experience.master,
      }));

  return (
    <>
      <PageTitle>{ui.title}</PageTitle>

      <ul className="m-8 flex flex-col gap-16 md:mx-0 md:flex-row md:flex-wrap md:justify-center md:gap-8">
        {cards.map((experience) => (
          <ExperienceCard key={experience.id} {...experience} locale={locale} />
        ))}
      </ul>
    </>
  );
}

const experiencesUiByLocale: Record<string, { title: string; from: string; with: string; in: string }> = {
  es: { title: 'Experiencias', from: 'de', with: 'con', in: 'en' },
  en: { title: 'Experiences', from: 'from', with: 'with', in: 'in' },
  fr: { title: 'Experiences', from: 'de', with: 'avec', in: 'a' },
  de: { title: 'Erlebnisse', from: 'aus', with: 'mit', in: 'in' },
};

type ExperienceCardProps = {
  id: string;
  locale: string;
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

function ExperienceCard({ id, locale, image, user, master }: ExperienceCardProps) {
  const ui = experiencesUiByLocale[locale] || experiencesUiByLocale.en;

  return (
    <li className="max-w-120 list-none">
      <Link
        href={`/experiences/${id}`}
        className="group block transition-opacity hover:opacity-90"
      >
        <img src={image} alt={user.name} />
        <h2 className="mt-4">
          <strong>{user.name}</strong> {ui.from} {user.country}. {master.craft} {ui.with}{" "}
          <strong>{master.name}</strong> {ui.in} {master.country}
        </h2>
      </Link>
    </li>
  );
}
