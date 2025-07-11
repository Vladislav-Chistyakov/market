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

        <FilterCategoriesMenu :products-list="productsList" />

        <!--        <ul class="border-b border-gray-border py-[31px]">-->
        <!--          <li>-->
        <!--            <nuxt-link-->
        <!--              class="w-full flex items-center justify-between py-[9px] px-[30px]"-->
        <!--              :class="{ 'bg-black': true }"-->
        <!--            >-->
        <!--              <p class="text-gray-400 text-[16px] leading-[18px]">Tops</p>-->

        <!--              <svg-->
        <!--                width="7"-->
        <!--                height="13"-->
        <!--                viewBox="0 0 7 13"-->
        <!--                fill="none"-->
        <!--                xmlns="http://www.w3.org/2000/svg"-->
        <!--              >-->
        <!--                <path-->
        <!--                  d="M1 11.7415L5.73782 7.00373C6.08739 6.65416 6.08739 6.08739 5.73782 5.73782L1 1"-->
        <!--                  stroke="#8A8989"-->
        <!--                  stroke-width="1.8"-->
        <!--                  stroke-linecap="round"-->
        <!--                />-->
        <!--              </svg>-->
        <!--            </nuxt-link>-->
        <!--          </li>-->
        <!--        </ul>-->

        <div class="border-b border-gray-border pb-[30px]">списко фильтров</div>
      </aside>

      <PagesMainProducts
        v-if="productsList.length"
        title="Products"
        :list="productsList"
        class="mt-[33px]"
      />
    </div>
  </div>
</template>

<style scoped></style>
