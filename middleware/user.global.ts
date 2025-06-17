import { useUserStore } from '@/store/user'

export default defineNuxtRouteMiddleware((to) => {
  try {
    const userStore = useUserStore()
    if (!userStore.userData) {
      const userLocalStore = localStorage.getItem('user')

      if (userLocalStore) {
        const infoUser = JSON.parse(userLocalStore)

        if (infoUser) {
          userStore.userData = infoUser
        }
      }

      if (!to.path.includes('authorization') && !userStore.userData) {
        abortNavigation()
        navigateTo('/authorization/sign-in')
      }
    }
  } catch (error) {
    console.error(error)
    navigateTo('/authorization/sign-in')
  }
})
