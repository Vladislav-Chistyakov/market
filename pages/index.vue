<script setup>
import { useProductsStore } from '~/store/products'

const productsStore = useProductsStore()

const menProductsList = computed(() => {
  return productsStore.menProducts.length ?
      productsStore.menProducts.slice(0, 4)
    : []
})

const womenProductsList = computed(() => {
  return productsStore.womenProducts.length ?
      productsStore.womenProducts.slice(0, 4)
    : []
})
</script>

<template>
  <div>
    <PagesMainHero />

    <PagesMainPromotions class="mb-[72px]" />

    <PagesMainCompanyGoal class="mb-[80px]" />

    <PagesMainProducts
      v-if="menProductsList.length"
      title="Categories For Men"
      :list="menProductsList"
      class="mb-[94px]"
    />

    <PagesMainProducts
      v-if="womenProductsList.length"
      title="Categories For Woman"
      :list="womenProductsList"
      class="mb-[94px]"
    />

    <PagesMainBrands class="mb-[134px]" />

    <PagesMainReviews class="mb-[68px]" />
  </div>
</template>
