
'use client';
import { useLocale } from 'next-intl';

type PricingProps = {
  price: number;
  guestPrice?: number;
  maxGuests?: number;
  onReserve?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
};

const pricingTextByLocale: Record<string, {
  title: string;
  onePerson: string;
  oneGuest: string;
  max: string;
  reserve: string;
  save: string;
  saved: string;
}> = {
  es: {
    title: 'Precio',
    onePerson: 'Una persona',
    oneGuest: 'Un invitado',
    max: 'Maximo',
    reserve: 'Reservar',
    save: 'Guardar',
    saved: 'Guardado',
  },
  en: {
    title: 'Price',
    onePerson: 'One person',
    oneGuest: 'One guest',
    max: 'Max',
    reserve: 'Reserve',
    save: 'Save',
    saved: 'Saved',
  },
  fr: {
    title: 'Prix',
    onePerson: 'Une personne',
    oneGuest: 'Un invite',
    max: 'Maximum',
    reserve: 'Reserver',
    save: 'Enregistrer',
    saved: 'Enregistre',
  },
  de: {
    title: 'Preis',
    onePerson: 'Eine Person',
    oneGuest: 'Ein Gast',
    max: 'Maximal',
    reserve: 'Buchen',
    save: 'Speichern',
    saved: 'Gespeichert',
  },
};

export default function Pricing({ price, guestPrice = 0, maxGuests = 1, onReserve, onSave, isSaved = false }: PricingProps) {
  const locale = useLocale();
  const t = pricingTextByLocale[locale] || pricingTextByLocale.en;

  return (
      <div className="md:w-60">
        <div className="space-y-4">
          <h2 className="text-lg font-bold">{t.title}</h2>

          <ul>
            <li className="flex justify-between">
              <span>{t.onePerson}</span>
              <strong>USD ${price}</strong>
            </li>
            {guestPrice > 0 && (
              <li className="flex justify-between">
                <span>{t.oneGuest}</span>
                <strong>USD ${guestPrice}</strong>
              </li>
            )}
            <li className="flex justify-between">
              <span>{t.max}</span>
              <strong>{maxGuests}</strong>
            </li>
          </ul>

          <div className="space-y-2">
            <button className="btn btn-primary btn-block" onClick={onReserve}>{t.reserve}</button >
            <button
              className={`btn btn-block ${isSaved ? 'border-zinc-700 bg-zinc-700 text-white hover:border-zinc-800 hover:bg-zinc-800' : 'btn-outline'}`}
              onClick={onSave}
            >
              {isSaved ? t.saved : t.save}
            </button>
          </div>
        </div>
      </div>
  );
}
