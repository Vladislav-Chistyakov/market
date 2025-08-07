import { useProductsStore } from '~/store/products'
import type { Ref } from 'vue'
import { useUserStore } from '~/store/user'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

export const useCartStore = defineStore('cartStore', () => {

  const { getCart } = useFirebaseFunctions()

  const getProductId = useFirebaseFunctions().getProductId
  const userStore = useUserStore()
  const pendingCart = ref(false)

  type CartItem = {
    color: string
    price: number
    countProductCart: number
    size: string
    productId: string
    key: string
  }

  type CartUser = {
    [productId: string]: CartItem
  }

  const products: Ref<unknown> = ref([])
  let cartUser: CartUser = reactive({})

  async function getCartUser() {
    pendingCart.value = true
    try {
      if (userStore.userData && userStore.userData.uid) {
        const data = await getCart(userStore.userData.uid)

        // Удаляем старые ключи
        for (const key in cartUser) {
          delete cartUser[key]
        }

        // Добавляем новые
        for (const key in data) {
          cartUser[key] = data[key]
          cartUser[key].key = key
        }

        const productIds = Object.values(cartUser).map((item) => item.productId)

        const productRequests = productIds.map((id) => getProductId(id))

        products.value = await Promise.all(productRequests)
        console.log('products', products.value)
      }
    } catch (error) {
      console.log('Error getCartUser', error)
    } finally {
      pendingCart.value = false
    }
  }

  const arrayCartProduct = computed(() => {
    const arrCart = Object.values(cartUser)
    if (Array.isArray(products.value)) {
      const arr = products.value.map((item: any, index: number) => {
        return {
          name: item.name || '',
          color: arrCart[index]?.color || '',
          size: arrCart[index]?.size || '',
          price: arrCart[index]?.price || null,
          imgSrc: item.images[0] || '',
          count: arrCart[index]?.countProductCart || null,
          subtotal: item.subtotal,
          id: `${item.id}-${arrCart[index]?.color}-${arrCart[index]?.size}` || '',
        }
      })
      return arr
    }
    return []
  })

  const removeCartProduct = async function(productId: string) {
    pendingCart.value = true
    await useFirebaseFunctions().removeProductFromCart(productId)
      .then(async (result) => {
        await getCartUser()
      })
      .finally(() => {
        pendingCart.value = false
      })
  }

  return {
    getCartUser,
    removeCartProduct,
    arrayCartProduct,
    pendingCart,
  }
})
