import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  components: true,
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui'
  ],

  //@ts-ignore
  ui: {
    global: true,
    icons: ['mdi', 'heroicons']
  },

  compatibilityDate: '2025-01-20',
})