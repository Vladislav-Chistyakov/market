import {useProductsStore} from '~/store/products'

export const useUserStore = defineStore('userStore', () => {
  const user: Ref<null | unknown> = ref(null)

  const productStore = useProductsStore()

  const userData = computed({
    get() {
      return user.value
    },
    set(value) {
      user.value = value
    },
  })

  watch(userData, (newValue) => {
    if (newValue) {
      productStore.getProducts().then((products) => {
        console.log('test', products)
      })
    }
  })

  return {
    user,
    userData,
  }
})
