import type { Ref } from 'vue'
import { useUserStore } from '~/store/user'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

export const useWishlistStore = defineStore('wishlistStore', () => {
  const { getWishlist } = useFirebaseFunctions()

  const getProductId = useFirebaseFunctions().getProductId
  const userStore = useUserStore()
  const pendingWishlist = ref(false)

  type WishlistItem = {
    color: string
    price: number
    countProductCart: number
    size: string
    productId: string
    key: string
  }
  //
  // type ItemResultCart = {
  //   name: string
  //   color: string
  //   size: string
  //   price: number | null
  //   imgSrc: any
  //   count: number | null
  //   shipping: number | string | undefined
  //   id: string
  //   productId: string
  // }
  //
  // type ArrayResultCart = ItemResultCart[]

  type WishlistUser = {
    [productId: string]: WishlistItem
  }

  let wishlistUser: WishlistUser = reactive({})

  const products: Ref<unknown> = ref([])

  const arrayIdsProductsWishlist = computed(() => products)

  async function getWishlistUser() {
    pendingWishlist.value = true
    try {
      if (userStore.userData && userStore.userData.uid) {
        const data = await getWishlist(userStore.userData.uid)
        if (Array.isArray(products)) {
          console.log('DATA GET WISHLIST', data)
          Array.isArray(data) && data.length ?
            products.splice(0, products.length, ...data)
          : products.splice(0, products.length)
        }
      }
    } catch (error) {
      console.log('Error getWishlistUser', error)
    } finally {
      pendingWishlist.value = false
    }
  }

  const changeProductToWishlist = async function (productId: string) {
    pendingWishlist.value = true
    await useFirebaseFunctions()
      .changeStatusProductInWishlist(productId)
      .then(async () => getWishlistUser())
      .catch((error) => {
        console.error('Error addProductToCart: ', error)
      })
      .finally(() => {
        pendingWishlist.value = false
      })
  }

  return {
    getWishlistUser,
    changeProductToWishlist,
    arrayIdsProductsWishlist,
  }
})
