import { Link } from "../navigation";

type InfoStat = {
  value: string;
  label: string;
};

type InfoSection = {
  label: string;
  title: string;
  paragraphs: string[];
};

type CallToAction = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export type EditorialInfoPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  stats: InfoStat[];
  quote: string;
  quoteAuthor: string;
  sections: InfoSection[];
  checklistTitle: string;
  checklist: string[];
  cta: CallToAction;
};

export default function EditorialInfoPage({
  content,
}: {
  content: EditorialInfoPageContent;
}) {
  return (
    <div className="w-full bg-[#f4efe5] text-[#16110f]">
      <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] md:px-10 md:py-16">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <span className="inline-flex rounded-full border border-[#16110f]/15 bg-white/60 px-4 py-1 text-[11px] font-semibold tracking-[0.24em] uppercase">
              {content.eyebrow}
            </span>
            <h1 className="mt-6 max-w-[12ch] text-5xl leading-[0.94] font-semibold tracking-[-0.04em] md:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[18px] leading-8 text-[#16110f]/78 md:text-[19px]">
              {content.intro}
            </p>
          </div>

          <div className="grid gap-4 border-t border-[#16110f]/12 pt-6 sm:grid-cols-3">
            {content.stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`} className="rounded-[24px] bg-[#16110f] px-5 py-5 text-[#f6f1e8]">
                <p className="text-3xl leading-none font-semibold tracking-[-0.03em] md:text-4xl">{stat.value}</p>
                <p className="mt-3 text-sm leading-6 text-[#f6f1e8]/72">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] bg-[#d8c6af]">
          <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#16110f]/10 to-transparent" />
          <img
            src={content.heroImage}
            alt={content.heroAlt}
            className="h-full min-h-[380px] w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-[#16110f] text-[#f6f1e8]">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-6 py-10 md:grid-cols-[minmax(240px,0.75fr)_minmax(0,1fr)] md:px-10 md:py-12">
          <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#f6f1e8]/48">
            Manifiesto Chaka
          </p>
          <figure>
            <blockquote className="max-w-[30ch] text-2xl leading-[1.25] tracking-[-0.03em] md:text-4xl">
              {content.quote}
            </blockquote>
            <figcaption className="mt-5 text-sm text-[#f6f1e8]/68">{content.quoteAuthor}</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-14 md:grid-cols-[minmax(180px,0.32fr)_minmax(0,1fr)] md:px-10 md:py-18">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#16110f]/40">
            Recorrido
          </p>
        </div>
        <div className="space-y-12">
          {content.sections.map((section) => (
            <article
              key={section.title}
              className="grid gap-4 border-b border-[#16110f]/10 pb-10 md:grid-cols-[minmax(140px,0.28fr)_minmax(0,1fr)]"
            >
              <div>
                <span className="text-sm font-medium text-[#16110f]/44">{section.label}</span>
              </div>
              <div>
                <h2 className="text-2xl leading-tight font-semibold tracking-[-0.03em] md:text-[34px]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[17px] leading-8 text-[#16110f]/78 md:text-[18px]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 pb-16 md:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.75fr)] md:px-10 md:pb-20">
        <div className="rounded-[32px] bg-white px-6 py-7 shadow-[0_20px_60px_rgba(22,17,15,0.08)] md:px-8 md:py-9">
          <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#16110f]/40">
            {content.checklistTitle}
          </p>
          <ul className="mt-6 space-y-4 text-[17px] leading-7 text-[#16110f]/78">
            {content.checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#b86f52]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col justify-between rounded-[32px] bg-[#b86f52] px-6 py-7 text-white md:px-8 md:py-9">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/68">
              Siguiente paso
            </p>
            <h2 className="mt-5 max-w-[12ch] text-3xl leading-tight font-semibold tracking-[-0.03em] md:text-4xl">
              {content.cta.title}
            </h2>
            <p className="mt-4 max-w-[34ch] text-[16px] leading-7 text-white/82 md:text-[17px]">
              {content.cta.description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={content.cta.primaryHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#16110f] transition-transform hover:-translate-y-0.5"
            >
              {content.cta.primaryLabel}
            </Link>
            {content.cta.secondaryHref && content.cta.secondaryLabel ? (
              <Link
                href={content.cta.secondaryHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/34 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                {content.cta.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </aside>
      </section>
    </div>
  );
}