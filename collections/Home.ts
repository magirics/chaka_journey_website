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
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Hero title",
          type: "text",
          localized: true,
        },
        {
          name: "subtitle",
          label: "Hero subtitle",
          type: "text",
          localized: true,
        },
        {
          name: "buttonText",
          label: "Hero button text",
          type: "text",
          localized: true,
        },
        {
          name: "backgroundImage",
          label: "Hero background image",
          type: "upload",
          relationTo: "media",
          localized: false,
        },
      ],
    },

    // Secciones anchas (wideSections)
    {
      name: "wideSections",
      label: "Wide sections",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "text",
          type: "text",
          localized: true,
        },
      ],
    },

    // Tarjetas gruesas (chunkyCards)
    {
      name: "chunkyCards",
      label: "Chunky cards",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "title",
          type: "text",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
        },
        {
          name: "linkText",
          label: "Link text",
          type: "text",
          localized: true,
        },
      ],
    },

    // Hero inferior (bottomHero)
    {
      name: "bottomHero",
      label: "Bottom hero section",
      type: "group",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "text",
          type: "text",
          localized: true,
        },
        {
          name: "buttonText",
          type: "text",
          localized: true,
        },
      ],
    },
  ],
};
