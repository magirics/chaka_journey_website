import PageTitle from "@/ui/PageTitle";
import { Manrope } from "next/font/google";
import { useMessages } from "next-intl";

const vawaaSans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fallbackImages = [
  "/draft/us/image (1).jpg",
  "/draft/us/image (2).jpg",
  "/draft/us/image (3).jpg",
  "/draft/us/image (4).jpg",
  "/draft/us/image (5).jpg",
  "/draft/us/image (6).jpg",
  "/draft/us/image (7).jpg",
];

const fallbackText = {
  introTitle: "Nuestra web esta en construccion...",
  introText: "Pero el viaje ya ha comenzado. 🌱",
  description:
    "Es una plataforma dedicada a las experiencias de aprendizaje vivencial con maestros de saberes tradicionales en America Latina.",
  workshopsText:
    "Talleres de tejido, cocina, ceramica, agroecologia, construccion natural... y mucho mas.",
  comingSoonTitle: "Muy pronto podras:",
  comingSoonItems: [
    "Descubrir experiencias por region o tematica",
    "Reservar directamente desde nuestra web",
    "Conectarte con saberes vivos, de forma autentica y sostenible",
  ],
};

export default function Us() {
  const messages = useMessages();
  const us = (messages?.Us as Record<string, any>) || {};

  const payloadImages =
    Array.isArray(us?.gallery) && us.gallery.length > 0
      ? us.gallery
          .map((item: any) => item?.image?.url)
          .filter(Boolean)
      : [];

  const images = payloadImages.length > 0 ? payloadImages : fallbackImages;

  const comingSoonItems =
    Array.isArray(us?.comingSoonItems) && us.comingSoonItems.length > 0
      ? us.comingSoonItems.map((item: any) => item?.text).filter(Boolean)
      : fallbackText.comingSoonItems;

  return (
    <>
      <PageTitle>Nuestra experiencia</PageTitle>

      <section className={`mb-20 w-full px-6 md:px-14 ${vawaaSans.className}`}>
        <div className="mb-20 grid w-full gap-2 md:grid-cols-6 md:grid-rows-6">
          <img
            src={images[0] || fallbackImages[0]}
            className="overflow-hidden rounded-sm bg-neutral-200 object-cover md:col-span-2 md:row-span-4"
          />
          <img
            src={images[2] || fallbackImages[2]}
            className="overflow-hidden rounded-sm bg-neutral-200 object-cover md:col-span-2 md:row-span-2"
          />
          <img
            src={images[5] || fallbackImages[5]}
            className="overflow-hidden rounded-sm bg-neutral-200 object-cover md:col-span-2 md:row-span-3"
          />
          <img
            src={images[3] || fallbackImages[3]}
            className="overflow-hidden rounded-sm bg-neutral-200 object-cover md:col-span-2 md:row-span-2"
          />
          <img
            src={images[6] || fallbackImages[6]}
            className="overflow-hidden rounded-sm bg-neutral-200 object-cover md:col-span-2 md:row-span-3"
          />
          <img
            src={images[1] || fallbackImages[1]}
            className="overflow-hidden rounded-sm bg-neutral-200 object-cover md:col-span-2 md:row-span-2"
          />
          <img
            src={images[4] || fallbackImages[4]}
            className="overflow-hidden rounded-sm bg-neutral-200 object-cover md:col-span-2 md:row-span-2"
          />
        </div>

        <div className="mx-auto max-w-3xl space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-2xl leading-[1.3] font-semibold tracking-[-0.02em] text-neutral-900 md:text-3xl">
              {us?.introTitle || fallbackText.introTitle}
            </p>
            <p className="text-lg leading-[1.4] font-light text-neutral-600 md:text-xl">
              {us?.introText || fallbackText.introText}
            </p>
          </div>

          {/* Main description */}
          <div className="space-y-6 border-t border-neutral-200 pt-8">
            <p className="text-base leading-[1.75] font-light text-neutral-700 md:text-lg">
              {us?.description || fallbackText.description}
            </p>
            
            <p className="text-base leading-[1.75] font-light text-neutral-700 md:text-lg">
              <span className="font-medium text-neutral-900">{us?.workshopsText || fallbackText.workshopsText}</span>
            </p>
          </div>

          {/* Coming soon section */}
          <div className="space-y-6 bg-neutral-50 px-8 py-10 md:px-12">
            <p className="text-lg font-semibold tracking-[-0.01em] text-neutral-900">
              🔜 {us?.comingSoonTitle || fallbackText.comingSoonTitle}
            </p>
            <div className="space-y-4">
              {comingSoonItems.map((item: string, index: number) => (
                <div key={`${item}-${index}`} className="flex items-start gap-4">
                  <span className="mt-1 text-xl">✔️</span>
                  <p className="text-base leading-[1.6] font-medium text-neutral-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
