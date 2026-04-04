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
  city?: string;
  country?: string;
  days?: number;
  price?: number;
  bio?: string;
  image?: {
    url?: string;
  } | null;
  availability?: Array<{ from: string; to: string }>;
};

export default function Master() {
  const [value, setValue] = useState("")
  const [masterData, setMasterData] = useState<PayloadMaster | null>(null);
  const locale = useLocale();

  const params = useParams();
  const masterIdFromParams = Array.isArray(params?.master)
    ? params.master[0]
    : params?.master;

  useEffect(() => {
    if (!masterIdFromParams) return;

    let isCancelled = false;

    const fetchMaster = async () => {
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
      }
    };

    fetchMaster();

    return () => {
      isCancelled = true;
    };
  }, [locale, masterIdFromParams]);

  const content = useMemo(() => {
    const name = masterData?.name || "Master";
    const craft = masterData?.specialty || masterData?.title || "Experiencia";
    const city = masterData?.city || "";
    const country = masterData?.country || "";
    const days = typeof masterData?.days === "number" ? masterData.days : 3;
    const price = typeof masterData?.price === "number" ? masterData.price : 1200;
    const image =
      typeof masterData?.image === "object" && masterData?.image?.url
        ? masterData.image.url
        : "/draft/masters/master/hero.avif";
    const bio =
      masterData?.bio ||
      "Conoce al maestro y vive una experiencia curada en profundidad junto a Chaka Journey.";

    const availability = Array.isArray(masterData?.availability) ? masterData.availability : [];

    return {
      name,
      craft,
      city,
      country,
      days,
      price,
      image,
      bio,
      availability,
    };
  }, [masterData]);

  const handleReserve = () => {
    const dlg = document.getElementById('id_reserve_button') as HTMLDialogElement | null;
    dlg?.showModal();
  }
  const handlePay = async (range: string) => {
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
        price: content.price,
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

  const meet_the_master =
    content.bio;

  const experience_includes = `
▪ Experiencing Viviana’s everyday life in Buenos Aires, the tango capital.
▪ One hour of private instruction everyday.
▪ Two group classes to practice with other dance partners.
▪ Two evenings dancing in Viviana’s favorite milongas in the city - one underground and one upscale. Includes entrance fees.
▪ Visiting local cafes that are known for their tango history.
▪ Visiting Viviana’s musician friends for their regular tango music jams, if possible.
▪ Option to visit Viviana’s favorite tango shoe store if you need to buy a pair.
  `;

  const explore_city =
    "The many cultures that have filtered into Buenos Aires via its ports have led to French architecture, English lifestyle, Spanish culture, and Italian flair. Made up of bits and pieces from around the world, Buenos Aires nevertheless has an identity of its own. Its urban art scene, in particular, is one of the best in the world, due to relaxed laws that enable artists to leave their mark just about everywhere in the city. Meanwhile, the neighborhood of Palermo is a hip, bohemian network of bars, outdoor cafes, and trendy shops housed in elegant old houses and repurposed warehouses.";

  const additional_details =
    "This VAWAA is available for a longer duration. If interested in extending your time, let us know by how many days and we will do our best to accommodate you.";

  return (
    <>
      <Hero image={content.image} />

      <main className="mx-auto w-full max-w-[1100px] px-6 md:px-8">
        <span>
          {content.city}, {content.country} {content.days} dias
        </span>

        <div className="divider" />

        <div className="space-x-16 md:flex">
          <div>
            <h1 className="mb-4 text-4xl">
              {content.craft} con {content.name}
            </h1>
            <p>{overview}</p>
          </div>

          <div>
            <div className="divider md:hidden" />
            <Pricing
              price={content.price}
              guestPrice={230}
              maxGuests={4}
              onReserve={handleReserve}
            />
            <ReserveDialog onPay={handlePay} availability={content.availability} />
          </div>
        </div>

        <div className="divider" />

        <Tiles />

        <h2 className="mb-2 text-2xl">Conoce al maestro</h2>
        <p className="mb-16">{meet_the_master}</p>

        <h2 className="mb-2 text-2xl">La experiencia incluye:</h2>
        <p className="mb-16 whitespace-pre-wrap">{experience_includes}</p>

        <h2 className="mb-2 text-2xl">Explora la ciudad</h2>
        <p className="mb-16">{explore_city}</p>

        <h2 className="mb-2 text-2xl">Adicional</h2>
        <p className="mb-16">{additional_details}</p>

        <div className="divider" />

        <h2 className="mb-2 text-2xl">Reservación</h2>
        {content.availability.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-1 font-semibold text-base">Disponibilidad</h3>
            <p className="text-sm text-gray-600">Consulta los dias resaltados en el calendario.</p>
          </div>
        )}
        <div className="mb-8 flex justify-center">
          <Lazy>
            <Calendar value={value} setValue={setValue} availability={content.availability} />
          </Lazy>
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

function Tiles() {
  return (
    <div className="mx-auto mb-8 grid max-w-[1100px] justify-center gap-4 md:grid-cols-3 md:grid-rows-3">
      <img src="/draft/masters/master/tile_1.avif" />
      <img src="/draft/masters/master/tile_2.avif" />
      <img src="/draft/masters/master/tile_3.avif" />

      <img src="/draft/masters/master/tile_4.avif" />
      <img src="/draft/masters/master/tile_5.avif" />
      <img src="/draft/masters/master/tile_6.avif" />

      <img src="/draft/masters/master/tile_7.avif" />
      <img src="/draft/masters/master/tile_8.avif" />
    </div>
  );
}

function ReserveDialog({ onPay, availability }: { onPay: (range: string) => void; availability?: Array<{ from: string; to: string }> }) {
  const [value, setValue] = useState("")

  return <dialog id="id_reserve_button" className="modal">
    <div className="modal-box rounded-none min-w-160 flex flex-col">
      <h3 className="font-bold text-lg">Selecciona los dias de tu estancia</h3>
      <div className="flex justify-center">
        <Calendar value={value} setValue={setValue} availability={availability} />
      </div>
      <button className="btn btn-primary w-30 self-end" onClick={() => onPay(value)}>Pagar</button>
    </div>

    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
}