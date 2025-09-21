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
  <div>
    <table class="container xl:max-w-[1440px] w-full border-collapse">
      <!-- Шапка -->
      <thead class="bg-black text-white font-semibold">
        <tr class="tracking-[1px] uppercase">
          <th class="text-start py-[25px] px-0 border-0">Product Details</th>
          <th class="text-center px-0 border-0">Price</th>
          <th class="text-center px-0 border-0">Quantity</th>
          <th class="text-center px-0 border-0">Shipping</th>
          <th class="text-center px-0 border-0">Subtotal</th>
          <th class="text-right px-0 border-0">Action</th>
        </tr>
      </thead>
      <tbody class="bg-white text-black">
        <!-- Loading -->
        <tr v-if="pending">
          <td
            colspan="6"
            class="p-[20px] text-center text-[22px] leading-[26px]"
          >
            Loading...
          </td>
        </tr>

        <template v-else-if="arrayCartProduct && arrayCartProduct.length">
          <ItemProduct
            v-for="(item, index) in arrayCartProduct"
            :key="index"
            :item="item"
            :length-array-number="arrayCartProduct.length"
            :number-item="index"
          />
        </template>

        <!-- Нет товаров -->
        <tr v-else>
          <td
            colspan="6"
            class="p-[20px] text-center text-[22px] leading-[26px]"
          >
            No data
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
