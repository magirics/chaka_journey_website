import type { EditorialInfoPageContent } from "@/ui/EditorialInfoPage";

export default function LegalInfoPage({
  content,
}: {
  content: EditorialInfoPageContent;
}) {
  return (
    <div className="w-full bg-white text-[#1a1a1a]">
      <section className="mx-auto w-full max-w-[1080px] px-6 py-14 md:px-10 md:py-18">
        <header className="border-b border-black/18 pb-7">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/48">
            {content.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-normal tracking-[-0.03em] md:text-6xl">
            {content.title}
          </h1>
        </header>

        <div className="mt-8 space-y-5 text-[18px] leading-9 text-black/84 md:text-[19px]">
          <p>{content.intro}</p>
        </div>

        <div className="mt-12 space-y-12">
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-[30px] font-normal tracking-[-0.02em] text-black md:text-[42px]">
                {section.title}
              </h2>
              <div className="mt-5 space-y-5 text-[18px] leading-9 text-black/84 md:text-[19px]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-14 border-t border-black/12 pt-10">
          <h2 className="text-[30px] font-normal tracking-[-0.02em] text-black md:text-[42px]">
            {content.checklistTitle}
          </h2>
          <ul className="mt-5 space-y-4 text-[18px] leading-8 text-black/84 md:text-[19px]">
            {content.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}