import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  // prettier-ignore
  const nav_links = (
    <>
      <li><NavLink href="/masters" text="Maestros" /></li>
      <li><NavLink href="/experiences" text="Experiencias" /></li>
      <li><NavLink href="/about" text="Nosotros" /></li>
      <li><NavLink href="/contact" text="Contacto" /></li>
    </>
  );

  // prettier-ignore
  const nav_icons = (
    <>
      <li><NavIcon href="https://instagram.com" icon="instagram" /></li>
      <li><NavIcon href="https://facebook.com" icon="facebook" /></li>
    </>
  );

  return (
    <>
      {/* Screen small */}
      <nav className="flex md:hidden flex-col w-screen h-screen py-4">
        <div className="flex flex-col items-center mb-4">
          <Logo />
        </div>
        <ul className="flex flex-col items-center gap-4">{nav_links}</ul>
        <div className="grow" />
        <ul className="flex flex-row justify-center gap-4">{nav_icons}</ul>
      </nav>

      {/* Screen medium+ */}
      <nav className="hidden md:flex flex-row w-screen h-12 px-4">
        <div className="flex flex-row items-center mr-4">
          <Logo />
        </div>
        <ul className="flex flex-row items-center gap-4">{nav_links}</ul>
        <div className="grow" />
        <ul className="flex flex-row items-center gap-4">{nav_icons}</ul>
      </nav>
    </>
  );
}

type NavLinkProps = {
  href: string;
  text: string;
};

export function NavLink({ href, text }: NavLinkProps) {
  return (
    <Link href={href} className="hover:underline underline-offset-8">
      {text}
    </Link>
  );
}

type NavIconProps = {
  href: string;
  icon: string;
};

export function NavIcon({ href, icon }: NavIconProps) {
  return (
    <Link href={href}>
      <img src={`./icons/${icon}.svg`} className="h-6 hover:bg-con" />
    </Link>
  );
}
