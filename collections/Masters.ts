import { CollectionConfig } from 'payload';

export const Masters: CollectionConfig = {
  slug: 'masters',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  create: () => true,
  update: () => true,
  delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'key', // DNI
      type: 'text',
      required: true,
      admin: {
        description: 'Documento Nacional de Identidad del maestro',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'specialty',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      maxRows: 9,
      admin: {
        description: 'Maximo 9 imágenes para la galería del maestro.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title', // Título del taller
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'experienceIncludes',
      label: 'Experience includes content',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Body editable para la sección "La experiencia incluye".',
      },
    },
    {
      name: 'exploreCity',
      label: 'Explore city content',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Body editable para la sección "Explora la ciudad".',
      },
    },
    {
      name: 'additionalDetails',
      label: 'Additional details content',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Body editable para la sección "Adicional".',
      },
    },
    {
      name: 'price', // Precio del taller
      type: 'number',
      required: true,
      admin: {
        description: 'Precio en soles',
      },
    },
    {
      name: 'days', // Días del taller
      type: 'number',
      required: true,
    },
      {
      name: "availability",
      type: "array",
      fields: [
        {
          name: "from",
          type: "date",
          required: true,
        },
        {
          name: "to",
          type: "date",
          required: true,
        }
      ]
    }
,
    {
      name: 'city', // Ciudad del taller
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },

    
  ],
};
