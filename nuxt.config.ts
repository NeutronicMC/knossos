import svgLoader from 'vite-svg-loader'

const STAGING_API_URL = 'https://staging-api.modrinth.com/v2/'
const STAGING_ARIADNE_URL = 'https://staging-ariadne.modrinth.com/v1/'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Modrinth',
      meta: [
        {
          name: 'description',
          content:
            'Download Minecraft mods, plugins, datapacks, shaders, resourcepacks, and modpacks on Modrinth. Discover and publish projects on Modrinth with a modern, easy to use interface and API.',
        },
        {
          name: 'publisher',
          content: 'Rinth, Inc.',
        },
        {
          name: 'og:title',
          content: 'Modrinth',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'Modrinth',
        },
        {
          name: 'theme-color',
          content: '#1bd96a',
        },
        {
          name: 'color-scheme',
          content: 'light dark',
        },
        {
          name: 'og:site_name',
          content: 'Modrinth',
        },
        {
          name: 'og:description',
          content: 'An open source modding platform',
        },
        {
          name: 'og:type',
          content: 'website',
        },
        {
          name: 'og:url',
          content: 'https://modrinth.com',
        },
        {
          name: 'og:image',
          content: 'https://cdn.modrinth.com/modrinth-new.png?',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:site',
          content: '@modrinth',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon-light.ico',
          media: '(prefers-color-scheme:no-preference)',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          media: '(prefers-color-scheme:dark)',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon-light.ico',
          media: '(prefers-color-scheme:light)',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn-raw.modrinth.com/fonts/inter/inter.css',
        },
        {
          rel: 'search',
          type: 'application/opensearchdescription+xml',
          href: '/opensearch.xml',
          title: 'Modrinth mods',
        },
      ],
    },
  },
  css: ['~/assets/styles/global.scss'],
  modules: ['@nuxtjs/color-mode', '@pinia/nuxt'],
  buildModules: ['floating-vue/nuxt'],
  vite: { plugins: [svgLoader({ svgo: false })] },
  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['relativeTime'],
  },
})

function getApiUrl() {
  return process.env.BROWSER_BASE_URL ?? STAGING_API_URL
}

function getDomain() {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.SITE_URL) {
      return process.env.SITE_URL
    } else if (process.env.HEROKU_APP_NAME) {
      return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    } else if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    } else if (getApiUrl() === STAGING_API_URL) {
      return 'https://staging.modrinth.com'
    } else {
      return 'https://modrinth.com'
    }
  } else {
    return 'http://localhost:3000'
  }
}

// Checklist
// Redo middleware using new structure
// Redo auth setup using native cookies API
// Switch from axios to native fetch
// Figure out app config (env variables and stuff)
// Switch to new nuxt head settings
// Generator + Analytics on nuxt hooks
// Readd toml parser which supports ESM
// Migrate to new tooltip api
// Update users store to not use axios
// Migrate (most) things to composition API
// Fix breaking changes (like emits have to be registered)