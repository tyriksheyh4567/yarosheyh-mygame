// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxthub/core'
  ],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-03-30',
  
  // Add NuxtHub OpenAPI configuration
  nuxthub: {
    openapi: {
      path: '/api/openapi.json', // Path where OpenAPI schema will be available
      info: {
        title: 'Svoya Igra API',
        version: '1.0.0',
        description: 'API for Svoya Igra application'
      }
    }
  },
  
  // Enable prerendering for all pages
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
