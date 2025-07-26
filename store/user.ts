import { useProductsStore } from '~/store/products'
import type { Ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user: Ref<null | object> = ref(null)
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
      await getProducts().finally(() =>
        console.log('Получили список продуктов'),
      )
    }
  })

  return {
    user,
    userData,
    isAuthorization,
  }
})
