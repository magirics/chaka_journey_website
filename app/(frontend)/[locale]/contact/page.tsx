"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

const contactTextByLocale: Record<string, { title: string; intro: string }> = {
  es: {
    title: "Contactanos",
    intro: "Cuentanos sobre tu interes y te responderemos con mas detalle.",
  },
  en: {
    title: "Contact Us",
    intro: "Tell us about your interest and we will get back to you with more details.",
  },
  fr: {
    title: "Contactez-nous",
    intro: "Parlez-nous de votre interet et nous vous repondrons avec plus de details.",
  },
  de: {
    title: "Kontaktiere uns",
    intro: "Erzahle uns von deinem Interesse und wir antworten dir mit weiteren Details.",
  },
};

export default function Contact() {
  const locale = useLocale();
  const content = contactTextByLocale[locale] || contactTextByLocale.en;
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const typeformWindow = window as Window & {
      tf?: {
        load?: () => void;
      };
    };

    const mountWidget = () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }

      typeformWindow.tf?.load?.();
    };

    const existingScript = document.getElementById("typeform-embed-script") as HTMLScriptElement | null;

    if (typeformWindow.tf?.load) {
      mountWidget();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", mountWidget);
      return () => existingScript.removeEventListener("load", mountWidget);
    }

    const script = document.createElement("script");
    script.src = "https://embed.typeform.com/embed.js";
    script.id = "typeform-embed-script";
    script.async = true;
    script.addEventListener("load", mountWidget);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", mountWidget);
    };
  }, [locale]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
      <h1 className="mb-6 text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-neutral-900 md:text-6xl">
        {content.title}
      </h1>
      <p className="mb-8 max-w-2xl text-base leading-7 font-medium text-neutral-700 md:text-lg">
        {content.intro}
      </p>
      <div
        key={locale}
        ref={widgetRef}
        className="typeform-widget"
        data-url="https://form.typeform.com/to/WcDkGrEy"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}