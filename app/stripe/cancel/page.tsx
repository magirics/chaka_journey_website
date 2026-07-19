import { NextIntlClientProvider } from "next-intl";
import Navbar from "../../(frontend)/components/layout/Navbar";
import Footer from "../../(frontend)/components/layout/Footer";
import CancelContent from "./CancelContent";
import { footerPageMessages } from "../../../i18n/footerPages";

export const metadata = {
  title: "Pago cancelado | Chaka",
  description: "Confirmación de pago cancelado",
};

export default async function CancelPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  const allowedLocales = ["es", "en", "fr", "de"];
  const { locale: rawLocale } = await searchParams;
  const locale = allowedLocales.includes(String(rawLocale)) ? String(rawLocale) : "en";
  
  const messages = {
    Header: {},
    Footer: {},
    FooterPages: footerPageMessages[locale] || footerPageMessages.en,
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <CancelContent locale={locale} />
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
