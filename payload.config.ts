// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, type Config } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import dotenv from 'dotenv'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Reserves } from './collections/Reserves'
import { Masters } from './collections/Masters'
import { Experiences } from './collections/Experiences'
import { Home } from './collections/Home'

dotenv.config()
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// 🔹 Extensión del tipo para soportar `express`
interface ExtendedConfig extends Config {
  express?: {
    trustProxy?: boolean
  }
}

export default buildConfig({
  localization: {
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'es',
        label: 'Spanish',
      },
      {
        code: 'de',
        label: 'German',
      },
      {
        code: 'fr',
        label: 'French',
      },
    ],
    defaultLocale: 'en', // required
    fallback: true, // defaults to true
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Reserves, Masters, Experiences, Home],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',

  // 🔹 URL pública para Payload
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // 🔹 Confiar en proxies (Codespaces, Railway, etc.)
  express: {
    trustProxy: true,
  }, cookiePrefix: 'payload',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
} as ExtendedConfig)
