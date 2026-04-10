'use client';

import Lazy from "@/Lazy";
import Calendar from "@/ui/Calendar";
import Pricing from "@/ui/Pricing";
import { useEffect, useMemo, useState } from "react";
import { useParams } from 'next/navigation';
import { useLocale } from "next-intl";

type PayloadMaster = {
  id: number | string;
  name?: string;
  specialty?: string;
  title?: string;
  experienceIncludes?: string;
  exploreCity?: string;
  additionalDetails?: string;
  city?: string;
  country?: string;
  days?: number;
  price?: number;
  guest_price?: number;
  max_guests?: number;
  bio?: string;
  image?: {
    url?: string;
  } | null;
  gallery?: Array<{
    image?: {
      url?: string;
    } | number | null;
  }>;
  availability?: Array<{ from: string; to: string }>;
};

const fallbackGalleryImages = [
  '/draft/masters/master/tile_1.avif',
  '/draft/masters/master/tile_2.avif',
  '/draft/masters/master/tile_3.avif',
  '/draft/masters/master/tile_4.avif',
  '/draft/masters/master/tile_5.avif',
  '/draft/masters/master/tile_6.avif',
  '/draft/masters/master/tile_7.avif',
  '/draft/masters/master/tile_8.avif',
];

const SAVED_MASTERS_STORAGE_KEY = 'chaka_favorite_masters';

const masterUiByLocale: Record<string, {
  withLabel: string;
  daysLabel: string;
  meetMaster: string;
  experienceIncludes: string;
  exploreCity: string;
  additional: string;
  reservation: string;
  availability: string;
  availabilityHint: string;
  selectStayDays: string;
  selectNumberOfGuests: string;
  pay: string;
}> = {
  es: {
    withLabel: 'con',
    daysLabel: 'dias',
    meetMaster: 'Conoce al maestro',
    experienceIncludes: 'La experiencia incluye:',
    exploreCity: 'Explora la ciudad',
    additional: 'Adicional',
    reservation: 'Reservacion',
    availability: 'Disponibilidad',
    availabilityHint: 'Consulta los dias resaltados en el calendario.',
    selectStayDays: 'Selecciona los dias de tu estancia',
    pay: 'Pagar',
  },
  en: {
    withLabel: 'with',
    daysLabel: 'days',
    meetMaster: 'Meet the master',
    experienceIncludes: 'The experience includes:',
    exploreCity: 'Explore the city',
    additional: 'Additional',
    reservation: 'Reservation',
    availability: 'Availability',
    availabilityHint: 'Check highlighted days in the calendar.',
    selectStayDays: 'Select your stay days',
    selectNumberOfGuests: 'Select your number of guests',
    pay: 'Pay',
  },
  fr: {
    withLabel: 'avec',
    daysLabel: 'jours',
    meetMaster: 'Rencontrez le maitre',
    experienceIncludes: "L'experience inclut:",
    exploreCity: 'Explorer la ville',
    additional: 'Supplementaire',
    reservation: 'Reservation',
    availability: 'Disponibilite',
    availabilityHint: 'Consultez les jours mis en evidence dans le calendrier.',
    selectStayDays: 'Selectionnez les jours de votre sejour',
    pay: 'Payer',
  },
  de: {
    withLabel: 'mit',
    daysLabel: 'Tage',
    meetMaster: 'Lerne den Meister kennen',
    experienceIncludes: 'Das Erlebnis beinhaltet:',
    exploreCity: 'Entdecke die Stadt',
    additional: 'Zusaetzlich',
    reservation: 'Reservierung',
    availability: 'Verfugbarkeit',
    availabilityHint: 'Prufe die markierten Tage im Kalender.',
    selectStayDays: 'Wahle die Tage deines Aufenthalts',
    pay: 'Bezahlen',
  },
};

export default function Master() {
  const [value, setValue] = useState("")
  const [masterData, setMasterData] = useState<PayloadMaster | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const locale = useLocale();
  const ui = masterUiByLocale[locale] || masterUiByLocale.en;
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const params = useParams();
  const masterIdFromParams = Array.isArray(params?.master)
    ? params.master[0]
    : params?.master;

  const [ready, setReady] = useState(false);
  useEffect(() => {
    import("cally").then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!masterIdFromParams) return;

    let isCancelled = false;

    const fetchMaster = async () => {
      setIsLoading(true);

      try {
        const numericId = /^\d+$/.test(String(masterIdFromParams));
        const endpoint = numericId
          ? `/api/masters/${masterIdFromParams}?locale=${encodeURIComponent(locale)}&depth=1`
          : `/api/masters?where[key][equals]=${encodeURIComponent(String(masterIdFromParams))}&limit=1&locale=${encodeURIComponent(locale)}&depth=1`;

        const res = await fetch(endpoint);
        if (!res.ok) return;

        const body = await res.json();
        const doc = numericId ? body : body?.docs?.[0];

        if (!isCancelled && doc) {
          setMasterData(doc as PayloadMaster);
        }
      } catch {
        // Keep fallback copy on fetch failure.
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchMaster();

    return () => {
      isCancelled = true;
    };
  }, [locale, masterIdFromParams]);

  useEffect(() => {
    const currentMasterId = String(masterIdFromParams || masterData?.id || '');
    if (!currentMasterId) return;

    try {
      const raw = localStorage.getItem(SAVED_MASTERS_STORAGE_KEY);
      if (!raw) {
        setIsSaved(false);
        return;
      }

      const parsed = JSON.parse(raw);
      const ids = Array.isArray(parsed) ? parsed.map((value) => String(value)) : [];
      setIsSaved(ids.includes(currentMasterId));
    } catch {
      setIsSaved(false);
    }
  }, [masterData?.id, masterIdFromParams]);

  const content = useMemo(() => {
    const name = masterData?.name || "Master";
    const craft = masterData?.specialty || masterData?.title || "Experiencia";
    const title = masterData?.title || `${craft} ${ui.withLabel} ${name}`;
    const city = masterData?.city || "";
    const country = masterData?.country || "";
    const days = typeof masterData?.days === "number" ? masterData.days : 3;
    const price = typeof masterData?.price === "number" ? masterData.price : 1200;
    const guestPrice = typeof masterData?.guest_price === "number" ? masterData.guest_price : 1200;
    const maxGuests = typeof masterData?.max_guests === "number" ? masterData.max_guests : 2;
    const image =
      typeof masterData?.image === "object" && masterData?.image?.url
        ? masterData.image.url
        : "/draft/masters/master/hero.avif";
    const bio =
      masterData?.bio ||
      "Conoce al maestro y vive una experiencia curada en profundidad junto a Chaka Journey.";

    const experienceIncludes = masterData?.experienceIncludes || '';
    const exploreCity = masterData?.exploreCity || '';
    const additionalDetails = masterData?.additionalDetails || '';

    const availability = Array.isArray(masterData?.availability) ? masterData.availability : [];
    const galleryImages = Array.isArray(masterData?.gallery)
      ? masterData.gallery
        .map((item) => {
          if (!item || typeof item !== 'object') return '';

          const media = item.image;
          if (media && typeof media === 'object' && typeof media.url === 'string') {
            return media.url;
          }

          return '';
        })
        .filter((url): url is string => Boolean(url))
        .slice(0, 9)
      : [];

    return {
      name,
      craft,
      title,
      city,
      country,
      days,
      price,
      guestPrice,
      maxGuests,
      image,
      bio,
      experienceIncludes,
      exploreCity,
      additionalDetails,
      galleryImages,
      availability,
    };
  }, [masterData, ui.withLabel]);

  const handleReserve = () => {
    const dlg = document.getElementById('id_reserve_button') as HTMLDialogElement | null;
    dlg?.showModal();
  }

  const handleSave = () => {
    const currentMasterId = String(masterIdFromParams || masterData?.id || '');
    if (!currentMasterId) return;

    try {
      const raw = localStorage.getItem(SAVED_MASTERS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const ids = Array.isArray(parsed) ? parsed.map((value) => String(value)) : [];
      const next = ids.includes(currentMasterId)
        ? ids.filter((id) => id !== currentMasterId)
        : [...ids, currentMasterId];

      localStorage.setItem(SAVED_MASTERS_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event('chaka-favorites-updated'));
      setIsSaved(next.includes(currentMasterId));
    } catch {
      setIsSaved(false);
    }
  }

  const handlePay = async (range: string, guests: number) => {
    console.log('Selected range', range)
    let startDate = null; let endDate = null;
    if (typeof range === 'string') {
      if (range.includes('/')) {
        [startDate, endDate] = range.split('/');
      } else if (range.includes(',')) {
        [startDate, endDate] = range.split(',').map(s => s.trim());
      } else {
        startDate = endDate = range;
      }
    }

    const masterId = masterIdFromParams || masterData?.id || 'unknown-master';

    const res = await fetch('/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        price: content.price + guests * content.guestPrice,
        days: content.days,
        masterId,
        startDate,
        endDate,
      }),
    });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else console.error('Error en checkout', data);
  }

  const overview =
    content.bio;

  const meet_the_master = content.bio;

  if (isLoading && !masterData) {
    return (
      <main className="mx-auto w-full max-w-[1100px] px-6 py-10 md:px-8">
        <p className="text-sm opacity-70">Loading experience...</p>
      </main>
    );
  }

  return (
    <>
      <Hero image={content.image} />

      <main className="mx-auto w-full max-w-[1100px] px-6 md:px-8">
        <span>
          {content.city}, {content.country} {content.days} {ui.daysLabel}
        </span>

        <div className="divider" />

        <div className="space-x-16 md:flex">
          <div>
            <h1 className="mb-4 text-4xl">
              {content.title}
            </h1>
            <p className="mb-3 text-sm text-slate-600">{content.craft} {ui.withLabel} {content.name}</p>
            <p>{overview}</p>
          </div>

          <div>
            <div className="divider md:hidden" />
            <Pricing
              price={content.price}
              guestPrice={content.guestPrice}
              maxGuests={content.maxGuests}
              onReserve={handleReserve}
              onSave={handleSave}
              isSaved={isSaved}
            />
            <ReserveDialog
              onPay={handlePay}
              availability={content.availability}
              selectStayDaysLabel={ui.selectStayDays}
              selectNumberOfGuestsLabel={ui.selectNumberOfGuests}
              payLabel={ui.pay}
              maxGuests={content.maxGuests}
            />
          </div>
        </div>

        <div className="divider" />

        <Tiles images={content.galleryImages.length > 0 ? content.galleryImages : fallbackGalleryImages} />

        <h2 className="mb-2 text-2xl">{ui.meetMaster}</h2>
        <p className="mb-16">{meet_the_master}</p>

        <h2 className="mb-2 text-2xl">{ui.experienceIncludes}</h2>
        <p className="mb-16 whitespace-pre-wrap">{content.experienceIncludes}</p>

        <h2 className="mb-2 text-2xl">{ui.exploreCity}</h2>
        <p className="mb-16 whitespace-pre-wrap">{content.exploreCity}</p>

        <h2 className="mb-2 text-2xl">{ui.additional}</h2>
        <p className="mb-16 whitespace-pre-wrap">{content.additionalDetails}</p>

        <div className="divider" />

        <h2 className="mb-2 text-2xl">{ui.reservation}</h2>
        {content.availability.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-1 font-semibold text-base">{ui.availability}</h3>
            <p className="text-sm text-gray-600">{ui.availabilityHint}</p>
          </div>
        )}
        <div className="mb-8 flex justify-center">
          {ready && <Calendar value={value} setValue={setValue} availability={content.availability} />}
        </div>
      </main>
    </>
  );
}

function Hero({ image }: { image: string }) {
  return (
    <div className="mb-8 w-full">
      <img src={image} className="mx-auto w-full max-w-[1100px] object-cover" />
    </div>
  );
}

function Tiles({ images }: { images: string[] }) {
  return (
    <div className="mx-auto mb-8 grid max-w-[1100px] justify-center gap-4 md:grid-cols-3 md:grid-rows-3">
      {images.map((src, index) => (
        <img key={`${src}-${index}`} src={src} />
      ))}
    </div>
  );
}

function ReserveDialog({
  onPay,
  availability,
  selectStayDaysLabel,
  selectNumberOfGuestsLabel,
  payLabel,
  maxGuests
}: {
  onPay: (range: string, price: number) => void;
  availability?: Array<{ from: string; to: string }>;
  selectStayDaysLabel: string;
  selectNumberOfGuestsLabel: string;
  payLabel: string;
  maxGuests: number;
}) {

  const [range, setRange] = useState("");

  return <dialog id="id_reserve_button" className="modal">
    <div className="modal-box rounded-none min-w-160 flex flex-col">
      <h3 className="font-bold text-lg">{selectStayDaysLabel}</h3>
      <div className="flex justify-center">
        <Calendar value={range} setValue={setRange} availability={availability} />
      </div>

      <h3 className="font-bold text-lg">{selectNumberOfGuestsLabel}</h3>
      <div className="m-6">
        <input name='max_guests' type="number" className="input" defaultValue={0} min={0} max={maxGuests} />
      </div>

      <button className="btn btn-primary w-30 self-end" onClick={() => {
        const guestsElement = document.getElementsByName('max_guests')[0]
        const guests = guestsElement.value;
        if (range != '')
          onPay(range, guests)
      }}>{payLabel}</button>
    </div>

    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
}