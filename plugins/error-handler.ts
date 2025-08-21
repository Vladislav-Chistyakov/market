export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:error', (err) => {
    console.error('Fatal application error:', err)
  })
})