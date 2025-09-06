<script setup lang="ts">
import { useProductsStore } from '~/store/products'
import ListClothes from '~/components/pages/products/ListClothes.vue'
import ProductsMenuAside from '~/components/pages/products/MenuAside.vue'

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
  <div class="container xl:max-w-[1440px] font-causten">
    <div class="grid grid-cols-[295px_1fr] gap-[50px]">
      <ProductsMenuAside>
        <template #filter>
          <FilterFeaturesMenu :list="productsList" />
          <FilterCategoriesMenu />
        </template>
      </ProductsMenuAside>

      <ListClothes :list="productsList" title="Products" class="mt-[33px]" />
    </div>
  </div>
</template>

<style scoped></style>
