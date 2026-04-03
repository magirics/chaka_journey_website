import { CollectionConfig } from "payload";

const toSlugPart = (value?: string) =>
    (value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const Experiences: CollectionConfig = {
    slug: "experiences",
    admin: {
        useAsTitle: "title",
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    hooks: {
        beforeValidate: [
            ({ data, originalDoc }) => {
                if (!data) return data;

                const userName = data?.user?.name || originalDoc?.user?.name;
                const masterName = data?.master?.name || originalDoc?.master?.name;
                const country =
                    data?.master?.country ||
                    originalDoc?.master?.country ||
                    data?.user?.country ||
                    originalDoc?.user?.country;

                const slugParts = [
                    toSlugPart(userName),
                    toSlugPart(masterName),
                    toSlugPart(country),
                ].filter(Boolean);

                const generatedKey = slugParts.join("-");
                const nextData = {
                    ...data,
                    title:
                        typeof userName === "string" && userName.trim()
                            ? userName.trim()
                            : data?.title || originalDoc?.title,
                    key: generatedKey || data?.key || originalDoc?.key,
                };

                return nextData;
            },
        ],
    },
    fields: [
        {
            name: "key",
            type: "text",
            unique: true,
            admin: {
                description: "Se genera automaticamente como user-master-country.",
            },
            index: true,
        },
        {
            name: "title",
            type: "text",
            admin: {
                readOnly: true,
                description: "Se completa automaticamente con el nombre de user.",
            },
        },
        {
            name: "user",
            type: "group",
            fields: [
                { name: "name", type: "text" },
                { name: "country", type: "text" },
            ],
        },
        {
            name: "master",
            type: "group",
            fields: [
                { name: "name", type: "text" },
                { name: "craft", type: "text" },
                { name: "country", type: "text" },
            ],
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            admin: {
                description: "Imagen principal de la experiencia.",
            },
        },
        {
            name: "content",
            type: "richText",
            localized: true,
        },
    ],
};
