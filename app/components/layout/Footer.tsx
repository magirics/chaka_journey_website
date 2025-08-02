import Link from "next/link";
import { NavIcon } from "./Navbar";

export default function Footer() {
  return (
    <footer className="w-screen flex flex-col gap-8 p-4 bg-primary text-primary-content md:flex-row md:justify-around">
      <Subscribe />
      <Us />
      <Terms />
      <Contact />
    </footer>
  );
}

export function Subscribe() {
  return (
    <div className="space-y-4">
      <h6 className="text-2xl">No te pierdas de nada</h6>
      <p>Se el primero en saber de nuevos maestros y destinos</p>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          id="name"
          className="input w-full bg-primary focus:border-primary-content"
        />
        <input
          type="text"
          placeholder="Correo"
          name="email"
          id="email"
          className="input w-full bg-primary focus:border-primary-content"
        />
        <button className="btn btn-outline">Suscribir</button>
      </form>
    </div>
  );
}

export function Us() {
  // prettier-ignore
  return (
    <ul>
      <li><Link href="">Nosotros</Link></li>
      <li><Link href="">Experiencias</Link></li>
    </ul>
  );
}

export function Terms() {
  const year = new Date().getFullYear();

  // prettier-ignore
  return (
    <div className="space-y-8"> {/* Same space as the gap between footer divs */}
      <ul>
        <li><Link href="">Se un maestro</Link></li>
        <li><Link href="">Regala una experiencia</Link></li>
        <li><Link href="">Términos</Link></li>
        <li><Link href="">Privacidad</Link></li>
      </ul>

      <small>&copy; {year} Chaka Journey</small>
    </div>
  );
}

export function Contact() {
  // prettier-ignore
  return (
    <div className="space-y-4">
      <h6>Contáctanos</h6>
      <ul className="flex flex-row gap-4 invert">
        <li><NavIcon href="https://instagram.com" icon="instagram" /></li>
        <li><NavIcon href="https://facebook.com" icon="facebook" /></li>
        <li><NavIcon href="https://twitter.com" icon="twitter" /></li>
        <li><NavIcon href="mailto:chaka_journey@gmail.com" icon="email" /></li>
      </ul>
    </div>
  );
}
