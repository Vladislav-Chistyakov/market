import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import { useUserStore } from '~/store/user'
import { useCartStore } from '~/store/cart'

export default defineNuxtPlugin({
  name: 'getting-user',
  async setup(nuxtApp) {
    console.log('Начало загрузки плагина получение юзера')
    const userStore = useUserStore()

    userStore.pendingGettingUser = true
    await useFirebaseFunctions()
      .onAuthUser()
      .then(async (resolve) => {
        console.log('resolve user: ', resolve)
        const cartStore = useCartStore()
        await cartStore.getCartUser()
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
