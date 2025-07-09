import type { Ref } from 'vue'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import type { RouteParamValue } from '#vue-router'

export const useProductsStore = defineStore('productsStore', () => {
  const products: Ref<any[]> = ref([])
  const productsPending = ref(false)
  const { getAllProducts } = useFirebaseFunctions()

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

  return {
    products,
    getProduct,
    getProducts,
    womenProducts,
    menProducts,
  }
})
