import type { CollectionConfig, CollectionSlug } from 'payload';

export const Gifts: CollectionConfig = {
  slug: 'gifts',
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
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'master',
      type: 'relationship',
      relationTo: 'masters' as CollectionSlug,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'giftType',
      type: 'select',
      defaultValue: 'physical',
      required: true,
      options: [
        {
          label: 'Physical Gift Box',
          value: 'physical',
        },
        {
          label: 'Digital Gift Card',
          value: 'digital',
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Base price in USD.',
      },
    },
    {
      name: 'deliveryFee',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Flat delivery fee in USD. Use 0 for digital gifts.',
      },
    },
    {
      name: 'deliveryNotes',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};
