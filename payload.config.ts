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
import { Subscribers } from './collections/Subscribers'

dotenv.config()

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


const normalizeUrl = (value?: string) => {
  if (!value) return undefined
  return value.replace(/\/+$/, '')
}

const appUrl = normalizeUrl(process.env.NEXT_PUBLIC_APP_URL)
const payloadPublicUrl = normalizeUrl(process.env.PAYLOAD_PUBLIC_SERVER_URL)
const isProduction = process.env.NODE_ENV === 'production'

const codespaceName = process.env.CODESPACE_NAME
const codespacesDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
const codespacesBaseOrigin =
  codespaceName && codespacesDomain
    ? `https://${codespaceName}-3000.${codespacesDomain}`
    : undefined

const devServerURL =
  normalizeUrl(process.env.PAYLOAD_DEV_SERVER_URL) ||
  `http://localhost:${process.env.PORT || '3000'}`

const serverURL = isProduction
  ? appUrl || payloadPublicUrl || codespacesBaseOrigin || 'http://localhost:3000'
  : devServerURL
const serverHost = (() => {
  try {
    return new URL(serverURL).hostname
  } catch {
    return ''
  }
})()

const devOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://localhost:3000',
  'https://localhost:3001',
  'https://127.0.0.1:3000',
  'https://127.0.0.1:3001',
]

const codespacesOrigins = [
  codespacesBaseOrigin,
  codespacesBaseOrigin?.replace('-3000.', '-3001.'),
  appUrl?.includes('.app.github.dev') ? appUrl : undefined,
  payloadPublicUrl?.includes('.app.github.dev') ? payloadPublicUrl : undefined,
]

const allowedOrigins = Array.from(
  new Set([...devOrigins, ...codespacesOrigins, appUrl, payloadPublicUrl].filter(Boolean) as string[]),
)

const isCodespacesHost = serverHost.endsWith('.app.github.dev')

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
    Subscribers,
  ],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    suppressHydrationWarning: true,
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
