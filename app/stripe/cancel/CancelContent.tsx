"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const cancelTextByLocale: Record<string, {
  title: string;
  message: string;
  backToMasters: string;
  tryAgain: string;
  contactSupport: string;
}> = {
  es: {
    title: "Pago cancelado",
    message: "Tu pago no se completo. Si crees que esto es un error, intenta nuevamente o contacta con soporte.",
    backToMasters: "Volver a Maestros",
    tryAgain: "Intentar de nuevo",
    contactSupport: "Contactar soporte",
  },
  en: {
    title: "Payment cancelled",
    message: "Your payment was not completed. If you think this is an error, try again or contact support.",
    backToMasters: "Back to Masters",
    tryAgain: "Try again",
    contactSupport: "Contact support",
  },
  fr: {
    title: "Paiement annule",
    message: "Votre paiement n'a pas ete finalise. Si vous pensez qu'il s'agit d'une erreur, reessayez ou contactez le support.",
    backToMasters: "Retour aux Maitres",
    tryAgain: "Reessayer",
    contactSupport: "Contacter le support",
  },
  de: {
    title: "Zahlung abgebrochen",
    message: "Deine Zahlung wurde nicht abgeschlossen. Wenn du glaubst, dass es ein Fehler ist, versuche es erneut oder kontaktiere den Support.",
    backToMasters: "Zuruck zu Meistern",
    tryAgain: "Erneut versuchen",
    contactSupport: "Support kontaktieren",
  },
};

export default function CancelContent({ locale = "en" }: { locale?: string }) {
  const router = useRouter();
  const t = cancelTextByLocale[locale] || cancelTextByLocale.en;

  useEffect(() => {
    // opcional: analytics, limpieza, etc.
  }, []);

  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="mb-6"
      >
        <XCircle className="w-20 h-20 text-red-500 mx-auto" />
      </motion.div>

      <motion.h1
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-2xl font-semibold text-gray-900 mb-3"
      >
        {t.title}
      </motion.h1>

      <motion.p
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-gray-600 mb-6 max-w-xl"
      >
        {t.message}
      </motion.p>

      <div className="flex gap-3">
        <button
          onClick={() => router.push(`/${locale}/masters`)}
          className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
        >
          {t.backToMasters}
        </button>

        <button
          onClick={() => router.back()}
          className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          {t.tryAgain}
        </button>

        <a
          href="mailto:soporte@tusitio.com"
          className="px-5 py-2 rounded-lg border border-transparent text-gray-700 hover:underline"
        >
          {t.contactSupport}
        </a>
      </div>
    </main>
  );
}
