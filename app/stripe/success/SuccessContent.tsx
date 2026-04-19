"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SuccessContent() {
  const router = useRouter();

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
        Pago exitoso
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mt-2"
      >
        Gracias por tu reserva. Hemos enviado un correo de confirmación.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600"
      >
        Volver al inicio
      </motion.button>
    </main>
  );
}
