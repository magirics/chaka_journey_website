"use client";

import { NavIcon } from "@/layout/Navbar";
import { Link } from "@/navigation";
import MasterCard from "@/ui/MasterCard";
import Pricing from "@/ui/Pricing";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React from "react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

type MasterCardData = {
  id: string;
  image: string;
  on_hover_image: string;
  name: string;
  craft: string;
  city: string;
  country: string;
  price: number;
  guestPrice: number;
  maxGuests: number;
  days: number;
};

const mastersUiByLocale: Record<string, {
  searchPlaceholder: string;
  with: string;
  days: string;
  defaultName: string;
  defaultCraft: string;
}> = {
  es: {
    searchPlaceholder: 'Buscar...',
    with: 'con',
    days: 'dias',
    defaultName: 'Maestro invitado',
    defaultCraft: 'Experiencia',
  },
  en: {
    searchPlaceholder: 'Search...',
    with: 'with',
    days: 'days',
    defaultName: 'Guest master',
    defaultCraft: 'Experience',
  },
  fr: {
    searchPlaceholder: 'Rechercher...',
    with: 'avec',
    days: 'jours',
    defaultName: 'Maitre invite',
    defaultCraft: 'Experience',
  },
  de: {
    searchPlaceholder: 'Suchen...',
    with: 'mit',
    days: 'Tage',
    defaultName: 'Gastmeister',
    defaultCraft: 'Erlebnis',
  },
};

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
  guest_price?: number;
  max_guests?: number;
  days?: number;
};

function pickLocalizedText(
  value: string | Record<string, string | undefined> | undefined,
  locale: string,
): string {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';

  const localePriority = [locale, 'en', 'es', 'fr', 'de'];

  for (const code of localePriority) {
    const candidate = value[code];
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
  }

  for (const candidate of Object.values(value)) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
  }

  return '';
}

const fallbackMasters: MasterCardData[] = [
  {
    id: 'viviana',
    image: "/draft/masters/master_5.avif",
    on_hover_image: "/draft/masters/master_5_on_hover.avif",
    name: "Viviana",
    craft: "Tango Argentino",
    city: "Buenos Aires",
    country: "Argentina",
    price: 575,
    guestPrice: 230,
    maxGuests: 4,
    days: 3,
  },
  {
    id: 'chikako',
    image: "/draft/masters/master_6.avif",
    on_hover_image: "/draft/masters/master_6_on_hover.avif",
    name: "Chikako",
    craft: "Caligrafía Japonesa",
    city: "Japon",
    country: "Kyoto",
    price: 700,
    guestPrice: 230,
    maxGuests: 4,
    days: 3,
  },
  {
    id: 'pum-pum',
    image: "/draft/masters/master_7.avif",
    on_hover_image: "/draft/masters/master_7_on_hover.avif",
    name: "Pum Pum",
    craft: "Arte Callejero",
    city: "Argentina",
    country: "Buenos Aires",
    price: 885,
    guestPrice: 230,
    maxGuests: 4,
    days: 3,
  }, {
    id: 'takaoka-1',
    image: "/draft/masters/master_8.avif",
    on_hover_image: "/draft/masters/master_8_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    guestPrice: 230,
    maxGuests: 4,
    days: 3,
  },
  {
    id: 'takaoka-2',
    image: "/draft/masters/master_9.avif",
    on_hover_image: "/draft/masters/master_9_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    guestPrice: 230,
    maxGuests: 4,
    days: 3,
  },
  {
    id: 'takaoka-3',
    image: "/draft/masters/master_10.avif",
    on_hover_image: "/draft/masters/master_10_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    guestPrice: 230,
    maxGuests: 4,
    days: 3,
  },
];

const SAVED_MASTERS_STORAGE_KEY = 'chaka_favorite_masters';

export default function Masters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const locale = useLocale();
  const ui = mastersUiByLocale[locale] || mastersUiByLocale.en;
  const [masters, setMasters] = useState<MasterCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedMasterIds, setSavedMasterIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_MASTERS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setSavedMasterIds(parsed.map((value) => String(value)));
      }
    } catch {
      setSavedMasterIds([]);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const fetchMasters = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          `/api/masters?limit=100&locale=all&depth=1&where[active][equals]=true`
        );

        if (!res.ok) {
          if (!isCancelled) setMasters(fallbackMasters);
          return;
        }

        const body = await res.json();
        const docs = Array.isArray(body?.docs) ? (body.docs as PayloadMaster[]) : [];

        const parsed = docs.reduce<MasterCardData[]>((acc, doc, index) => {
          const image =
            typeof doc.image === "object" && doc.image?.url
              ? doc.image.url
              : "";

          if (!image) return acc;

          const safePrice = typeof doc.price === "number" ? doc.price : 0;
          const safeGuestPrice = typeof doc.guest_price === "number" ? doc.guest_price : 0;
          const safeMaxGuests = typeof doc.max_guests === "number" ? doc.max_guests : 1;
          const safeDays = typeof doc.days === "number" ? doc.days : 1;

          acc.push({
            id: String(doc.id),
            image,
            on_hover_image: image,
            name: pickLocalizedText(doc.name, locale) || doc.title || ui.defaultName,
            craft: pickLocalizedText(doc.specialty, locale) || ui.defaultCraft,
            city: pickLocalizedText(doc.city, locale),
            country: pickLocalizedText(doc.country, locale),
            price: safePrice,
            guestPrice: safeGuestPrice,
            maxGuests: safeMaxGuests,
            days: safeDays,
          });

          return acc;
        }, []);

        if (!isCancelled) {
          setMasters(parsed.length > 0 ? parsed : fallbackMasters);
        }
      } catch {
        if (!isCancelled) {
          setMasters(fallbackMasters);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchMasters();

    return () => {
      isCancelled = true;
    };
  }, [locale, ui.defaultCraft, ui.defaultName]);

  // Redirect reserve action to the master detail page with calendar flow.
  const handleClick = (master: MasterCardData) => {
    push(`/masters/${master.id}?reserve=1`);
  };

  const toggleSaveMaster = (masterId: string) => {
    setSavedMasterIds((current) => {
      const next = current.includes(masterId)
        ? current.filter((id) => id !== masterId)
        : [...current, masterId];

      localStorage.setItem(SAVED_MASTERS_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event('chaka-favorites-updated'));
      return next;
    });
  };

  
  const handleChange = useDebouncedCallback((ev: React.SyntheticEvent) => {
    const searchText = (ev.target as HTMLInputElement).value.toLowerCase();

    const params = new URLSearchParams(searchParams);
    if (searchText) params.set("search", searchText);
    else params.delete("search");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const searchText = searchParams.get("search")?.toString() || "";

  const filteredMasters = masters.filter((master) => {
    const allFields =
      master.name +
      master.craft +
      master.city +
      master.country +
      master.price +
      master.days;

    return allFields.toLowerCase().includes(searchText);
  });

  return (
    <>
      {/* 🔍 Search bar */}
      <label className="input my-10 md:w-120">
        <NavIcon href="" icon="search" label={ui.searchPlaceholder} />
        <input
          placeholder={ui.searchPlaceholder}
          onChange={handleChange}
          defaultValue={searchText}
        />
      </label>

      {/* 🔹 Cards + Pricing */}
      <div className="mb-16 flex w-full flex-wrap justify-center gap-12">
        {isLoading && masters.length === 0 ? (
          <p className="text-sm opacity-70">Loading masters...</p>
        ) : null}
        {filteredMasters.map((master) => (
          <div
            key={master.id}
            className="flex flex-col items-center gap-6 border rounded-lg p-4 shadow-md"
          >
            <Link href={`/masters/${master.id}`} className="block">
              <MasterCard {...master} withLabel={ui.with} daysLabel={ui.days} />
            </Link>
            <Pricing
              price={master.price}
              guestPrice={master.guestPrice}
              maxGuests={master.maxGuests}
              onReserve={() => handleClick(master)}
              onSave={() => toggleSaveMaster(master.id)}
              isSaved={savedMasterIds.includes(master.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
}