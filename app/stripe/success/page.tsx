import { NextIntlClientProvider } from "next-intl";
import Navbar from "../../(frontend)/components/layout/Navbar";
import Footer from "../../(frontend)/components/layout/Footer";
import SuccessContent from "./SuccessContent";
import { footerPageMessages } from "../../../i18n/footerPages";

export const metadata = {
  title: "Pago exitoso | Chaka",
  description: "Confirmación de pago exitoso",
};

export default function SuccessPage() {
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
        <SuccessContent />
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
