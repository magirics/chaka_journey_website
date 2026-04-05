import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{
    segments?: string[];
  }>;
};

export default async function LocalizedAdminBridgePage({ params }: PageProps) {
  const { segments = [] } = await params;
  const suffix = segments.length > 0 ? `/${segments.join('/')}` : '';
  redirect(`/admin${suffix}`);
}
