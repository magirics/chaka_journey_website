import { NextIntlClientProvider } from "next-intl";
import Navbar from "../../(frontend)/components/layout/Navbar";
import Footer from "../../(frontend)/components/layout/Footer";
import CancelContent from "./CancelContent";
import { footerPageMessages } from "../../../i18n/footerPages";

export const metadata = {
  title: "Pago cancelado | Chaka",
  description: "Confirmación de pago cancelado",
};

export default function CancelPage() {
  const locale = "es";
  
  const messages = {
    Header: {},
    Footer: {},
    FooterPages: footerPageMessages[locale] || footerPageMessages.en,
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <CancelContent />
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
