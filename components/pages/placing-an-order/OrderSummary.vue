<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()
</script>

<template>
  <div
    class="h-fit text-black shadow-[2px_2px_4px_0_#0000000D] relative z-[2] after:absolute after:z-[-1] after:top-0 after:h-full after:w-full after:block after:content-[''] after:shadow-[-2px_-2px_4px_0_#0000000D]"
  >
    <div class="px-[22px] py-[40px]">
      <b class="block text-[24px] leading-[24px] mb-[15px]"> Order Summary </b>

      <hr class="border-gray-70" />

      <template v-if="cartStore.arrayCartProduct.length">
        <ul class="flex flex-col gap-[15px] pt-[15px] mb-[15px]">
          <li
            v-for="(item, index) in cartStore.arrayCartProduct"
            :key="index"
            class="flex gap-[15px] items-center border-b border-gray-70 pb-[15px]"
          >
            <img
              v-if="item.imgSrc"
              :src="item.imgSrc"
              :alt="item.name"
              class="block h-auto w-[63px] rounded-[4px] overflow-hidden"
            />

            <div class="">
              <p
                v-if="item.name"
                class="mb-[5px] font-bold text-[14px] leading-[17px]"
              >
                {{ item.name }}
                <span v-if="item.count" class="text-gray-600">
                  x {{ item.count }}
                </span>
              </p>

              <p v-if="item.color" class="font-bold text-[14px] leading-[17px]">
                Colour:
                <span class="text-gray-600 font-light">{{ item.color }}</span>
              </p>
            </div>

            <p
              v-if="item.price"
              class="ml-auto font-bold text-[14px] leading-[17px] text-gray-600"
            >
              ${{ Number(item.price).toFixed(2) }}
            </p>
          </li>
        </ul>

        <div class="flex items-center justify-between gap-[10px] mb-[15px]">
          <p class="font-bold text-[18px] leading-[22px]">
            Subtotal

            <span class="font-light text-gray-600"
              >( {{ cartStore.totalCountProducts }} items )</span
            >
          </p>

          <b class="font-bold text-[18px] leading-[22px]"
            >${{ cartStore.subtotalProducts }}</b
          >
        </div>

        <div class="flex items-center justify-between gap-[10px] mb-[15px]">
          <p class="font-bold text-[18px] leading-[22px]">Saving</p>

          <b class="font-bold text-[18px] leading-[22px]"
            >-${{ cartStore.saving.toFixed(2) }}</b
          >
        </div>

        <hr class="border-gray-70 block mb-[15px]" />

        <div class="flex items-center justify-between gap-[10px] mb-[15px]">
          <p class="font-bold text-[18px] leading-[22px]">Shipping</p>

          <b class="font-bold text-[18px] leading-[22px]"
            >${{ cartStore.shippingAmount }}</b
          >
        </div>

        <hr class="border-gray-70 block mb-[15px]" />

        <div class="flex items-center justify-between gap-[10px]">
          <p class="font-bold text-[18px] leading-[22px]">Total</p>

          <b class="font-bold text-[18px] leading-[22px]"
            >${{ cartStore.fullAmount }}</b
          >
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
