"use client";

import Link from "next/link";
import Logo from "./Logo";
import { MouseEventHandler, useState } from "react";

export default function Navbar() {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
    </>
  );
}

function NavLinks() {
  // prettier-ignore
  return <>
    <li><NavLink href="/masters" text="Maestros" /></li>
    <li><NavLink href="/experiences" text="Experiencias" /></li>
    <li><NavLink href="/us" text="Nosotros" /></li>
    <li><NavLink href="/contact" text="Contacto" /></li>
  </>
}

function NavIcons() {
  // prettier-ignore
  return <>
    <li><NavIcon href="https://instagram.com" icon="instagram" /></li>
    <li><NavIcon href="https://facebook.com" icon="facebook" /></li>
  </>
}

type NavLinkProps = {
  href: string;
  text: string;
};

export function NavLink({ href, text }: NavLinkProps) {
  return (
    <Link href={href} className="underline-offset-8 hover:underline">
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
      <img src={`./icons/${icon}.svg`} className="hover:bg-con h-6" />
    </Link>
  );
}

export function MobileNavbar() {
  const [visible, setVisible] = useState(false);
  const right = visible ? "0%" : "100%";
  const handleMinimize = () => setVisible((visible) => !visible);

  return (
    <div className="h-12 md:hidden">
      <div
        style={{
          position: right === "100%" ? "sticky" : "fixed",
          top: 0,
          left: 0,
        }}
      >
        <NavHead handleMinimize={handleMinimize} />
      </div>
      <div
        className="fixed transition-transform duration-100"
        style={{
          height: "calc(100vh - 3rem)",
          transform: `translate(${right}, 0%)`,
          position: "fixed",
          top: "3rem",
          left: 0,
        }}
      >
        <NavBody />
      </div>
    </div>
  );
}

function NavHead({ handleMinimize }: { handleMinimize: MouseEventHandler }) {
  return (
    <nav className="bg-base-100 flex h-12 w-screen flex-row px-4">
      <div className="mr-4 flex flex-row items-center">
        <Logo />
      </div>
      <div className="grow" />
      <button onClick={handleMinimize}>
        <img src="./icons/burger-menu.svg" className="w-8"></img>
      </button>
    </nav>
  );
}

function NavBody() {
  return (
    <nav className="bg-base-100 flex h-full w-screen flex-col py-4">
      <ul className="flex flex-col items-center gap-4">
        <NavLinks />
      </ul>
      <div className="grow" />
      <ul className="flex flex-row justify-center gap-4">
        <NavIcons />
      </ul>
    </nav>
  );
}

export function DesktopNavbar() {
  return (
    <nav className="bg-base-100 sticky top-0 left-0 hidden h-12 w-screen flex-row px-4 md:flex">
      <div className="mr-4 flex flex-row items-center">
        <Logo />
      </div>
      <ul className="flex flex-row items-center gap-4">
        <NavLinks />
      </ul>
      <div className="grow" />
      <ul className="flex flex-row items-center gap-4">
        <NavIcons />
      </ul>
    </nav>
  );
}
