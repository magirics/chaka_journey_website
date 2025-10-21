import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pago cancelado | Chaka",
  description: "Pago cancelado. Tu reserva no se completó.",
};

export default function CancelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
