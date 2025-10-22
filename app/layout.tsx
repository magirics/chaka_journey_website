// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chaka Journey",
  description: "Explora talleres únicos con artistas locales.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen w-screen flex-col">
        {children}
      </body>
    </html>
  );
}

