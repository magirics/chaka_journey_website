
'use client';
type PricingProps = {
  price: number;
  guestPrice?: number;
  maxGuests?: number;
  onReserve?: () => void;
};


export default function Pricing({ price, guestPrice = 0, maxGuests = 1, onReserve }: PricingProps) {
  return (
    <div className="md:w-60">
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Precio</h2>

        <ul>
          <li className="flex justify-between">
            <span>Una persona</span>
            <strong>USD ${price}</strong>
          </li>
          {guestPrice > 0 && (
            <li className="flex justify-between">
              <span>Un invitado</span>
              <strong>USD ${guestPrice}</strong>
            </li>
          )}
          <li className="flex justify-between">
            <span>Máximo</span>
            <strong>{maxGuests}</strong>
          </li>
        </ul>

        <div className="space-y-2">
          <button
            className="btn btn-primary btn-block"
            onClick={onReserve}
          >
            Reservar
          </button>
          <button className="btn btn-outline btn-block">Guardar</button>
        </div>
      </div>
    </div>
  );
}
