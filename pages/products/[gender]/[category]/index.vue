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

const list = ref(productsList.value)

const isFilteredList = ref(false)

function changeFilters(newFilteredList: any[]) {
  isFilteredList.value = newFilteredList.length === 0
  list.value = newFilteredList
}

watch(productsList, (newValue, oldValue) => {
  if (!oldValue.length && newValue.length) {
    list.value = newValue
  }
})
</script>

<template>
  <div class="container xl:max-w-[1440px] font-causten">
    <div
      class="grid lg:grid-cols-[245px_1fr] xl:grid-cols-[295px_1fr] gap-8 xl:gap-[50px]"
    >
      <ProductsMenuAside>
        <template #filters>
          <FilterCategoriesMenu />
          <FilterFeaturesMenu
            :list="productsList"
            @change-filters="changeFilters"
          />
        </template>
      </ProductsMenuAside>

      <div>
        <ListClothes :list="list" title="Products" class="mt-[33px]" />
        <div
          v-if="isFilteredList"
          class="text-[20px] text-center pt-20 w-full text-black font-core-sans-c"
        >
          По этим фильтрам список пуст
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
