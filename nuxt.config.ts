import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui', 
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],
  i18n: {
    vueI18n: './locales/config.ts'
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL || 'http://localhost:3000'
    }
  }
})