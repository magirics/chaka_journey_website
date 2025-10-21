import { CollectionConfig } from "payload";

export const Home: CollectionConfig = {
    slug: "home",
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        { name: "version", type: "text" },
        { name: "title", type: "text", localized: true },
    ],
};
