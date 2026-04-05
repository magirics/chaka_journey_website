'use client';

import { Link } from '@/navigation';
import { Manrope } from 'next/font/google';
import { useLocale } from 'next-intl';
import { contentByLocale } from './content';

const vawaaSans = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function BeAMasterPage() {
  const locale = useLocale();
  const content = contentByLocale[locale] || contentByLocale.en;

  return (
    <div className={`w-full ${vawaaSans.className}`}>
      <section className="relative overflow-hidden bg-neutral-50 px-6 py-20 md:py-28">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8">
          <h1 className="max-w-4xl text-4xl leading-[1.12] font-medium tracking-[-0.02em] text-neutral-900 md:text-6xl">
            {content.heroTitle}
          </h1>
          <Link href="/be-a-master/criteria" className="bg-neutral-900 px-8 py-3 text-sm font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-black">
            {content.getStarted}
          </Link>
        </div>
      </section>
    </div>
  );
}