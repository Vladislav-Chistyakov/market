<script setup lang="ts">
import ItemProduct from '~/components/pages/cart/ItemProduct.vue'

type Props = {
  pending: boolean
  arrayCartProduct: Array<any>
}

withDefaults(defineProps<Props>(), {
  pending: false,
  arrayCartProduct: () => [],
})
// TODO Список продуктов в корзине иногда приходит не по порядку
// Надо разрешить вопрос с порядком вывода товара в корзине
// Можно сделать в виде исключений из массива [id1, id2, id3]
</script>

<template>
  <table
    class="container xl:max-w-[1440px] w-full border-collapse min-w-[1024px]"
  >
    <!-- Шапка -->
    <thead class="bg-black text-white font-semibold">
      <tr class="tracking-[1px] uppercase container">
        <th
          class="text-start py-[25px] pr-0 border-0 pl-[12px] sm:pl-[16px] md:pl-[20px] lg:pl-[48px] xl:pl-[102px]"
        >
          Product Details
        </th>
        <th class="text-center px-0 border-0">Price</th>
        <th class="text-center px-0 border-0">Quantity</th>
        <th class="text-center px-0 border-0">Shipping</th>
        <th class="text-center px-0 border-0">Subtotal</th>
        <th
          class="text-right pl-0 border-0 pr-[12px] sm:pr-[16px] md:pr-[20px] lg:pr-[48px] xl:pr-[102px]"
        >
          Action
        </th>
      </tr>
    </thead>
    <tbody class="bg-whitetext-color-black">
      <!-- Loading -->
      <tr v-if="pending">
        <td colspan="6" class="p-[20px] text-center text-[22px] leading-[26px]">
          Loading...
        </td>
      </tr>

      <template v-else-if="arrayCartProduct && arrayCartProduct.length">
        <template v-for="(item, index) in arrayCartProduct" :key="index">
          <tr v-show="index === 0">
            <td
              colspan="6"
              class="pt-[30px] px-3 sm:px-4 md:px-5 lg:px-12 xl:px-[102px]"
            ></td>
          </tr>

          <ItemProduct
            :item="item"
            :length-array-number="arrayCartProduct.length"
            :number-item="index"
          />

          <tr>
            <td
              colspan="6"
              class="px-3 sm:px-4 md:px-5 lg:px-12 xl:px-[102px]"
              :class="{ 'pb-[50px]': arrayCartProduct.length - 1 === index }"
            >
              <hr
                v-if="arrayCartProduct.length - 1 !== index"
                class="border-b border-gray-500"
              />
            </td>
          </tr>
        </template>
      </template>

      <!-- Нет товаров -->
      <tr v-else>
        <td colspan="6" class="p-[20px] text-center text-[22px] leading-[26px]">
          No data
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
