"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";

type GiftType = "physical" | "digital";

type PayloadGift = {
  id: string | number;
  title?: string | Record<string, string | undefined>;
  description?: string | Record<string, string | undefined>;
  deliveryNotes?: string | Record<string, string | undefined>;
  giftType?: GiftType;
  price?: number;
  deliveryFee?: number;
  image?: {
    url?: string;
  } | null;
  master?: {
    id?: string | number;
    name?: string | Record<string, string | undefined>;
    specialty?: string | Record<string, string | undefined>;
  } | string | number | null;
};

type GiftCard = {
  id: string;
  title: string;
  description: string;
  deliveryNotes: string;
  giftType: GiftType;
  price: number;
  deliveryFee: number;
  imageUrl: string;
  masterId: string;
  masterName: string;
  masterSpecialty: string;
};

const textByLocale: Record<string, {
  heading: string;
  subheading: string;
  physicalTab: string;
  digitalTab: string;
  details: string;
  recipientName: string;
  recipientNamePlaceholder: string;
  deliveryAddress: string;
  deliveryAddressPlaceholder: string;
  giftNote: string;
  giftNotePlaceholder: string;
  requiredHint: string;
  checkoutError: string;
  madeBy: string;
  handcrafted: string;
  itemPrice: string;
  delivery: string;
  price: string;
  checkout: string;
  loading: string;
  empty: string;
}> = {
  es: {
    heading: "Regala algo hecho a mano por un maestro",
    subheading: "Cada regalo en Chaka conecta a alguien con un oficio vivo, una historia real y una experiencia que se recuerda.",
    physicalTab: "Caja fisica",
    digitalTab: "Gift card digital",
    details: "Detalles del regalo",
    recipientName: "Nombre de quien recibe",
    recipientNamePlaceholder: "Ej. Ana Perez",
    deliveryAddress: "Direccion",
    deliveryAddressPlaceholder: "Calle, numero, ciudad y referencia",
    giftNote: "Nota del regalo",
    giftNotePlaceholder: "Escribe un mensaje especial (opcional)",
    requiredHint: "Nombre y direccion son obligatorios para regalo fisico.",
    checkoutError: "No pudimos iniciar el checkout. Intentalo de nuevo.",
    madeBy: "Creado por",
    handcrafted: "Pieza artesanal incluida",
    itemPrice: "Precio",
    delivery: "Delivery",
    price: "Total",
    checkout: "Regalar ahora",
    loading: "Cargando regalos...",
    empty: "Aun no hay regalos activos en esta categoria.",
  },
  en: {
    heading: "Gift something handcrafted by a master",
    subheading: "Each Chaka gift connects someone to a living craft, a real story and an experience they will remember.",
    physicalTab: "Physical box",
    digitalTab: "Digital gift card",
    details: "Gift details",
    recipientName: "Recipient name",
    recipientNamePlaceholder: "E.g. Ana Perez",
    deliveryAddress: "Delivery address",
    deliveryAddressPlaceholder: "Street, number, city and notes",
    giftNote: "Gift note",
    giftNotePlaceholder: "Write a special note (optional)",
    requiredHint: "Recipient name and address are required for physical gifts.",
    checkoutError: "We could not start checkout. Please try again.",
    madeBy: "Made by",
    handcrafted: "Handcrafted piece included",
    itemPrice: "Price",
    delivery: "Delivery",
    price: "Total",
    checkout: "Gift now",
    loading: "Loading gifts...",
    empty: "There are no active gifts in this category yet.",
  },
  fr: {
    heading: "Offrez quelque chose de fait main par un maitre",
    subheading: "Chaque cadeau Chaka relie une personne a un savoir faire vivant, une histoire reelle et une experience memorable.",
    physicalTab: "Boite physique",
    digitalTab: "Carte cadeau numerique",
    details: "Details du cadeau",
    recipientName: "Nom du destinataire",
    recipientNamePlaceholder: "Ex. Ana Perez",
    deliveryAddress: "Adresse de livraison",
    deliveryAddressPlaceholder: "Rue, numero, ville et reference",
    giftNote: "Note cadeau",
    giftNotePlaceholder: "Ecrivez un message special (optionnel)",
    requiredHint: "Le nom et l'adresse sont obligatoires pour un cadeau physique.",
    checkoutError: "Impossible de lancer le checkout. Reessayez.",
    madeBy: "Cree par",
    handcrafted: "Piece artisanale incluse",
    itemPrice: "Prix",
    delivery: "Livraison",
    price: "Total",
    checkout: "Offrir maintenant",
    loading: "Chargement des cadeaux...",
    empty: "Aucun cadeau actif dans cette categorie.",
  },
  de: {
    heading: "Verschenke etwas Handgemachtes von einem Meister",
    subheading: "Jedes Chaka Geschenk verbindet jemanden mit lebendigem Handwerk, einer echten Geschichte und einer bleibenden Erfahrung.",
    physicalTab: "Physische Box",
    digitalTab: "Digitale Geschenkkarte",
    details: "Geschenkdetails",
    recipientName: "Name des Empfangers",
    recipientNamePlaceholder: "Z. B. Ana Perez",
    deliveryAddress: "Lieferadresse",
    deliveryAddressPlaceholder: "Strasse, Hausnummer, Stadt und Hinweis",
    giftNote: "Geschenknotiz",
    giftNotePlaceholder: "Schreibe eine besondere Notiz (optional)",
    requiredHint: "Name und Adresse sind fur physische Geschenke erforderlich.",
    checkoutError: "Checkout konnte nicht gestartet werden. Bitte erneut versuchen.",
    madeBy: "Gemacht von",
    handcrafted: "Handgemachtes Stuck enthalten",
    itemPrice: "Preis",
    delivery: "Lieferung",
    price: "Gesamt",
    checkout: "Jetzt verschenken",
    loading: "Geschenke werden geladen...",
    empty: "Noch keine aktiven Geschenke in dieser Kategorie.",
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

export default function GiftPage() {
  const locale = useLocale();
  const t = textByLocale[locale] || textByLocale.en;

  const [giftType, setGiftType] = useState<GiftType>("physical");
  const [gifts, setGifts] = useState<GiftCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedGiftId, setSelectedGiftId] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [giftNote, setGiftNote] = useState<string>("");
  const [checkoutError, setCheckoutError] = useState<string>("");

  useEffect(() => {
    let isCancelled = false;

    const fetchGifts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/gifts?limit=100&locale=all&depth=2&where[active][equals]=true");
        if (!res.ok) {
          if (!isCancelled) setGifts([]);
          return;
        }

        const body = await res.json();
        const docs = Array.isArray(body?.docs) ? (body.docs as PayloadGift[]) : [];

        const parsed = docs.reduce<GiftCard[]>((acc, doc) => {
          const imageUrl = typeof doc.image === "object" && doc.image?.url ? doc.image.url : "";
          if (!imageUrl) return acc;

          const master = doc.master;
          const masterId =
            master && typeof master === "object" && master?.id
              ? String(master.id)
              : typeof master === "string" || typeof master === "number"
                ? String(master)
                : "";

          const masterName =
            master && typeof master === "object"
              ? pickLocalizedText(master.name, locale) || "Maestro Chaka"
              : "Maestro Chaka";

          const masterSpecialty =
            master && typeof master === "object"
              ? pickLocalizedText(master.specialty, locale)
              : "";

          acc.push({
            id: String(doc.id),
            title: pickLocalizedText(doc.title, locale) || "Gift experience",
            description: pickLocalizedText(doc.description, locale),
            deliveryNotes: pickLocalizedText(doc.deliveryNotes, locale),
            giftType: doc.giftType === "digital" ? "digital" : "physical",
            price: typeof doc.price === "number" ? doc.price : 0,
            deliveryFee: typeof doc.deliveryFee === "number" ? doc.deliveryFee : 0,
            imageUrl,
            masterId,
            masterName,
            masterSpecialty,
          });

          return acc;
        }, []);

        if (!isCancelled) {
          setGifts(parsed);
          if (parsed.length > 0) {
            setSelectedGiftId(parsed[0].id);
          }
        }
      } catch {
        if (!isCancelled) setGifts([]);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchGifts();

    return () => {
      isCancelled = true;
    };
  }, [locale]);

  const visibleGifts = useMemo(() => gifts.filter((item) => item.giftType === giftType), [giftType, gifts]);

  useEffect(() => {
    if (visibleGifts.length === 0) {
      setSelectedGiftId("");
      return;
    }

    const selectedStillExists = visibleGifts.some((item) => item.id === selectedGiftId);
    if (!selectedStillExists) {
      setSelectedGiftId(visibleGifts[0].id);
    }
  }, [selectedGiftId, visibleGifts]);

  const selectedGift = visibleGifts.find((item) => item.id === selectedGiftId) || null;

  const handleCheckout = async () => {
    if (!selectedGift) return;

    const trimmedRecipientName = recipientName.trim();
    const trimmedDeliveryAddress = deliveryAddress.trim();
    const trimmedGiftNote = giftNote.trim();

    if (!trimmedRecipientName) {
      setCheckoutError(t.requiredHint);
      return;
    }

    if (selectedGift.giftType === "physical" && !trimmedDeliveryAddress) {
      setCheckoutError(t.requiredHint);
      return;
    }

    setCheckoutError("");

    const res = await fetch("/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checkoutType: "gift",
        locale,
        giftId: selectedGift.id,
        giftType: selectedGift.giftType,
        name: selectedGift.title,
        price: selectedGift.price,
        deliveryFee: selectedGift.deliveryFee,
        masterId: selectedGift.masterId,
        recipientName: trimmedRecipientName,
        deliveryAddress: trimmedDeliveryAddress,
        giftNote: trimmedGiftNote,
      }),
    });

    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
      return;
    }

    setCheckoutError(t.checkoutError);
    console.error("Error en checkout de regalo:", data);
  };

  return (
    <main className="mx-auto mb-16 mt-8 max-w-[1100px] px-6 md:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold leading-tight">{t.heading}</h1>
        <p className="mt-4 max-w-[760px] text-base text-zinc-600">{t.subheading}</p>
      </div>

      <div className="mb-8 flex w-full max-w-[420px] gap-2 border-b border-zinc-300">
        <button
          className={`px-4 py-3 text-sm font-semibold ${giftType === "physical" ? "border-b-2 border-black" : "text-zinc-500"}`}
          onClick={() => setGiftType("physical")}
        >
          {t.physicalTab}
        </button>
        <button
          className={`px-4 py-3 text-sm font-semibold ${giftType === "digital" ? "border-b-2 border-black" : "text-zinc-500"}`}
          onClick={() => setGiftType("digital")}
        >
          {t.digitalTab}
        </button>
      </div>

      {isLoading ? <p>{t.loading}</p> : null}
      {!isLoading && visibleGifts.length === 0 ? <p>{t.empty}</p> : null}

      {!isLoading && selectedGift ? (
        <section className="grid gap-8 md:grid-cols-[1.05fr_1fr]">
          <div>
            <img src={selectedGift.imageUrl} alt={selectedGift.title} className="w-full object-cover" />

            {visibleGifts.length > 1 ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {visibleGifts.map((gift) => (
                  <button
                    key={gift.id}
                    type="button"
                    className={`border p-1 ${gift.id === selectedGift.id ? "border-black" : "border-zinc-200"}`}
                    onClick={() => setSelectedGiftId(gift.id)}
                  >
                    <img src={gift.imageUrl} alt={gift.title} className="h-20 w-24 object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">{selectedGift.title}</h2>
            <p className="text-zinc-700">{selectedGift.description}</p>

            <div className="border-t border-zinc-300 pt-6">
              <h3 className="mb-4 text-2xl font-semibold">{t.details}</h3>
              <p className="mb-3">
                <span className="font-semibold">{t.madeBy}: </span>
                {selectedGift.masterName}
                {selectedGift.masterSpecialty ? ` - ${selectedGift.masterSpecialty}` : ""}
              </p>
              <p className="mb-3">
                <span className="font-semibold">{t.handcrafted}: </span>
                {selectedGift.deliveryNotes || "Incluido"}
              </p>
              <p className="mb-3">
                <span className="font-semibold">{t.itemPrice}: </span>
                USD ${selectedGift.price}
              </p>
              <p className="mb-3">
                <span className="font-semibold">{t.delivery}: </span>
                USD ${selectedGift.deliveryFee}
              </p>
              <p className="text-xl font-semibold">
                {t.price}: USD ${selectedGift.price + selectedGift.deliveryFee}
              </p>
            </div>

            <div className="space-y-4 border-t border-zinc-300 pt-6">
              <label className="block text-sm font-semibold text-zinc-800">
                {t.recipientName}
                <input
                  className="mt-2 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                  placeholder={t.recipientNamePlaceholder}
                />
              </label>

              <label className="block text-sm font-semibold text-zinc-800">
                {t.deliveryAddress}
                <textarea
                  className="mt-2 min-h-24 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  value={deliveryAddress}
                  onChange={(event) => setDeliveryAddress(event.target.value)}
                  placeholder={t.deliveryAddressPlaceholder}
                />
              </label>

              <label className="block text-sm font-semibold text-zinc-800">
                {t.giftNote}
                <textarea
                  className="mt-2 min-h-20 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  value={giftNote}
                  onChange={(event) => setGiftNote(event.target.value)}
                  placeholder={t.giftNotePlaceholder}
                />
              </label>

              <p className="text-xs text-zinc-500">{t.requiredHint}</p>
              {checkoutError ? <p className="text-sm text-red-600">{checkoutError}</p> : null}
            </div>

            <button className="btn btn-primary mt-2" onClick={handleCheckout}>
              {t.checkout}
            </button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
