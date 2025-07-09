import { useProductsStore } from '~/store/products'

export default defineEventHandler((event) => {
  // const { getProduct } = useProductsStore()
  const id = getRouterParam(event, 'id')
  // const product = ref(null)
  //
  // try {
  //   product.value = getProduct(id as string)
  // } catch (error) {
  //   console.error(error)
  // }

  return id
})
