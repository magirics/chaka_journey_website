import type { CollectionConfig } from 'payload'

export const TypeformSubmissions: CollectionConfig = {
  slug: 'typeform-submissions',
  admin: {
    useAsTitle: 'responseId',
    group: 'Integrations',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'responseId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'formId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'landedAt',
      type: 'date',
    },
    {
      name: 'token',
      type: 'text',
      index: true,
    },
    {
      name: 'hidden',
      type: 'json',
    },
    {
      name: 'calculated',
      type: 'json',
    },
    {
      name: 'answers',
      type: 'json',
    },
    {
      name: 'rawPayload',
      type: 'json',
      required: true,
    },
  ],
}
