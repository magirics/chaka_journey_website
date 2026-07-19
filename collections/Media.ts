import type { CollectionConfig } from 'payload'

const mediaStaticDir = process.env.PAYLOAD_UPLOAD_DIR || 'media'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  create: () => true,
  update: () => true,
  delete: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: mediaStaticDir,
    mimeTypes: ['image/*'],
  },
}
