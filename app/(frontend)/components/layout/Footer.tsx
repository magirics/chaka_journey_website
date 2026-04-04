"use client";

import Link from "next/link";
import { Link as LocaleLink } from "../navigation";
import { useMessages } from "next-intl";

const defaultTermsLinks = [
  { href: "/be-a-master", label: "Se un maestro" },
  { href: "/gift", label: "Regala una experiencia" },
  { href: "/terms", label: "Terminos" },
  { href: "/privacy", label: "Privacidad" },
];

const footerHrefByLabel: Record<string, string> = {
  "se un maestro": "/be-a-master",
  "sé un maestro": "/be-a-master",
  "be a master": "/be-a-master",
  "devenir maitre": "/be-a-master",
  "devenez maitre": "/be-a-master",
  "meister werden": "/be-a-master",
  "gastgeber meister werden": "/be-a-master",
  "regala una experiencia": "/gift",
  "gift an experience": "/gift",
  "offrir une experience": "/gift",
  "erlebnis verschenken": "/gift",
  "terminos": "/terms",
  "términos": "/terms",
  "terms": "/terms",
  "terms of service": "/terms",
  "conditions d'utilisation": "/terms",
  "nutzungsbedingungen": "/terms",
  "privacidad": "/privacy",
  "privacy": "/privacy",
  "privacy policy": "/privacy",
  "politique de confidentialite": "/privacy",
  "datenschutzerklarung": "/privacy",
};

const normalizeLabel = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function resolveFooterHref(href: string | undefined, label: string) {
  if (href && href.trim()) return href;

  const normalizedLabel = normalizeLabel(label);

  if (footerHrefByLabel[normalizedLabel]) {
    return footerHrefByLabel[normalizedLabel];
  }

  // Fallback by keyword so translated labels still map even if wording changes slightly.
  if (/(master|maitre|maestro|meister)/.test(normalizedLabel)) return "/be-a-master";
  if (/(gift|regal|cadeau|geschenk|experience|experiencia|erlebnis)/.test(normalizedLabel)) return "/gift";
  if (/(term|condit|nutzung|termino|termino|bedingungen)/.test(normalizedLabel)) return "/terms";
  if (/(privacy|privacidad|confidentialite|datenschutz)/.test(normalizedLabel)) return "/privacy";

  return "#";
}

export default function Footer() {
  const messages = useMessages() as Record<string, any>;
  const footer = (messages?.Footer as Record<string, any>) || {};

  const usLinks = Array.isArray(footer?.usLinks) && footer.usLinks.length > 0
    ? footer.usLinks.map((link: any) => ({ href: link?.href || "#", label: link?.label || "Link" }))
    : [
        { href: "/us", label: "Nosotros" },
        { href: "/experiences", label: "Experiencias" },
      ];

  const termsLinks = Array.isArray(footer?.termsLinks) && footer.termsLinks.length > 0
    ? footer.termsLinks.map((link: any) => ({
        href: resolveFooterHref(link?.href, link?.label || "Link"),
        label: link?.label || "Link",
      }))
    : defaultTermsLinks;

  const socialLinks = Array.isArray(footer?.socialLinks) && footer.socialLinks.length > 0
    ? footer.socialLinks.map((link: any) => ({
        href: link?.href || "#",
        icon: link?.icon || "instagram",
        label: link?.label || "Social",
      }))
    : [
        { href: "https://instagram.com", icon: "instagram", label: "Instagram" },
        { href: "https://facebook.com", icon: "facebook", label: "Facebook" },
        { href: "https://twitter.com", icon: "twitter", label: "Twitter" },
        { href: "mailto:chaka_journey@gmail.com", icon: "email", label: "Email" },
      ];

  return (
    <footer className="w-screen bg-[#141416] px-8 py-10 text-white md:px-12 md:py-11">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-10 md:grid-cols-[minmax(320px,1.45fr)_minmax(170px,0.78fr)_minmax(240px,0.98fr)_minmax(220px,0.9fr)] md:gap-12">
          <Subscribe footer={footer} />
          <Us links={usLinks} />
          <Terms links={termsLinks} />
          <Contact footer={footer} socialLinks={socialLinks} />
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-6 text-[13px] text-white/48 md:flex-row md:items-center md:justify-between">
          <small className="tracking-[0.02em]">&copy; {new Date().getFullYear()} {footer?.copyrightText || "Chaka Journey"}</small>
          <BrandLockup />
        </div>
      </div>
    </footer>
  );
}

export function Subscribe({ footer }: { footer: Record<string, any> }) {
  return (
    <section className="max-w-[430px] md:pr-8">
      <h6 className="text-[27px] leading-[1.08] font-normal tracking-[-0.02em] text-white md:text-[30px]">
        {footer?.subscribeTitle || "No te pierdas de nada"}
      </h6>
      <p className="mt-5 max-w-[320px] text-[14px] leading-7 text-white/80 md:text-[15px]">
        {footer?.subscribeDescription || "Se el primero en saber de nuevos maestros, destinos y anuncios."}
      </p>
      <form className="mt-8 flex flex-col gap-6">
        <input
          type="text"
          placeholder={footer?.namePlaceholder || "Nombre"}
          name="name"
          id="name"
          className="border-0 border-b border-white/40 bg-transparent px-0 pb-3 text-[15px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-white focus:ring-0"
        />
        <input
          type="email"
          placeholder={footer?.emailPlaceholder || "Correo"}
          name="email"
          id="email"
          className="border-0 border-b border-white/40 bg-transparent px-0 pb-3 text-[15px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-white focus:ring-0"
        />
        <button className="mt-1 h-12 w-full border border-white bg-white text-[15px] font-medium text-black transition-colors hover:bg-transparent hover:text-white md:max-w-[365px]">
          {footer?.subscribeButtonText || "Suscribir"}
        </button>
      </form>
    </section>
  );
}

export function Us({ links }: { links: Array<{ href: string; label: string }> }) {
  return (
    <section className="pt-3 md:pt-4">
      <ul className="space-y-7 text-[15px] font-medium leading-none text-white/92 md:text-[16px]">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}><FooterLink href={link.href}>{link.label}</FooterLink></li>
        ))}
      </ul>
    </section>
  );
}

export function Terms({ links }: { links: Array<{ href: string; label: string }> }) {
  return (
    <section className="pt-3 md:pt-4">
      <ul className="space-y-7 text-[15px] font-medium leading-none text-white/92 md:text-[16px]">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}><FooterLink href={link.href}>{link.label}</FooterLink></li>
        ))}
      </ul>
    </section>
  );
}

export function Contact({
  footer,
  socialLinks,
}: {
  footer: Record<string, any>;
  socialLinks: Array<{ href: string; icon: string; label: string }>;
}) {
  return (
    <section className="pt-3 md:pt-4">
      <h6 className="text-[15px] font-medium text-white/92 md:text-[16px]">{footer?.contactTitle || "Contactanos"}</h6>
      <ul className="mt-6 flex flex-row flex-wrap gap-4">
        {socialLinks.map((link) => (
          <li key={`${link.href}-${link.icon}`}><SocialIcon href={link.href} icon={link.icon} label={link.label} /></li>
        ))}
      </ul>
    </section>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <LocaleLink href={href} className="text-white/96 transition-all hover:text-white hover:opacity-72">
      {children}
    </LocaleLink>
  );
}

function SocialIcon({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="block transition-opacity hover:opacity-72">
      <img src={`/icons/${icon}.svg`} alt={label} className="h-[25px] w-[25px] invert" />
    </Link>
  );
}

function BrandLockup() {
  return (
    <LocaleLink href="/home" className="inline-flex items-center gap-3 text-white/90 transition-opacity hover:opacity-75">
      <img src="/logo.png" alt="Chaka" className="h-7 w-auto invert" />
      <span className="text-[11px] font-medium tracking-[0.22em]">CHAKA JOURNEY</span>
    </LocaleLink>
  );
}
