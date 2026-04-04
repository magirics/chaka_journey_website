import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { footerPageMessages } from './footerPages';

const apiBaseUrls = resolveApiBaseUrls();

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: await get_messages(locale),
    };
});

async function get_messages(locale: string) {
    const [homePage, headerContent, footerContent] = await Promise.all([
        fetchCollectionFirstDoc(
            `home?locale=${encodeURIComponent(locale)}&where[version][equals]=main`
        ),
        fetchCollectionFirstDoc(
            `header?locale=${encodeURIComponent(locale)}&where[version][equals]=main`
        ),
        fetchCollectionFirstDoc(
            `footer?locale=${encodeURIComponent(locale)}&where[version][equals]=main`
        ),
    ]);

    const page = {
        Home: homePage,
        Header: headerContent,
        Footer: footerContent,
        FooterPages: footerPageMessages[locale] || footerPageMessages.en,
    };

    return page as Record<string, unknown>;
}

async function fetchCollectionFirstDoc(query: string) {
    try {
        return await Promise.any(
            apiBaseUrls.map((baseUrl) => fetchDocFromBaseUrl(baseUrl, query))
        );
    } catch {
        return {};
    }
}

async function fetchDocFromBaseUrl(baseUrl: string, query: string) {
    const res = await fetch(`${baseUrl}/api/${query}`, {
        next: { revalidate: 120 },
        signal: AbortSignal.timeout(4500),
    });

    if (!res.ok) {
        throw new Error(`Non-OK response from ${baseUrl}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        throw new Error(`Invalid content type from ${baseUrl}`);
    }

    const body = await res.json();
    return body?.docs?.[0] || {};
}

function resolveApiBaseUrls() {
    const candidates = [
        process.env.NEXT_PUBLIC_APP_URL,
        process.env.PAYLOAD_PUBLIC_SERVER_URL,
        process.env.NEXT_PUBLIC_PAYLOAD_URL,
        'http://127.0.0.1:3000',
    ];

    const normalizedCandidates = new Set<string>();

    for (const candidate of candidates) {
        if (!candidate) continue;

        try {
            const normalized = candidate.startsWith('http')
                ? candidate
                : `http://${candidate}`;
            normalizedCandidates.add(new URL(normalized).origin);
        } catch {
            // Try next candidate
        }
    }

    return Array.from(normalizedCandidates);
}