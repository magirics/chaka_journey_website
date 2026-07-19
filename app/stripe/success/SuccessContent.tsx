"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const successTextByLocale: Record<string, {
  title: string;
  giftMessage: string;
  reserveMessage: string;
  backToMasters: string;
}> = {
  es: {
    title: "Pago exitoso",
    giftMessage: "Tu pago fue recibido. Te enviaremos un correo cuando el regalo haya sido confirmado.",
    reserveMessage:
      "Tu pago fue recibido y estamos terminando de procesar la reserva. Cuando recibas el correo de confirmacion, significa que el pago se completo correctamente y que tu reserva fue creada.",
    backToMasters: "Volver a Maestros",
  },
  en: {
    title: "Payment successful",
    giftMessage: "Your payment was received. We will email you once your gift is confirmed.",
    reserveMessage:
      "Your payment was received and we are finishing your booking process. Once you receive the confirmation email, your booking is fully created.",
    backToMasters: "Back to Masters",
  },
  fr: {
    title: "Paiement reussi",
    giftMessage: "Votre paiement a ete recu. Nous vous enverrons un email lorsque le cadeau sera confirme.",
    reserveMessage:
      "Votre paiement a ete recu et nous finalisons votre reservation. Lorsque vous recevrez l'email de confirmation, votre reservation sera creee.",
    backToMasters: "Retour aux Maitres",
  },
  de: {
    title: "Zahlung erfolgreich",
    giftMessage: "Deine Zahlung wurde empfangen. Wir senden dir eine E-Mail, sobald das Geschenk bestatigt ist.",
    reserveMessage:
      "Deine Zahlung wurde empfangen und wir schliessen die Buchung ab. Sobald du die Bestatigung per E-Mail bekommst, ist die Reservierung erstellt.",
    backToMasters: "Zuruck zu Meistern",
  },
};

export default function SuccessContent({ checkoutType, locale = "en" }: { checkoutType?: string; locale?: string }) {
  const router = useRouter();
  const isGift = checkoutType === "gift";
  const t = successTextByLocale[locale] || successTextByLocale.en;

  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="text-green-500 mb-4"
      >
        <CheckCircle size={80} />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-gray-800"
      >
        {t.title}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mt-2"
      >
        {isGift
          ? t.giftMessage
          : t.reserveMessage}
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push(`/${locale}/masters`)}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600"
      >
        {t.backToMasters}
      </motion.button>
    </main>
  );
}
