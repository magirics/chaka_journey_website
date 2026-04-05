"use client";

import { Link } from "@/navigation";
import MasterCard from "@/ui/MasterCard";
import Pricing from "@/ui/Pricing";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";

type PayloadMaster = {
  id: number | string;
  image?: {
    url?: string;
  } | null;
  name?: string | Record<string, string | undefined>;
  title?: string;
  specialty?: string | Record<string, string | undefined>;
  city?: string | Record<string, string | undefined>;
  country?: string | Record<string, string | undefined>;
  price?: number;
  days?: number;
};

type MasterCardData = {
  id: string;
  image: string;
  on_hover_image: string;
  name: string;
  craft: string;
  city: string;
  country: string;
  price: number;
  days: number;
};

const FAVORITES_STORAGE_KEY = "chaka_favorite_masters";

const uiByLocale: Record<string, {
  title: string;
  subtitle: string;
  empty: string;
  browseMasters: string;
  withLabel: string;
  daysLabel: string;
}> = {
  es: {
    title: "Tus maestros guardados",
    subtitle: "Maestros que guardaste para revisarlos luego.",
    empty: "Aun no tienes maestros en guardado.",
    browseMasters: "Ir a Maestros",
    withLabel: "con",
    daysLabel: "dias",
  },
  en: {
    title: "Your saved",
    subtitle: "Masters you saved to revisit later.",
    empty: "You do not have favorite masters yet.",
    browseMasters: "Go to Masters",
    withLabel: "with",
    daysLabel: "days",
  },
  fr: {
    title: "Votre enregistre",
    subtitle: "Maitres que vous avez enregistres pour plus tard.",
    empty: "Vous n'avez pas encore de maitres favoris.",
    browseMasters: "Voir les maitres",
    withLabel: "avec",
    daysLabel: "jours",
  },
  de: {
    title: "Dein Gespeichert",
    subtitle: "Meister, die du fur spater gespeichert hast.",
    empty: "Du hast noch keine Favoriten.",
    browseMasters: "Zu den Meistern",
    withLabel: "mit",
    daysLabel: "Tage",
  },
};

function pickLocalizedText(
  value: string | Record<string, string | undefined> | undefined,
  locale: string,
): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  const localePriority = [locale, "en", "es", "fr", "de"];
  for (const code of localePriority) {
    const candidate = value[code];
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  for (const candidate of Object.values(value)) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  return "";
}

export default function FavoritesPage() {
  const locale = useLocale();
  const ui = uiByLocale[locale] || uiByLocale.en;

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [masters, setMasters] = useState<MasterCardData[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const ids = Array.isArray(parsed) ? parsed.map((value) => String(value)) : [];
      setFavoriteIds(ids);
    } catch {
      setFavoriteIds([]);
    }
  }, []);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setMasters([]);
      return;
    }

    let isCancelled = false;

    const fetchMasters = async () => {
      try {
        const res = await fetch(`/api/masters?limit=200&locale=all&depth=1&where[active][equals]=true`);
        if (!res.ok) {
          if (!isCancelled) setMasters([]);
          return;
        }

        const body = await res.json();
        const docs = Array.isArray(body?.docs) ? (body.docs as PayloadMaster[]) : [];

        const parsed = docs.reduce<MasterCardData[]>((acc, doc) => {
          const id = String(doc.id);
          if (!favoriteIds.includes(id)) return acc;

          const image =
            typeof doc.image === "object" && doc.image?.url
              ? doc.image.url
              : "";

          if (!image) return acc;

          acc.push({
            id,
            image,
            on_hover_image: image,
            name: pickLocalizedText(doc.name, locale) || doc.title || "Master",
            craft: pickLocalizedText(doc.specialty, locale) || "Experience",
            city: pickLocalizedText(doc.city, locale),
            country: pickLocalizedText(doc.country, locale),
            price: typeof doc.price === "number" ? doc.price : 0,
            days: typeof doc.days === "number" ? doc.days : 1,
          });

          return acc;
        }, []);

        if (!isCancelled) {
          setMasters(parsed);
        }
      } catch {
        if (!isCancelled) setMasters([]);
      }
    };

    fetchMasters();

    return () => {
      isCancelled = true;
    };
  }, [favoriteIds, locale]);

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const handleReserve = async (master: MasterCardData) => {
    const res = await fetch("/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: master.name,
        price: master.price,
        days: master.days,
        masterId: master.id,
      }),
    });

    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  const toggleFavorite = (masterId: string) => {
    setFavoriteIds((current) => {
      const next = current.includes(masterId)
        ? current.filter((id) => id !== masterId)
        : [...current, masterId];

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event('chaka-favorites-updated'));
      return next;
    });
  };

  return (
    <main className="mx-auto w-full max-w-[1100px] px-6 py-10 md:px-8">
      <h1 className="text-4xl font-semibold">{ui.title}</h1>
      <p className="mt-3 text-zinc-600">{ui.subtitle}</p>

      {masters.length === 0 ? (
        <div className="mt-8 space-y-4">
          <p>{ui.empty}</p>
          <Link href="/masters" className="btn btn-primary">
            {ui.browseMasters}
          </Link>
        </div>
      ) : null}

      <div className="mt-10 mb-16 flex w-full flex-wrap justify-center gap-12">
        {masters.map((master) => (
          <div
            key={master.id}
            className="flex flex-col items-center gap-6 border rounded-lg p-4 shadow-md"
          >
            <Link href={`/masters/${master.id}`} className="block">
              <MasterCard {...master} withLabel={ui.withLabel} daysLabel={ui.daysLabel} />
            </Link>
            <Pricing
              price={master.price}
              guestPrice={230}
              maxGuests={4}
              onReserve={() => handleReserve(master)}
              onSave={() => toggleFavorite(master.id)}
              isSaved={favoriteSet.has(master.id)}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
