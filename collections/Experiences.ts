import { CollectionConfig } from "payload";

export const Experiences: CollectionConfig = {
    slug: "experiences",
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        { name: "title", 
        type: "text" },
        { name: "content", 
        type: "richText",
        localized: true, // Guarda contenido por cada idioma
        },
    ],
};
