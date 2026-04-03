"use client";

import Link from "next/link";
import Logo from "@/layout/Logo";
import { MouseEventHandler, useState } from "react";
import LocaleDropdown from "@/ui/LocaleDropdown";

import { useMessages } from "next-intl";

export default function Navbar() {
  const messages = useMessages() as Record<string, any>;
  const header = (messages?.Header as Record<string, any>) || {};

  const navLinks = Array.isArray(header?.links) && header.links.length > 0
    ? header.links.map((link: any) => ({
        href: link?.href || "/home",
        text: link?.label || "Link",
      }))
    : [
        { href: "/masters", text: "Maestros" },
        { href: "/experiences", text: "Experiencias" },
        { href: "/us", text: "Nosotros" },
        { href: "/contact", text: "Contacto" },
      ];

  const socialLinks = Array.isArray(header?.socialLinks) && header.socialLinks.length > 0
    ? header.socialLinks.map((link: any) => ({
        href: link?.href || "#",
        icon: link?.icon || "instagram",
        label: link?.label || "Social",
      }))
    : [
        { href: "https://instagram.com", icon: "instagram", label: "Instagram" },
        { href: "https://facebook.com", icon: "facebook", label: "Facebook" },
      ];

  return (
    <>
      <MobileNavbar navLinks={navLinks} socialLinks={socialLinks} />
      <DesktopNavbar navLinks={navLinks} socialLinks={socialLinks} />
    </>
  );
}

function NavLinks({ links }: { links: Array<{ href: string; text: string }> }) {
  return (
    <>
      {links.map((link) => (
        <li key={`${link.href}-${link.text}`}>
          <NavLink href={link.href} text={link.text} />
        </li>
      ))}
    </>
  );
}

function NavIcons({ links }: { links: Array<{ href: string; icon: string; label: string }> }) {
  return (
    <>
      {links.map((link) => (
        <li key={`${link.href}-${link.icon}`}>
          <NavIcon href={link.href} icon={link.icon} label={link.label} />
        </li>
      ))}
    </>
  );
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
  label: string;
};

export function NavIcon({ href, icon, label }: NavIconProps) {
  return (
    <Link href={href} aria-label={label}>
      <img src={`/icons/${icon}.svg`} alt={label} className="hover:bg-con h-6" />
    </Link>
  );
}

export function MobileNavbar({
  navLinks,
  socialLinks,
}: {
  navLinks: Array<{ href: string; text: string }>;
  socialLinks: Array<{ href: string; icon: string; label: string }>;
}) {
  const [visible, setVisible] = useState(false);
  const right = visible ? "0%" : "100%";
  const handleMinimize = () => setVisible((visible) => !visible);

  return (
    <div className="sticky top-0 left-0 z-10 h-12 md:hidden">
      <NavHead handleMinimize={handleMinimize} />
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
        <NavBody navLinks={navLinks} socialLinks={socialLinks} />
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
        <img src="/icons/burger-menu.svg" className="w-8"></img>
      </button>
    </nav>
  );
}

function NavBody({
  navLinks,
  socialLinks,
}: {
  navLinks: Array<{ href: string; text: string }>;
  socialLinks: Array<{ href: string; icon: string; label: string }>;
}) {
  return (
    <nav className="bg-base-100 flex h-full w-screen flex-col py-4">
      <ul className="flex flex-col items-center gap-4">
        <NavLinks links={navLinks} />
      </ul>
      <div className="grow" />
      <ul className="flex flex-row justify-center gap-4">
        <NavIcons links={socialLinks} />
      </ul>
    </nav>
  );
}

export function DesktopNavbar({
  navLinks,
  socialLinks,
}: {
  navLinks: Array<{ href: string; text: string }>;
  socialLinks: Array<{ href: string; icon: string; label: string }>;
}) {
  return (
    <nav className="bg-base-100 sticky top-0 left-0 z-10 hidden h-12 w-screen flex-row items-center px-4 md:flex">
      <div className="mr-4 flex flex-row items-center">
        <Logo />
      </div>
      <ul className="flex flex-row items-center gap-4">
        <NavLinks links={navLinks} />
      </ul>
      <div className="grow" />
      <ul className="flex flex-row items-center gap-4">
        <NavIcons links={socialLinks} />
      </ul>
      <LocaleDropdown />
    </nav>
  );
}
