import { CollectionConfig } from 'payload'

export const Header: CollectionConfig = {
  slug: 'header',
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
      name: 'logo',
      label: 'Header logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'links',
      label: 'Navigation links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social links',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon file name inside /public/icons without .svg',
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
  ],
}
