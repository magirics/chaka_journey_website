import { CollectionConfig } from 'payload';

export const Masters: CollectionConfig = {
  slug: 'masters',
  admin: {
    useAsTitle: 'name',
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
      localized: true,
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
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title', // Título del taller
      type: 'text',
      required: true,
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
