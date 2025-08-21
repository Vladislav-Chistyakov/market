import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import { useUserStore } from '~/store/user'

export default defineNuxtPlugin({
  name: 'getting-user',
  async setup(nuxtApp) {
    console.log('Начало загрузки плагина получение юзера')
    const userStore = useUserStore()

    userStore.pendingGettingUser = true
    await useFirebaseFunctions()
      .onAuthUser()
      .then((resolve) => {
        console.log('resolve user: ', resolve)
      })
      .catch((err) => {
        console.error('reject user: ', err)
      })
      .finally(() => {
        userStore.pendingGettingUser = false
        console.log('finally getting user')
      })
  },
})
