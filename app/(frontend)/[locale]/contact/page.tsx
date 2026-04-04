"use client";

import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.typeform.com/embed.js";
    script.id = "typef_orm";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("typef_orm");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
      <h1 className="mb-6 text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-neutral-900 md:text-6xl">
        Contáctanos
      </h1>
      <p className="mb-8 max-w-2xl text-base leading-7 font-medium text-neutral-700 md:text-lg">
        Cuéntanos sobre tu interés y te responderemos con más detalle.
      </p>
      <div
        className="typeform-widget"
        data-url="https://form.typeform.com/to/WcDkGrEy"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}