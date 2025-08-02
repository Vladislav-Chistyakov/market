import type { Ref } from 'vue'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import type { RouteParamValue } from '#vue-router'

export const useProductsStore = defineStore('productsStore', () => {
  const route = useRoute()
  const products: Ref<any[]> = ref([])
  const productsPending = ref(false)
  const { getAllProducts } = useFirebaseFunctions()

  const productsAll = computed(() => products.value)

  const getProducts = async () => {
    try {
      productsPending.value = true
      const data = await getAllProducts()
      products.value = data
      return products.value
    } catch (err) {
      console.error('Ошибка получения списка продуктов:', err)
    } finally {
      productsPending.value = false
    }
  }

  const getProduct = (id: string | RouteParamValue[]) => {
    return products.value.find((item) => item.id === id)
  }

  // TODO тут прям все зависит от гендера, функции повторяются, исправить!
  const womenProducts = computed(() => {
    if (products.value.length) {
      return products.value.filter((item) => {
        return item?.gender === 'female'
      })
    }
    return []
  })

  const menProducts = computed(() => {
    if (products.value.length) {
      return products.value.filter((item) => {
        return item?.gender === 'male'
      })
    }
    return []
  })

  const womenCategoryProducts = computed(() => {
    if (products.value.length) {
      return products.value.filter((item) => {
        return (
          route.params.category === item?.category.toLowerCase()
          && item?.gender === 'female'
        )
      })
    }
    return []
  })

  const menCategoryProducts = computed(() => {
    if (products.value.length) {
      return products.value.filter((item) => {
        return (
          route.params.category === item?.category.toLowerCase()
          && item?.gender === 'male'
        )
      })
    }
    return []
  })

  const listCategoriesProductsMen = computed(() => {
    if (menProducts.value.length) {
      const listProductsDifferentCategories: any = []
      menProducts.value.forEach((item: any) => {
        const isCategoryInList = listProductsDifferentCategories.find(
          (element: any) => {
            return element.category === item.category
          },
        )
        if (!isCategoryInList) {
          listProductsDifferentCategories.push(item)
        }
      })

      return listProductsDifferentCategories
    }
    return []
  })

  const listCategoriesProductsWoman = computed(() => {
    if (womenProducts.value.length) {
      const listProductsDifferentCategories: any = []
      womenProducts.value.forEach((item: any) => {
        const isCategoryInList = listProductsDifferentCategories.find(
          (element: any) => {
            return element.category === item.category
          },
        )
        if (!isCategoryInList) {
          listProductsDifferentCategories.push(item)
        }
      })

      return listProductsDifferentCategories
    }
    return []
  })

  return {
    products,
    getProduct,
    getProducts,
    productsAll,
    productsPending,
    womenProducts,
    menProducts,
    womenCategoryProducts,
    menCategoryProducts,
    listCategoriesProductsMen,
    listCategoriesProductsWoman,
  }
})
