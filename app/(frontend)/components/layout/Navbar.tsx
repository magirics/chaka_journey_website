"use client";

import Link from "next/link";
import Logo from "@/layout/Logo";
import { Manrope } from "next/font/google";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import LocaleDropdown from "@/ui/LocaleDropdown";

import { useLocale, useMessages } from "next-intl";

const vawaaSans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const announcementByLocale: Record<string, string> = {
  es: "¡Muy pronto Chaka estará disponible!",
  en: "Chaka will be available very soon!",
  fr: "Chaka sera bientot disponible !",
  de: "Chaka wird sehr bald verfugbar sein!",
};

const FAVORITES_STORAGE_KEY = "chaka_favorite_masters";

export default function Navbar() {
  const locale = useLocale();
  const messages = useMessages() as Record<string, any>;
  const header = (messages?.Header as Record<string, any>) || {};
  const announcement = announcementByLocale[locale] || announcementByLocale.en;

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
      <AnnouncementBar message={announcement} />
    </>
  );
}

function AnnouncementBar({ message }: { message: string }) {
  return (
    <div className="bg-black px-4 py-2 text-center text-xs font-medium tracking-wide text-white uppercase md:text-sm">
      {message}
    </div>
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
  const hasFacebook = links.some((link) => link.icon === 'facebook');

  return (
    <>
      {links.map((link) => (
        <Fragment key={`${link.href}-${link.icon}`}>
          <li key={`${link.href}-${link.icon}`}>
            <NavIcon href={link.href} icon={link.icon} label={link.label} />
          </li>
          {link.icon === "facebook" ? (
            <li key={`saved-counter-${link.href}`}>
              <FavoritesCounterIcon />
            </li>
          ) : null}
        </Fragment>
      ))}
      {!hasFacebook ? (
        <li key="saved-counter-fallback">
          <FavoritesCounterIcon />
        </li>
      ) : null}
    </>
  );
}

function FavoritesCounterIcon() {
  const [count, setCount] = useState(0);
  const [isPopping, setIsPopping] = useState(false);

  const triggerPop = () => {
    setIsPopping(true);
    window.setTimeout(() => setIsPopping(false), 380);
  };

  useEffect(() => {
    const readCount = () => {
      try {
        const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        const ids = Array.isArray(parsed) ? parsed : [];
        setCount(ids.length);
      } catch {
        setCount(0);
      }
    };

    readCount();

    const onStorage = () => readCount();
    const onFavoritesUpdated = () => {
      readCount();
      triggerPop();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("chaka-favorites-updated", onFavoritesUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("chaka-favorites-updated", onFavoritesUpdated);
    };
  }, []);

  const isEnabled = count > 0;

  if (!isEnabled) return null;

  return (
    <Link
      href="/favorites"
      aria-label="Guardado"
      className={`relative inline-flex h-6 w-6 items-center justify-center transition-transform ${isPopping ? 'animate-bounce scale-115' : 'hover:scale-110'}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`h-6 w-6 text-black ${isPopping ? 'drop-shadow-[0_0_8px_rgba(0,0,0,0.35)]' : ''}`}
      >
        <path d="M6 3h12v18l-6-4-6 4z" fill="currentColor" />
      </svg>
      <span className="absolute -right-3 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
        {count}
      </span>
    </Link>
  );
}

type NavLinkProps = {
  href: string;
  text: string;
};

export function NavLink({ href, text }: NavLinkProps) {
  return (
    <Link href={href} className="text-[15px] font-semibold tracking-[-0.015em] text-black underline-offset-8 transition-opacity hover:opacity-72 hover:underline md:text-[16px]">
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
    <div className={`sticky top-0 left-0 z-10 h-12 md:hidden ${vawaaSans.className}`}>
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
    <nav className={`bg-base-100 sticky top-0 left-0 z-10 hidden h-12 w-screen flex-row items-center px-4 md:flex ${vawaaSans.className}`}>
      <div className="mr-4 flex flex-row items-center">
        <Logo />
      </div>
      <ul className="flex flex-row items-center gap-8">
        <NavLinks links={navLinks} />
      </ul>
      <div className="grow" />
      <ul className="flex flex-row items-center gap-5">
        <NavIcons links={socialLinks} />
      </ul>
      <LocaleDropdown />
    </nav>
  );
}
