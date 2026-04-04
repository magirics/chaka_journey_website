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
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>
      <div
        className="typeform-widget"
        data-url="https://form.typeform.com/to/WcDkGrEy"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}