'use client';

import { useLocale } from "next-intl";
import { Link, usePathname } from '@/navigation';

const locales = [
    {
        label: 'English',
        code: 'en',
    },
    {
        label: 'Français',
        code: 'fr',
    },
    {
        label: 'Deutsch',
        code: 'de',
    },
    {
        label: 'Español',
        code: 'es',
    },
]

export default function LocaleDropdown() {
    const locale = useLocale();
    const pathname = usePathname();
    const href = pathname || '/';

    return <div className="dropdown dropdown-hover dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm mx-2 rounded-field">
            {locale.toUpperCase()}
        </div>
        <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-200 rounded-box z-1 w-40 p-2 shadow-sm">
            {
                locales.map(({ code, label }) => {
                    return <li key={code}>
                        <Link href={href} locale={code}>{label} ({code.toLocaleUpperCase()})</Link>
                    </li>
                })
            }
        </ul>
    </div>
}