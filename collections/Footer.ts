import { CollectionConfig } from 'payload'

export const Footer: CollectionConfig = {
  slug: 'footer',
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
      name: 'subscribeTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'subscribeDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'namePlaceholder',
      type: 'text',
      localized: true,
    },
    {
      name: 'emailPlaceholder',
      type: 'text',
      localized: true,
    },
    {
      name: 'subscribeButtonText',
      type: 'text',
      localized: true,
    },
    {
      name: 'usLinks',
      label: 'About links',
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
      name: 'termsLinks',
      label: 'Terms links',
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
      name: 'contactTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'socialLinks',
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
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
    },
  ],
}
