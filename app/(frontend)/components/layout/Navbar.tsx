"use client";

import { Link } from "@/navigation";
import Logo from "@/layout/Logo";
import { Manrope } from "next/font/google";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import LocaleDropdown from "@/ui/LocaleDropdown";
import { useLocale, useMessages } from "next-intl";
import { usePathname } from "next/navigation";

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

type HeaderMedia = {
  url?: string;
};

type HeaderNavLink = {
  href?: string;
  label?: string;
};

type HeaderSocialLink = {
  href?: string;
  icon?: string;
  uploadedIcon?: HeaderMedia | null;
  label?: string;
};

type HeaderMessages = {
  logo?: HeaderMedia | null;
  links?: HeaderNavLink[];
  socialLinks?: HeaderSocialLink[];
};

export default function Navbar() {
  const locale = useLocale();
  const messages = useMessages() as { Header?: HeaderMessages };
  const header = messages?.Header || {};
  const logoSrc =
    header?.logo && typeof header.logo === "object" && typeof header.logo.url === "string"
      ? header.logo.url
      : undefined;
  const announcement = announcementByLocale[locale] || announcementByLocale.en;

  const navLinks = Array.isArray(header?.links) && header.links.length > 0
    ? header.links.map((link) => ({
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
    ? header.socialLinks.map((link) => ({
        href: link?.href || "#",
        iconName: link?.icon || "instagram",
        iconSrc:
          link?.uploadedIcon &&
          typeof link.uploadedIcon === "object" &&
          typeof link.uploadedIcon.url === "string"
            ? link.uploadedIcon.url
            : `/icons/${link?.icon || "instagram"}.svg`,
        label: link?.label || "Social",
      }))
    : [
        {
          href: "https://instagram.com",
          iconName: "instagram",
          iconSrc: "/icons/instagram.svg",
          label: "Instagram",
        },
        {
          href: "https://facebook.com",
          iconName: "facebook",
          iconSrc: "/icons/facebook.svg",
          label: "Facebook",
        },
      ];

  return (
    <>
      <MobileNavbar navLinks={navLinks} socialLinks={socialLinks} logoSrc={logoSrc} />
      <DesktopNavbar navLinks={navLinks} socialLinks={socialLinks} logoSrc={logoSrc} />
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

type SocialLink = {
  href: string;
  iconName: string;
  iconSrc: string;
  label: string;
};

function NavIcons({ links }: { links: SocialLink[] }) {
  return (
    <>
      {links.map((link) => (
        <Fragment key={`${link.href}-${link.iconSrc}`}>
          <li>
            <NavIcon href={link.href} iconSrc={link.iconSrc} label={link.label} />
          </li>
        </Fragment>
      ))}
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
      className={`relative ml-4 inline-flex h-6 w-6 items-center justify-center transition-transform ${isPopping ? 'animate-bounce scale-115' : 'hover:scale-110'}`}
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
  iconSrc?: string;
  icon?: string;
  label: string;
};

export function NavIcon({ href, iconSrc, icon, label }: NavIconProps) {
  const src = iconSrc || `/icons/${icon || "instagram"}.svg`;

  return (
    <Link href={href} aria-label={label}>
      <img src={src} alt={label} className="hover:bg-con h-6 w-6 object-contain" />
    </Link>
  );
}

export function MobileNavbar({
  navLinks,
  socialLinks,
  logoSrc,
}: {
  navLinks: Array<{ href: string; text: string }>;
  socialLinks: SocialLink[];
  logoSrc?: string;
}) {
  const [visible, setVisible] = useState(false);
  const right = visible ? "0%" : "100%";
  const handleMinimize = () => setVisible((visible) => !visible);

  const pathname = usePathname();
  useEffect(() => {
    setVisible(false);
  }, [pathname])

  return (
    <div className={`sticky top-0 left-0 z-1000 h-12 md:hidden ${vawaaSans.className}`}>
      <NavHead handleMinimize={handleMinimize} logoSrc={logoSrc} />
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

function NavHead({
  handleMinimize,
  logoSrc,
}: {
  handleMinimize: MouseEventHandler;
  logoSrc?: string;
}) {
  return (
    <nav className="bg-base-100 flex h-12 w-screen flex-row px-4 items-center">
      <div className="mr-4 flex flex-row items-center">
        <Logo src={logoSrc} />
      </div>
      <div className="grow" />
      <FavoritesCounterIcon />
      <LocaleDropdown />
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
  socialLinks: SocialLink[];
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
  logoSrc,
}: {
  navLinks: Array<{ href: string; text: string }>;
  socialLinks: SocialLink[];
  logoSrc?: string;
}) {
  return (
    <nav className={`bg-base-100 sticky top-0 left-0 z-10 hidden h-12 w-screen flex-row items-center px-4 md:flex ${vawaaSans.className}`}>
      <div className="mr-4 flex flex-row items-center">
        <Logo src={logoSrc} />
      </div>
      <ul className="flex flex-row items-center gap-8">
        <NavLinks links={navLinks} />
      </ul>
      <div className="grow" />
      <ul className="flex flex-row items-center gap-5">
        <NavIcons links={socialLinks} />
      </ul>
      <FavoritesCounterIcon />
      <LocaleDropdown />
    </nav>
  );
}
