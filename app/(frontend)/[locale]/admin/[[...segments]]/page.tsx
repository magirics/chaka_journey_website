import { redirect } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../../../../i18n/routing';

type PageProps = {
  params: Promise<{
    locale: string;
    segments?: string[];
  }>;
};

export default async function LocalizedAdminBridgePage({ params }: PageProps) {
  const { locale, segments = [] } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const suffix = segments.length > 0 ? `/${segments.join('/')}` : '';
  redirect(`/admin${suffix}`);
}
