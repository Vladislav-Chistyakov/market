<script setup lang="ts">
import { useProductsStore } from '~/store/products'

const productsStore = useProductsStore()
const route = useRoute()

const productsList = computed(() => {
  if (route.params.gender === 'male') {
    return productsStore.menCategoryProducts || []
  } else if (route.params.gender === 'female') {
    return productsStore.womenCategoryProducts || []
  } else {
    return productsStore.products || []
  }
})
</script>

<template>
  <div>
    {{ productsList }}
    <PagesMainProducts
      v-if="productsList.length"
      title="Products"
      :list="productsList"
      class="mb-[94px]"
    />
  </div>
</template>

<style scoped></style>
