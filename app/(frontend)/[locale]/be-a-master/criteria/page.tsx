'use client';

import { Link } from '@/navigation';
import { Manrope } from 'next/font/google';
import { useLocale } from 'next-intl';
import { useMemo, useState } from 'react';
import { contentByLocale } from '../content';

const vawaaSans = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const unlockHintByLocale: Record<string, string> = {
  es: 'Avanza hasta el slide 06 para continuar',
  en: 'Reach slide 06 to continue',
  fr: "Passez au slide 06 pour continuer",
  de: 'Gehe bis Slide 06, um fortzufahren',
};

export default function BeAMasterCriteriaPage() {
  const locale = useLocale();
  const content = contentByLocale[locale] || contentByLocale.en;
  const unlockHint = unlockHintByLocale[locale] || unlockHintByLocale.en;
  const [index, setIndex] = useState(0);

  const total = content.criteria.length;
  const item = content.criteria[index];
  const isLastSlide = index === total - 1;

  const counter = useMemo(() => {
    const current = String(index + 1).padStart(2, '0');
    const size = String(total).padStart(2, '0');
    return `${current}/${size}`;
  }, [index, total]);

  const goPrev = () => setIndex((current) => (current - 1 + total) % total);
  const goNext = () => setIndex((current) => (current + 1) % total);

  return (
    <section
      id="criteria-carousel"
      className={`-mx-[calc(50vw-50%)] mt-3 mb-3 w-screen bg-[#070707] px-6 py-28 text-white md:px-10 md:py-36 ${vawaaSans.className}`}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mx-auto mb-20 max-w-4xl text-center text-3xl leading-[1.2] font-medium tracking-[-0.018em] md:text-5xl">
          {content.criteriaHeading}
        </h2>

        <div className="relative flex items-center justify-center">
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-0 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-black shadow-lg transition hover:scale-105"
          >
            ‹
          </button>

          <article className="mx-20 w-full max-w-5xl rounded-md bg-neutral-100 px-10 py-16 text-neutral-900 md:px-20 md:py-24">
            <div className="grid items-start gap-12 md:grid-cols-[180px_1fr]">
              <div>
                <p className="text-7xl font-medium leading-none tracking-[-0.02em]">{item.id}</p>
                <p className="mt-4 text-5xl font-light text-neutral-300 tracking-[-0.01em]">
                  /{String(total).padStart(2, '0')}
                </p>
              </div>

              <p className="max-w-3xl text-xl leading-[1.65] font-medium tracking-[-0.01em] md:text-3xl">
                {item.body}
              </p>
            </div>
          </article>

          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-0 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-black shadow-lg transition hover:scale-105"
          >
            ›
          </button>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
          <p className="text-sm tracking-[0.3em] text-white/60">{counter}</p>

          {isLastSlide ? (
            <Link
              href="/contact"
              className="border border-white bg-white px-10 py-4 text-sm font-semibold tracking-[0.14em] text-black uppercase transition hover:bg-neutral-200"
            >
              {content.continueLabel}
            </Link>
          ) : (
            <p className="text-xs tracking-[0.12em] font-medium text-white/55 uppercase">
              {unlockHint}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
