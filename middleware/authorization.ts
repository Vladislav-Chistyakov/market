export default defineNuxtRouteMiddleware((to) => {
  if (to.path.includes('authorization')) {
    setPageLayout('authorization')
  }
})
