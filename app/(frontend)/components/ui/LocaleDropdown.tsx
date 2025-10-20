'use client';

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from '@/navigation';

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

const defaultLocale = { label: 'English', code: 'en' }

export default function LocaleDropdown() {
    const locale = useLocale()
    const pathname = usePathname()
    console.log(pathname)


    return <div className="dropdown dropdown-hover dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm mx-2 rounded-field">
            {locale.toUpperCase()}
        </div>
        <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-200 rounded-box z-1 w-40 p-2 shadow-sm">
            {
                locales.sort().map(({ code, label }) => {
                    const href = pathname.substring(pathname.indexOf('/', 1))

                    return <li key={code}>
                        <Link href={href} locale={code}>{label} ({code.toLocaleUpperCase()})</Link>
                    </li>
                })
            }
        </ul>
    </div>
}