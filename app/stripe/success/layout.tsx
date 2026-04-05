import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pago exitoso | Chaka",
  description: "Confirmación de pago exitoso de tu reserva en Chaka Journey.",
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
