import { getFooterPageContent } from "../../../../i18n/footerPages";
import LegalInfoPage from "@/ui/LegalInfoPage";
import { getMessages } from "next-intl/server";

export default async function TermsPage() {
  const messages = (await getMessages()) as Record<string, unknown>;

  return (
    <LegalInfoPage
      content={getFooterPageContent(messages, "termsPage")}
    />
  );
}