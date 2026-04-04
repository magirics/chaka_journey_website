import type { CollectionConfig, CollectionSlug } from 'payload';

export const GiftOrders: CollectionConfig = {
  slug: 'gift-orders',
  admin: {
    useAsTitle: 'stripeSessionId',
  },
  fields: [
    {
      name: 'gift',
      type: 'relationship',
      relationTo: 'gifts' as CollectionSlug,
      required: true,
    },
    {
      name: 'master',
      type: 'relationship',
      relationTo: 'masters' as CollectionSlug,
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'recipientName',
      type: 'text',
      required: true,
    },
    {
      name: 'deliveryAddress',
      type: 'textarea',
    },
    {
      name: 'giftNote',
      type: 'textarea',
    },
    {
      name: 'giftType',
      type: 'select',
      required: true,
      defaultValue: 'physical',
      options: ['physical', 'digital'],
    },
    {
      name: 'stripeSessionId',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text',
    },
    {
      name: 'subtotalAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'deliveryFee',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'usd',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'paid',
      options: ['paid', 'cancelled'],
    },
  ],
};
