import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import { useUserStore } from '~/store/user'

export default defineNuxtPlugin({
  name: 'getting-user',
  async setup(nuxtApp) {
    const userStore = useUserStore()

    userStore.pendingGettingUser = true

    await useFirebaseFunctions()
      .onAuthUser()
      .finally(() => (userStore.pendingGettingUser = false))
  },
})
