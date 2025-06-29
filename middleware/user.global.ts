import { useUserStore } from '@/store/user'

export default defineNuxtRouteMiddleware((to) => {
  try {
    if (!useUserStore().user) {
      abortNavigation()

      // navigateTo('/authorization/sign-in')
      // const onAuthState = useFirebaseFunctions().onAuthUser
      // const { auth } = useFirebaseFunctions()
      // onAuthState(() => {
      //   if (!to.path.includes('authorization')) {
      //   }
      // })
    }
  } catch (error) {
    console.error(error)
    navigateTo('/authorization/sign-in')
  }
})
