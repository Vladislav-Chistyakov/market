import { useUserStore } from '@/store/user'
import { useFirebaseFunctions } from '@/composables/useFirebaseFunctions'

export default defineNuxtRouteMiddleware((to) => {
  try {
    if (!useUserStore().user) {
      const onAuthState = useFirebaseFunctions().onAuthUser
      // const { auth } = useFirebaseFunctions()
      onAuthState(() => {
        if (!to.path.includes('authorization')) {
          abortNavigation()
          navigateTo('/authorization/sign-in')
        }
      })
    }
  } catch (error) {
    console.error(error)
    navigateTo('/authorization/sign-in')
  }
})
