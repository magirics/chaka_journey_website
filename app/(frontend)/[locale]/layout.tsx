import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getMessages } from "next-intl/server";

const siteSans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

type HeaderMessages = {
  favicon?:
    | {
        url?: string | null;
      }
    | string
    | null;
};

export async function generateMetadata(): Promise<Metadata> {
  const messages = await getMessages();
  const header = messages.Header as HeaderMessages | undefined;
  const faviconUrl =
    typeof header?.favicon === "object" && header.favicon
      ? header.favicon.url
      : null;
  const icon = faviconUrl || "/logo.png";

  return {
    title: "Chaka Journey",
    description: "Explora talleres únicos con artistas locales.",
    icons: {
      icon,
      shortcut: icon,
      apple: icon,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={siteSans.className}>
      <Navbar />
      <main className="mx-auto flex max-w-250 grow flex-col items-center">{children}</main>
      <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
