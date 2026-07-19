"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CancelContent() {
  const router = useRouter();

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
        Pago cancelado
      </motion.h1>

      <motion.p
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-gray-600 mb-6 max-w-xl"
      >
        Tu pago no se completó. Si crees que esto es un error, intenta nuevamente o contacta con soporte.
      </motion.p>

      <div className="flex gap-3">
        <button
          onClick={() => router.push("/masters")}
          className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
        >
          Volver a Maestros
        </button>

        <button
          onClick={() => router.back()}
          className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Intentar de nuevo
        </button>

        <a
          href="mailto:soporte@tusitio.com"
          className="px-5 py-2 rounded-lg border border-transparent text-gray-700 hover:underline"
        >
          Contactar soporte
        </a>
      </div>
    </main>
  );
}
