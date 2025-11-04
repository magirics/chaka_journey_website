import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { cookies, headers } from 'next/headers';

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
    const results = await Promise.all([
        await fetch(`http://localhost:3000/api/home?locale=${locale}&where[version][equals]=main`), //se recibe todo desde Payload
        // await fetch(`http://localhost:3000/api/experiences?locale=${locale}&where[version][equals]=main`);
    ])
    const bodies = await Promise.all(results.map(async result => await result.json()))
    const pages = bodies.map(body => body.docs[0])

    const page = {
        'Home': pages[0],
        // 'Experiences': pages[1]
    }

    return page;
}