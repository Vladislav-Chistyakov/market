import { useUserStore } from '@/store/user'

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) {
    console.log('Заход в миддвеваре server')
    return
  }
  // skip middleware on client side entirely
  if (import.meta.client) {
    console.log('Заход в миддвеваре client')
    try {
      if (!useUserStore().user && !useUserStore().pendingGettingUser) {
        abortNavigation()
        console.log('abort navigation')
      }
    } catch (error) {
      console.error(error)
      navigateTo('/authorization/sign-in')
      console.log('navigation catch middleware')
    }
  }
})
