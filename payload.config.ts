// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import dotenv from 'dotenv'

// collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Reserves } from './collections/Reserves'
import { Masters } from './collections/Masters'
import { Experiences } from './collections/Experiences'
import { Home } from './collections/Home'
import { Header } from './collections/Header'
import { Footer } from './collections/Footer'
import { Us } from './collections/Us'
import { Sections } from './collections/Sections'
import { TypeformSubmissions } from './collections/TypeformSubmissions'
import { Gifts } from './collections/Gifts'
import { GiftOrders } from './collections/GiftOrders'

dotenv.config()

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// 🔥 USA SOLO ESTO (nada dinámico)
const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL as string

export default buildConfig({
  sharp,
  editor: lexicalEditor(),

  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Spanish' },
      { code: 'de', label: 'German' },
      { code: 'fr', label: 'French' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  collections: [
    Users,
    Media,
    Reserves,
    Masters,
    Gifts,
    GiftOrders,
    Experiences,
    Home,
    Header,
    Footer,
    Us,
    Sections,
    TypeformSubmissions,
  ],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    suppressHydrationWarning: true,

    // ✅ CONFIG CLAVE (esto arregla el login)
    cookies: {
      secure: true,
      sameSite: 'lax',
      path: '/',
    },
  },

  secret: process.env.PAYLOAD_SECRET,

  serverURL,

  // evita conflictos de cookies
  cookiePrefix: 'chaka',

  cors: [serverURL],
  csrf: [serverURL],

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