<script setup lang="ts">
import { useProductsStore } from '~/store/products'
import ListClothes from '~/components/pages/products/ListClothes.vue'

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
      <aside class="border-x border-gray-border max-h-fit">
        <div
          class="flex items-center justify-between gap-[14px] p-[20px_30px_30px_30px] border-b border-gray-border font-semibold"
        >
          <h2 class="text-[22px] leading-[26px] text-text-gray-200">Filter</h2>

          <img
            src="@/assets/images/pages/product/filter.svg"
            alt="filter icon"
          />
        </div>

        <client-only>
          <FilterCategoriesMenu :products-list="productsList" />
        </client-only>

        <div class="border-b border-gray-border pb-[30px]">списко фильтров</div>
      </aside>

      <ListClothes :list="productsList" title="Products" class="mt-[33px]" />
    </div>
  </div>
</template>

<style scoped></style>
