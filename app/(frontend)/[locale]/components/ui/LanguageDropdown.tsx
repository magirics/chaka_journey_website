'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Locale = {
    label: string
    code: string
}

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

export default function LanguageDropDown() {
    const [locale, setLocale] = useState<Locale>(defaultLocale);
    const pathname = usePathname();


    return <div className="dropdown dropdown-hover dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm mx-2 rounded-field">
            {locale.code.toUpperCase()}
        </div>
        <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-200 rounded-box z-1 w-40 p-2 shadow-sm">
            {
                locales.sort().map(({ code, label }) => {
                    const path = pathname.replace(/\/.*?\//, `/${code}/`);

                    return <li key={code}>
                        <Link href={path}>{label} ({code.toLocaleUpperCase()})</Link>
                    </li>
                })
            }
        </ul>
    </div>
}