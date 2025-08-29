import { useProductsStore } from '~/store/products'
import type { Ref } from 'vue'
import { useWishlistStore } from '~/store/wishlist'

export const useUserStore = defineStore('userStore', () => {
  const wishlistStore = useWishlistStore()
  const user: Ref<null | object> = ref(null)
  const pendingGettingUser = ref(false)
  const isAuthorization = computed(() => !!user.value)

  const { getProducts } = useProductsStore()

  const userData = computed({
    get() {
      return user.value
    },
    set(value) {
      user.value = value
    },
  })

  watch(userData, async (newValue) => {
    if (newValue) {
      await wishlistStore.getWishlistUser().then((res) => {
        console.log('getWishlistUser ___ ', res)
      })
      await getProducts().finally(() =>
        console.log('Получили список продуктов'),
      )
    }
  })

  return {
    user,
    userData,
    isAuthorization,
    pendingGettingUser,
  }
})
