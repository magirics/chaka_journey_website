import { getFooterPageContent } from "../../../../i18n/footerPages";
import EditorialInfoPage from "@/ui/EditorialInfoPage";
import { getMessages } from "next-intl/server";

export default async function BeAMasterPage() {
  const messages = (await getMessages()) as Record<string, unknown>;

  return (
    <EditorialInfoPage
      content={getFooterPageContent(messages, "beAMasterPage")}
    />
  );
}