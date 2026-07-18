'use client';

import Lazy from "@/Lazy";
import Calendar from "@/ui/Calendar";
import Pricing from "@/ui/Pricing";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from 'next/navigation';
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
const DATE_ONLY_REGEX = /\d{4}-\d{2}-\d{2}/g;

function resolveMediaUrl(value?: string): string {
  if (!value || typeof value !== 'string') return '';

  if (value.startsWith('/')) {
    return value;
  }

  try {
    const parsed = new URL(value);
    const isLocalHost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';

    if (isLocalHost && typeof window !== 'undefined') {
      return `${window.location.origin}${parsed.pathname}${parsed.search}`;
    }

    return value;
  } catch {
    return value;
  }
}

function extractRangeDates(rawRange: string): { startDate: string | null; endDate: string | null } {
  if (typeof rawRange !== 'string' || rawRange.trim() === '') {
    return { startDate: null, endDate: null };
  }

  const matches = rawRange.match(DATE_ONLY_REGEX) || [];
  if (matches.length === 0) {
    return { startDate: null, endDate: null };
  }

  const startDate = matches[0] || null;
  const endDate = matches[1] || matches[0] || null;

  return { startDate, endDate };
}

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
  checkingAvailability: string;
  selectStayDaysAlert: string;
  checkoutError: string;
  guestLimitAlert: string;
  alertConfirm: string;
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
    selectNumberOfGuests: 'Selecciona el numero de invitados',
    pay: 'Pagar',
    checkingAvailability: 'Verificando disponibilidad...',
    selectStayDaysAlert: 'Por favor selecciona los dias de tu estancia antes de pagar.',
    checkoutError: 'No pudimos iniciar el pago. Intentalo nuevamente.',
    guestLimitAlert: 'La cantidad de invitados se ha restringido a {max} porque ese es el maximo permitido por este maestro.',
    alertConfirm: 'Aceptar',
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
    checkingAvailability: 'Checking availability...',
    selectStayDaysAlert: 'Please select your stay dates before paying.',
    checkoutError: 'We could not start the payment. Please try again.',
    guestLimitAlert: 'The number of guests has been limited to {max} because that is the maximum allowed by this master.',
    alertConfirm: 'OK',
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
    selectNumberOfGuests: 'Selectionnez le nombre de convives',
    pay: 'Payer',
    checkingAvailability: 'Verification de la disponibilite...',
    selectStayDaysAlert: 'Veuillez selectionner les dates de votre sejour avant de payer.',
    checkoutError: 'Impossible de lancer le paiement. Veuillez reessayer.',
    guestLimitAlert: 'Le nombre d\'invites a ete limite a {max}, car c\'est le maximum autorise par ce maitre.',
    alertConfirm: 'OK',
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
    selectNumberOfGuests: 'Wahle die Anzahl der Gaste',
    pay: 'Bezahlen',
    checkingAvailability: 'Verfugbarkeit wird gepruft...',
    selectStayDaysAlert: 'Bitte wahle vor dem Bezahlen deine Aufenthaltstage aus.',
    checkoutError: 'Die Zahlung konnte nicht gestartet werden. Bitte versuche es erneut.',
    guestLimitAlert: 'Die Anzahl der Gaste wurde auf {max} begrenzt, da dies die maximale Anzahl fur diesen Meister ist.',
    alertConfirm: 'OK',
  },
};

export default function Master() {
  const [value, setValue] = useState("")
  const [masterData, setMasterData] = useState<PayloadMaster | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const locale = useLocale();
  const searchParams = useSearchParams();
  const ui = masterUiByLocale[locale] || masterUiByLocale.en;
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const hasAutoOpenedReserve = useRef(false);

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
        ? resolveMediaUrl(masterData.image.url)
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
            return resolveMediaUrl(media.url);
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
    if (dlg && !dlg.open) {
      dlg.showModal();
    }
  }

  useEffect(() => {
    if (searchParams.get('reserve') !== '1') return;
    if (hasAutoOpenedReserve.current) return;

    const dlg = document.getElementById('id_reserve_button') as HTMLDialogElement | null;
    if (!dlg || dlg.open) return;

    dlg.showModal();
    hasAutoOpenedReserve.current = true;
  }, [searchParams]);

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

  const getSelectedDayCount = (startDate: string | null, endDate: string | null) => {
    if (!startDate || !endDate) return 0;

    const parseDateOnly = (value: string) => {
      const [year, month, day] = value.slice(0, 10).split('-').map(Number);
      return Date.UTC(year, month - 1, day);
    };

    const start = parseDateOnly(startDate);
    const end = parseDateOnly(endDate);
    const diffInDays = Math.round((end - start) / 86400000);

    return Math.abs(diffInDays) + 1;
  };

  const handlePay = async (range: string, guests: number) => {
    console.log('Selected range', range)
    const { startDate, endDate } = extractRangeDates(range);

    const selectedDays = getSelectedDayCount(startDate, endDate);

    const masterId = masterData?.id || masterIdFromParams || 'unknown-master';

    const res = await fetch('/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: content.title,
        price: content.price + guests * content.guestPrice,
        days: selectedDays || content.days,
        masterId,
        startDate,
        endDate,
      }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(ui.checkoutError);
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || ui.checkoutError);
    }

    if (data?.url) window.location.href = data.url;
    else {
      console.error('Error en checkout', data);
      throw new Error(data?.error || ui.checkoutError);
    }
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
              calendarReady={ready}
              selectStayDaysLabel={ui.selectStayDays}
              selectNumberOfGuestsLabel={ui.selectNumberOfGuests}
              payLabel={ui.pay}
              checkingAvailabilityLabel={ui.checkingAvailability}
              selectStayDaysAlert={ui.selectStayDaysAlert}
              checkoutError={ui.checkoutError}
              guestLimitAlert={ui.guestLimitAlert}
              alertConfirmLabel={ui.alertConfirm}
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
  calendarReady,
  selectStayDaysLabel,
  selectNumberOfGuestsLabel,
  payLabel,
  checkingAvailabilityLabel,
  selectStayDaysAlert,
  checkoutError,
  guestLimitAlert,
  alertConfirmLabel,
  maxGuests
}: {
  onPay: (range: string, guests: number) => Promise<void>;
  availability?: Array<{ from: string; to: string }>;
  calendarReady: boolean;
  selectStayDaysLabel: string;
  selectNumberOfGuestsLabel: string;
  payLabel: string;
  checkingAvailabilityLabel: string;
  selectStayDaysAlert: string;
  checkoutError: string;
  guestLimitAlert: string;
  alertConfirmLabel: string;
  maxGuests: number;
}) {
  const normalizedMaxGuests = Math.max(0, maxGuests);
  const clampGuests = (value: number) => {
    if (!Number.isFinite(value)) return 0;
    return Math.min(normalizedMaxGuests, Math.max(0, value));
  };

  const [range, setRange] = useState("");
  const [guests, setGuests] = useState(0);
  const [showMissingDatesPopup, setShowMissingDatesPopup] = useState(false);
  const [showGuestLimitPopup, setShowGuestLimitPopup] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const guestLimitAlertMessage = guestLimitAlert.replace('{max}', String(normalizedMaxGuests));

  return <dialog id="id_reserve_button" className="modal">
    <div className="modal-box rounded-none min-w-160 relative flex flex-col">
      {showMissingDatesPopup && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 px-6">
          <div className="w-full max-w-md rounded-lg border border-[#cc9966] bg-[#1e130d] p-5 text-white shadow-lg">
            <p className="text-sm leading-6">{selectStayDaysAlert}</p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowMissingDatesPopup(false)}
              >
                {alertConfirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {showGuestLimitPopup && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 px-6">
          <div className="w-full max-w-md rounded-lg border border-[#cc9966] bg-[#1e130d] p-5 text-white shadow-lg">
            <p className="text-sm leading-6">{guestLimitAlertMessage}</p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowGuestLimitPopup(false)}
              >
                {alertConfirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {paymentError && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          {paymentError}
        </div>
      )}

      <h3 className="font-bold text-lg">{selectStayDaysLabel}</h3>
      <div className="flex justify-center">
        {calendarReady ? (
          <Calendar
            value={range}
            setValue={(nextValue) => {
              setRange(nextValue);
              const { startDate, endDate } = extractRangeDates(nextValue);
              if (startDate && endDate && showMissingDatesPopup) {
                setShowMissingDatesPopup(false);
              }
            }}
            availability={availability}
          />
        ) : (
          <p className="py-10 text-sm opacity-70">Loading calendar...</p>
        )}
      </div>

      <h3 className="font-bold text-lg">{selectNumberOfGuestsLabel}</h3>
      <div className="m-6">
        <input
          name='max_guests'
          type="number"
          className="input"
          value={guests}
          min={0}
          max={normalizedMaxGuests}
          onChange={(event) => {
            const nextGuests = Number(event.target.value);
            if (Number.isFinite(nextGuests) && nextGuests > normalizedMaxGuests) {
              setShowGuestLimitPopup(true);
            }
            setGuests(clampGuests(nextGuests));
          }}
        />
      </div>

      <button className="btn btn-primary min-w-30 self-end" disabled={isCheckingAvailability} onClick={async () => {
        const { startDate, endDate } = extractRangeDates(range);
        if (!startDate || !endDate) {
          setShowMissingDatesPopup(true);
          return;
        }

        setPaymentError("");
        setIsCheckingAvailability(true);

        try {
          await onPay(`${startDate}/${endDate}`, clampGuests(guests));
        } catch (error) {
          setPaymentError(error instanceof Error && error.message ? error.message : checkoutError);
          setIsCheckingAvailability(false);
        }
      }}>
        {isCheckingAvailability ? checkingAvailabilityLabel : payLabel}
      </button>
    </div>

    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
}
