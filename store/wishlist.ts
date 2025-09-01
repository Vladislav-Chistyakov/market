import type { ComputedRef, Reactive } from 'vue'
import { useUserStore } from '~/store/user'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

export const useWishlistStore = defineStore('wishlistStore', () => {
  const { getWishlist } = useFirebaseFunctions()

  const getProductId = useFirebaseFunctions().getProductId
  const userStore = useUserStore()

  const pendingWishlist = ref(false)

  type WishlistItem = {
    color: string[]
    price: number
    countProductCart: number
    size: string
    images: string[]
    name: string
    id: string
    key: string
  }

  type WishlistUser = WishlistItem[]

  const wishlistUser: WishlistUser = reactive([])

  const productsIds: Reactive<unknown> = reactive([])

  type EditedWishlistItem = {
    id: string,
    name: string,
    price: number,
    imageScr: string,
    color: string,
    gender: string,
    category: string,
  }

  const editedWishlistForPage: ComputedRef<EditedWishlistItem[]> = computed(() => {
    if (wishlistUser.length) {
      return wishlistUser.map((item) => {
        return {
          id: item.id || '',
          name: item.name || '',
          price: item.price || 0,
          imageScr: item.images[0] || '',
          color: item.color[0] || '',
          gender: item.gender,
          category: item.category,
        }
      })
    }
    return []
  })

  // Получение id продуктов юзера
  async function getWishlistIdsUser() {
    pendingWishlist.value = true
    try {
      if (userStore.userData && userStore.userData.uid) {
        const data = await getWishlist(userStore.userData.uid)
        if (Array.isArray(productsIds)) {
          Array.isArray(data) && data.length ?
            productsIds.splice(0, productsIds.length, ...data)
          : productsIds.splice(0, productsIds.length)
        }
      }
      return productsIds
    } catch (error) {
      console.log('Error getWishlistUser', error)
      return undefined
    } finally {
      await getProductsFromWishlistIds()
      pendingWishlist.value = false
    }
  }

  // Получение данных продуктов из списка айдишников желаний юзера
  async function getProductsFromWishlistIds() {
    pendingWishlist.value = true
    try {
      if (Array.isArray(productsIds) && productsIds.length) {
        const productRequests = productsIds.map((id) => getProductId(id))
        await Promise.all(productRequests).then((res) => {
          if (Array.isArray(res)) {
            wishlistUser.splice(0, productsIds.length, ...(res as WishlistUser))
          }
        })
      }
    } catch (error) {
      console.log('Error getProductsFromWishlistIds', error)
    } finally {
      pendingWishlist.value = false
    }
  }

  const changeProductToWishlist = async function (productId: string) {
    pendingWishlist.value = true
    await useFirebaseFunctions()
      .changeStatusProductInWishlist(productId)
      .then(async () => await getWishlistIdsUser())
      .catch((error) => {
        console.error('Error addProductToCart: ', error)
      })
      .finally(() => {
        pendingWishlist.value = false
      })
  }

  return {
    pendingWishlist,
    wishlistUser,
    editedWishlistForPage,
    getWishlistIdsUser,
    changeProductToWishlist,
  }
})
