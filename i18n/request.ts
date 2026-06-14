import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { footerPageMessages } from './footerPages';

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
    const [homePage, headerContent, footerContent, usContent] = await Promise.all([
        fetchCollectionFirstDoc(
            `home?locale=${encodeURIComponent(locale)}&where[version][equals]=main`
        ),
        fetchCollectionFirstDoc(
            `header?locale=${encodeURIComponent(locale)}&where[version][equals]=main`
        ),
        fetchCollectionFirstDoc(
            `footer?locale=${encodeURIComponent(locale)}&where[version][equals]=main`
        ),
        fetchCollectionFirstDoc(
            `us?locale=${encodeURIComponent(locale)}&where[version][equals]=main`
        ),
    ]);

    const page = {
        Home: homePage,
        Header: headerContent,
        Footer: footerContent,
        Us: usContent,
        FooterPages: footerPageMessages[locale] || footerPageMessages.en,
    };

    return page as Record<string, unknown>;
}

export async function fetchCollectionFirstDoc(query: string) {
    const apiBaseUrls = await resolveApiBaseUrls();

    try {
        return await Promise.any(
            apiBaseUrls.map((baseUrl) => fetchDocFromBaseUrl(baseUrl, query))
        );
    } catch {
        return {};
    }
}

async function fetchDocFromBaseUrl(baseUrl: string, query: string) {
    const endpoint = `${baseUrl}/api/${query}`;
    let lastError: unknown;

    for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
            const res = await fetch(endpoint, {
                cache: 'no-store',
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
            return normalizeLocalhostUrls(body?.docs?.[0] || {});
        } catch (error) {
            lastError = error;

            const serialized = String(error);
            const isRetryableNetworkError =
                serialized.includes('UND_ERR_SOCKET') ||
                serialized.includes('ECONNRESET') ||
                serialized.includes('fetch failed');

            if (!isRetryableNetworkError || attempt === 1) {
                throw error;
            }
        }
    }

    throw lastError instanceof Error ? lastError : new Error(`Failed to fetch ${endpoint}`);
}

function normalizeLocalhostUrls<T>(value: T): T {
    if (Array.isArray(value)) {
        return value.map((item) => normalizeLocalhostUrls(item)) as T;
    }

    if (value && typeof value === 'object') {
        const normalizedEntries = Object.entries(value as Record<string, unknown>).map(
            ([key, entryValue]) => [key, normalizeLocalhostUrls(entryValue)]
        );

        return Object.fromEntries(normalizedEntries) as T;
    }

    if (typeof value === 'string') {
        const localhostMatch = value.match(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/.*)$/i);
        if (localhostMatch) {
            return localhostMatch[3] as T;
        }
    }

    return value;
}

async function resolveApiBaseUrls() {
    const requestHeaders = await headers();
    const host = requestHeaders.get('host');
    const forwardedProto = requestHeaders.get('x-forwarded-proto') || 'https';
    const requestOrigin = host ? `${forwardedProto}://${host}` : undefined;

    const candidates = [
        requestOrigin,
        process.env.NEXT_PUBLIC_APP_URL,
        process.env.PAYLOAD_PUBLIC_SERVER_URL,
        process.env.NEXT_PUBLIC_PAYLOAD_URL,
        'http://localhost:3000',
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
