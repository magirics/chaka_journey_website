"use client";

import { motion } from "framer-motion";
import Navbar from "../../(frontend)/components/layout/Navbar";
import Footer from "../../(frontend)/components/layout/Footer";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";

export default function CancelPage() {
  const router = useRouter();

  // Si quieres, puedes determinar locale dinámicamente y cargar mensajes.
  // Aquí lo ponemos en 'es' para que LocaleDropdown no rompa si está presente.
  // Si prefieres detectar locale real, mete lógica adicional o mueve la página dentro de (frontend)/[locale].
  const locale = "es";

  useEffect(() => {
    // opcional: analytics, limpieza, etc.
  }, []);

  return (
    <NextIntlClientProvider locale={locale}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

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
              onClick={() => router.push("/")}
              className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
            >
              Volver al inicio
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

        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
