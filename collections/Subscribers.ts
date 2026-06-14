import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    group: 'Marketing',
    defaultColumns: ['email', 'name', 'locale', 'active', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'es',
      options: ['de', 'en', 'es', 'fr'],
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },
  ],
}
