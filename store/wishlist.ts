import type { ComputedRef, Reactive } from 'vue'
import { useUserStore } from '~/store/user'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

export const useWishlistStore = defineStore('wishlistStore', () => {
  const { getWishlist } = useFirebaseFunctions()

  const getProductId = useFirebaseFunctions().getProductId
  const userStore = useUserStore()

  const wishlistAlreadyReceived = ref(false)
  const pendingWishlist = ref(false)
  const updateWishlistProductIdStatus = ref('')

  type WishlistItem = {
    color: string[]
    price: number
    countProductCart: number
    size: string
    images: string[]
    name: string
    id: string
    key: string
    productPageLink: string
    gender: string
    category: string
  }

  type WishlistUser = WishlistItem[]

  const wishlistUser: WishlistUser = reactive([])

  const productsIds: Reactive<unknown> = reactive([])

  const countProductsWishlist = computed(() => productsIds.length)

  type EditedWishlistItem = {
    id: string
    name: string
    price: number
    imageScr: string
    color: string
    gender: string
    category: string
    productPageLink: string
  }

  // Преобразование продуктов для отрисовки списка
  const editedWishlistForPage: ComputedRef<EditedWishlistItem[]> = computed(
    () => {
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
            productPageLink: `/products/${item?.gender}/${item.category.toLowerCase()}/${item?.id}`,
          }
        })
      }
      return []
    },
  )

  // Получение id продуктов юзера
  async function getWishlistIdsUser() {
    pendingWishlist.value = true
    try {
      // Если есть user
      if (userStore.userData && userStore.userData.uid) {
        // Получаем список избранных продуктов юзера
        const data = await getWishlist(userStore.userData.uid)

        // Если у нас есть список айдишников продуктов (старый)
        if (Array.isArray(productsIds)) {
          // Если мы получили data в виде массива,
          // то записываем в productsIds новый массив
          // иначе оставляем как есть
          Array.isArray(data) ?
            productsIds.splice(0, productsIds.length, ...data)
          : productsIds.splice(0, productsIds.length)
        }

        if (!wishlistAlreadyReceived.value) {
          wishlistAlreadyReceived.value = true
        }

        // Тут мы получаем данные продуктов из списка айдишников
        await getProductsFromWishlistIds()
      }
    } catch (error) {
      console.log('Error getWishlistUser', error)
    } finally {
      pendingWishlist.value = false
    }
  }

  // Получение данных продуктов из списка айдишников желаний юзера
  async function getProductsFromWishlistIds() {
    pendingWishlist.value = true
    try {
      // Если у нас есть id продуктов
      if (Array.isArray(productsIds) && productsIds.length) {
        // То мы создадим массим промисов для получения списка с информацией о продуктах
        const productRequests = productsIds.map((id) => getProductId(id))

        // после получим каждый продукт
        await Promise.all(productRequests).then((res) => {
          // Если список готов
          if (Array.isArray(res)) {
            // Перезаписываем наш массив с продуктами
            wishlistUser.splice(
              0,
              wishlistUser.length,
              ...(res as WishlistUser),
            )
          }
        })
      } else {
        // Если айдишников нет в базе, то зануляем наш массив
        wishlistUser.splice(0, wishlistUser.length)
      }
    } catch (error) {
      console.log('Error getProductsFromWishlistIds', error)
    } finally {
      pendingWishlist.value = false
    }
  }

  // Смена статуса продукта в вишлисте с получением нового списка продуктов
  const changeProductToWishlist = async function (productId: string) {
    pendingWishlist.value = true
    updateWishlistProductIdStatus.value = productId

    // Тут происходит смена статуса продукта в вишлисте
    await useFirebaseFunctions()
      .changeStatusProductInWishlist(productId)
      .then(async () => await getWishlistIdsUser())
      .catch((error) => {
        console.error('Error addProductToCart: ', error)
      })
      .finally(() => {
        updateWishlistProductIdStatus.value = ''
        pendingWishlist.value = false
      })
  }

  return {
    productsIds,
    updateWishlistProductIdStatus,
    wishlistAlreadyReceived,
    pendingWishlist,
    countProductsWishlist,
    wishlistUser,
    editedWishlistForPage,
    getWishlistIdsUser,
    changeProductToWishlist,
  }
})
