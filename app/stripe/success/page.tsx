import { NextIntlClientProvider } from "next-intl";
import Navbar from "../../(frontend)/components/layout/Navbar";
import Footer from "../../(frontend)/components/layout/Footer";
import SuccessContent from "./SuccessContent";
import { footerPageMessages } from "../../../i18n/footerPages";

export const metadata = {
  title: "Pago exitoso | Chaka",
  description: "Confirmación de pago exitoso",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout_type?: string }>;
}) {
  const locale = "es";
  const { checkout_type: checkoutType } = await searchParams;
  
  const messages = {
    Header: {},
    Footer: {},
    FooterPages: footerPageMessages[locale] || footerPageMessages.en,
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <SuccessContent checkoutType={checkoutType} />
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
