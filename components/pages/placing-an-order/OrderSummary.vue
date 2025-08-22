<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()

const arrayProductsOrder = computed(() => {
  return cartStore.arrayCartProduct
})

const totalCountProducts = computed(() => {
  return arrayProductsOrder.value.reduce(
    (accumulator, item) => {
      return item.count ? accumulator + item.count : accumulator + 0
    },
    0,
  )
})

const subtotalProducts = computed(() => {
  return arrayProductsOrder.value.reduce(
    (accumulator, item) => {
      return item.count && item.price ? accumulator + item.count * item.price : accumulator + 0
    },
    0,
  ).toFixed(2)
})

const saving = 30.00

const shippingAmount = computed(() => {
  return arrayProductsOrder.value.reduce(
    (accumulator, item) => {
      return item.shipping ? accumulator + item.shipping : accumulator + 0
    },
    0,
  ).toFixed(2)
})

const fullAmount = computed(() => {
  return (Number(subtotalProducts.value) - saving + Number(shippingAmount.value)).toFixed(2)
})


</script>

<template>
  <div class="h-fit text-black shadow-[2px_2px_4px_0_#0000000D] relative z-[2] after:absolute after:z-[-1] after:top-0 after:h-full after:w-full after:block after:content-[''] after:shadow-[-2px_-2px_4px_0_#0000000D]">

    <div class="px-[22px] py-[40px]">
      <template v-if="arrayProductsOrder.length">
        <b class="block text-[24px] leading-[24px] mb-[15px]">
          Order Summary
        </b>

        <hr class="border-[#EDEEF2]">

        <ul class="flex flex-col gap-[15px] pt-[15px] mb-[15px]">
          <li
            v-for="(item, index) in arrayProductsOrder"
            :key="index"
            class="flex gap-[15px] items-center border-b border-[#EDEEF2] pb-[15px]"
          >
            <img
              v-if="item.imgSrc"
              :src="item.imgSrc"
              :alt="item.name"
              class="block h-[63px] w-[63px] rounded-[4px] overflow-hidden"
            >

            <div class="">
              <p v-if="item.name" class="mb-[5px] font-bold text-[14px] leading-[17px]">
                {{ item.name }}
                <span v-if="item.count" class="text-[#807D7E]">
                    x {{ item.count }}
                  </span>
              </p>

              <p v-if="item.color" class="font-bold text-[14px] leading-[17px]">
                Colour:
                <span class="text-[#807D7E] font-light">{{ item.color }}</span>
              </p>
            </div>

            <p v-if="item.price" class="ml-auto font-bold text-[14px] leading-[17px] text-[#807D7E]">
              ${{ Number(item.price).toFixed(2) }}
            </p>
          </li>
        </ul>

        <div class="flex items-center justify-between gap-[10px] mb-[15px]">
          <p class="font-bold text-[18px] leading-[22px]">Subtotal

            <span class="font-light text-[#807D7E]">( {{ totalCountProducts }} items )</span>
          </p>

          <b class="font-bold text-[18px] leading-[22px]">${{ subtotalProducts }}</b>
        </div>

        <div class="flex items-center justify-between gap-[10px] mb-[15px]">
          <p class="font-bold text-[18px] leading-[22px]">Saving</p>

          <b class="font-bold text-[18px] leading-[22px]">-${{ saving.toFixed(2) }}</b>
        </div>

        <hr class="border-[#EDEEF2] block mb-[15px]">

        <div class="flex items-center justify-between gap-[10px] mb-[15px]">
          <p class="font-bold text-[18px] leading-[22px]">Shipping</p>

          <b class="font-bold text-[18px] leading-[22px]">${{ shippingAmount }}</b>
        </div>

        <hr class="border-[#EDEEF2] block mb-[15px]">

        <div class="flex items-center justify-between gap-[10px]">
          <p class="font-bold text-[18px] leading-[22px]">Total</p>

          <b class="font-bold text-[18px] leading-[22px]">${{ fullAmount }}</b>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>