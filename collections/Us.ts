import { CollectionConfig } from 'payload'

export const Us: CollectionConfig = {
  slug: 'us',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'version',
      type: 'text',
    },
    {
      name: 'pageTitle',
      label: 'Main page title',
      type: 'text',
      localized: true,
    },
    {
      name: 'introTitle',
      label: 'Intro title',
      type: 'text',
      localized: true,
    },
    {
      name: 'introText',
      label: 'Intro text',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      label: 'Main description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'workshopsText',
      label: 'Workshops text',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'comingSoonTitle',
      label: 'Coming soon title',
      type: 'text',
      localized: true,
    },
    {
      name: 'comingSoonItems',
      label: 'Coming soon items',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'gallery',
      label: 'Gallery images',
      type: 'array',
      maxRows: 7,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
