import { useUserStore } from '@/store/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    console.log('Заход в миддвеваре server')
    return
  }
  // skip middleware on client side entirely
  if (import.meta.client) {
    console.log('Заход в миддвеваре client')
    try {
      const userStore = useUserStore()

      if (userStore.isAuthorization) return

      // страницы, куда можно без авторизации
      const publicRoutes = ['/', '/authorization', '/products']
      const isPublic =
        to.path === '/'
        || to.path.startsWith('/authorization')
        || to.path.startsWith('/products')

      if (!isPublic) {
        return navigateTo('/authorization/sign-in')
      }

      if (!isPublic) {
        return navigateTo('/authorization/sign-in')
      }
    } catch (error) {
      console.error(error)
      return navigateTo('/authorization/sign-in', { redirectCode: 301 })
    }
  }
})
