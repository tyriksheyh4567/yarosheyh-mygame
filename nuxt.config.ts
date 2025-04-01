
export default defineNuxtConfig({
  devtools: { enabled: true },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'game',
        path: '/game',
        component: resolve(__dirname, 'app/pages/game.vue')
      });
    }
  },

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
  
  // Enable prerendering for all pages
  nitro: {
    experimental: {
      openAPI: true
    },
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  }
})
