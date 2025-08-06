export default function Pricing() {
  return (
    <>
      <div className="w-70">
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-bold">Precio</h2>
          
          <ul>
            <li className="flex justify-between">
              <span>Una persona</span>
              <strong>USD ${885}</strong>
            </li>
            <li className="flex justify-between">
              <span>Un invitado</span>
              <strong>USD ${230}</strong>
            </li>
            <li className="flex justify-between">
              <span>Máximo</span>
              <strong>{4}</strong>
            </li>
          </ul>

          <div className="space-y-2">
            <button className="btn btn-primary btn-block">Reservar</button>
            <button className="btn btn-outline btn-block">Guardar</button>
          </div>
        </div>
      </div>
    </>
  );
}
