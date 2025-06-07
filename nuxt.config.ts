export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  tailwindcss: {
    cssPath: ['./assets/css/main.css', { injectPosition: 'first' }],
    config: './tailwind.config.js',
  },
  nitro: {
    preset: 'static',
  },
  vite: {
    build: {
      sourcemap: true,
    },
  },
})
