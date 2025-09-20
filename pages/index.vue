<script setup>
import { useProductsStore } from '~/store/products'

const productsStore = useProductsStore()

const menCategoriesList = computed(() => {
  return productsStore.listCategoriesProductsMen.length ?
      productsStore.listCategoriesProductsMen.slice(0, 8)
    : []
})

const womenCategoriesList = computed(() => {
  return productsStore.listCategoriesProductsWoman.length ?
      productsStore.listCategoriesProductsWoman.slice(0, 4)
    : []
})
</script>

<template>
  <div>
    <PagesMainHero />

    <PagesMainPromotions class="mb-[72px]" />

    <PagesMainCompanyGoal class="mb-[80px]" />

    <PagesMainCategories
      v-if="menCategoriesList.length"
      title="Categories For Men"
      :list="menCategoriesList"
      class="mb-[94px]"
    />

    <PagesMainCategories
      v-if="womenCategoriesList.length"
      title="Categories For Woman"
      :list="womenCategoriesList"
      class="mb-[94px]"
    />

    <PagesMainBrands class="mb-[134px]" />

    <!--    <PagesMainReviews class="mb-[68px]" />-->
  </div>
</template>
