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
    <div
      class="tracking-[1px] container uppercase xl:max-w-[1440px] grid grid-cols-[1fr_195px_177px_224px_178px_135px] bg-black text-white font-semibold pt-[25px] pb-[27px]"
    >
      <p class="text-start">Product Details</p>
      <p class="text-center">Price</p>
      <p class="text-center">Quantity</p>
      <p class="text-center">Shipping</p>
      <p class="text-center">Subtotal</p>
      <p class="text-right">Action</p>
    </div>

    <ul class="pt-[70px] pb-[100px]">
      <li
        v-if="pending"
        class="p-[20px] text-center text-[22px] leading-[26px]"
      >
        Loading...
      </li>

      <template v-else-if="arrayCartProduct && arrayCartProduct.length">
        <ItemProduct
          v-for="(item, index) in arrayCartProduct"
          :key="index"
          :item="item"
          :length-array-number="arrayCartProduct.length"
          :number-item="index"
        />
      </template>

      <li
        v-else
        class="container xl:max-w-[1440px] bg-white text-black items-center"
      >
        <p class="p-[20px] text-center text-[22px] leading-[26px]">No data</p>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
