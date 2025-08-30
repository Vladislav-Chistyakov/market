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

  type ItemResultCart = {
    name: string
    color: string
    size: string
    price: number | null
    imgSrc: any
    count: number | null
    shipping: number | string | undefined
    id: string
    productId: string
  }

  type ArrayResultCart = ItemResultCart[]

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

        return products.value
      }
    } catch (error) {
      console.log('Error getCartUser', error)
      return undefined
    } finally {
      pendingCart.value = false
    }
  }

  const arrayCartProduct = computed(() => {
    const arrCart = Object.values(cartUser)
    if (Array.isArray(products.value)) {
      const arr: ArrayResultCart = products.value.map(
        (item: any, index: number) => {
          return {
            name: item.name || '',
            color: arrCart[index]?.color || '',
            size: arrCart[index]?.size || '',
            price: arrCart[index]?.price || null,
            imgSrc: item.images[0] || '',
            count: arrCart[index]?.countProductCart || null,
            shipping: item.shipping,
            id:
              `${item.id}-${arrCart[index]?.color}-${arrCart[index]?.size}`
              || '',
            productId: item.id,
          }
        },
      )
      return arr
    }
    return []
  })

  const removeCartProduct = async function (productId: string) {
    pendingCart.value = true
    await useFirebaseFunctions()
      .removeProductFromCart(productId)
      .then(async (result) => {
        await getCartUser()
      })
      .finally(() => {
        pendingCart.value = false
      })
  }

  const addProductToCart = async function (
    productId: string,
    color: string,
    size: string,
    price: number,
    needPending: boolean = false,
  ) {
    if (needPending) {
      pendingCart.value = true
    }
    await useFirebaseFunctions()
      .convertItemInCart(productId, color, size, price, 'add')
      .then(async () => getCartUser())
      .catch((error) => {
        console.error('Error addProductToCart: ', error)
      })
      .finally(() => {
        if (needPending) {
          pendingCart.value = false
        }
      })
  }

  const removeOneItemFromCart = async function (
    productId: string,
    color: string,
    size: string,
    price: number,
    needPending: boolean = false,
  ) {
    if (needPending) {
      pendingCart.value = true
    }
    await useFirebaseFunctions()
      .convertItemInCart(productId, color, size, price, 'remove')
      .then(async () => getCartUser())
      .catch((error) => {
        console.error('Error removeOneItemFromCart: ', error)
      })
      .finally(() => {
        if (needPending) {
          pendingCart.value = false
        }
      })
  }

  return {
    addProductToCart,
    getCartUser,
    removeCartProduct,
    removeOneItemFromCart,
    arrayCartProduct,
    pendingCart,
  }
})
