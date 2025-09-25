import { CollectionConfig } from 'payload';

export const Maestros: CollectionConfig = {
  slug: 'maestros',
  admin: {
    useAsTitle: 'nombreCompleto',
  },
  access: {
    read: () => true,
  create: () => true,
  update: () => true,
  delete: () => true,
  },
  fields: [
    {
      name: 'nombreCompleto',
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
    },
    {
      name: 'especialidad',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'activo',
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
      name: 'city', // Ciudad del taller
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },

    
  ],
};
