// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
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

export default buildConfig({
  sharp,
  editor: lexicalEditor(),
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
    defaultLocale: 'en',
    fallback: true,
  },

  collections: [Users, Media, Reserves, Masters, Experiences, Home],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  /*  
    cookies: {
    sameSite: 'none',
    secure: false,
    domain: ".app.github.dev",
    
  },*/
  },

  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  cookiePrefix: 'payload',
  cors: [
    'https://localhost:3000', // codespace
    process.env.NEXT_PUBLIC_APP_URL!
  ],
  csrf: [
    'https://localhost:3000',  // codespace
    process.env.NEXT_PUBLIC_APP_URL!
  ],

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
