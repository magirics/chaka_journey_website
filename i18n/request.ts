import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

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
    // const result = await fetch('/payload/'); // Usar la ruta real de Payload
    // const data = await result.json();

    const en = {
        'Home': {
            'title': 'UNFORGETTABLE EXPERIENCES WITH A MASTER',
        }
    }

    const es = {
        'Home': {
            'title': 'EXPERIENCIAS INOLVIDABLES CON UN MAESTRO',
        }
    }

    let data = null;
    if (locale === 'en') data = en;
    if (locale === 'es') data = es;

    return data;
}