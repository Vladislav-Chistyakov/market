<script setup lang="ts">
import { useProductsStore } from '~/store/products'

const productsStore = useProductsStore()
const route = useRoute()

const productsList = computed(() => {
  if (route.params.gender === 'male') {
    return productsStore.menProducts || []
  } else if (route.params.gender === 'female') {
    return productsStore.womenProducts || []
  } else {
    return productsStore.products || []
  }
})

const listCategoriesMenuFilter = computed(() => {
  if (productsList.value.length) {
    const listProductsDifferentCategories: any = []

    productsList.value.forEach((item: any) => {
      const isCategoryInList = listProductsDifferentCategories.find(
        (element: any) => {
          return element === item?.category
        },
      )

      if (!isCategoryInList) {
        listProductsDifferentCategories.push(item.category)
      }
    })

    return listProductsDifferentCategories
  }
  return []
})
</script>

<template>
  <ul class="border-b border-gray-border py-[31px]">
    <li
      v-for="(category, indexCategory) in listCategoriesMenuFilter"
      :key="indexCategory"
    >
      <nuxt-link
        class="w-full flex items-center justify-between py-[9px] px-[30px]"
        :class="{
          'bg-black': route.params.category === category.toLowerCase(),
        }"
        :to="'/products/' + route.params.gender + '/' + category.toLowerCase()"
      >
        <p class="text-gray-400 text-[16px] leading-[18px]">
          {{ category }}
        </p>

        <svg
          width="7"
          height="13"
          viewBox="0 0 7 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 11.7415L5.73782 7.00373C6.08739 6.65416 6.08739 6.08739 5.73782 5.73782L1 1"
            stroke="#8A8989"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </nuxt-link>
    </li>
  </ul>
</template>

<style scoped></style>
