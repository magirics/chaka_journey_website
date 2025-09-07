import { CollectionConfig } from "payload";
export const Reservas: CollectionConfig = {
  slug: "reservas",
  fields: [
    { name: "stripeSessionId", type: "text", required: true },
    { name: "customerEmail", type: "email" },
    { name: "amount", type: "number" },
    {
      name: "status",
      type: "select",
      options: ["paid", "failed"],
      defaultValue: "paid",
    },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "description", type: "text" },
        { name: "quantity", type: "number" },
      ],
    },
  ],
};
