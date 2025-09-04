<script setup lang="ts">
import { useWishlistStore } from '~/store/wishlist'
import { useRoute } from '#vue-router'

const wishlistStore = useWishlistStore()
const route = useRoute()

const list = computed(() => {
  return wishlistStore.editedWishlistForPage
})

const pendingList = computed(() => {
  return wishlistStore.pendingWishlist
})


const changeStatusProductWishlist = async function (productId: string) {
  await wishlistStore.changeProductToWishlist(productId)
}
</script>

<template>
  <div class="font-causten text-black min-h-[656px]">
    <h1 class="mb-[58px] text-[29px] leading-[20px] font-semibold">Wishlist</h1>

    <client-only>
      <ul class="flex flex-col gap-[30px]" :class="{ 'opacity-30' : pendingList }">
        <li
          v-for="(item, index) in list"
          :key="index + item.id"
          class="flex gap-[36px] items-center border-b border-[#EDEEF2] pb-[30px]"
        >
          <button @click.prevent="changeStatusProductWishlist(item.id)" :disabled="pendingList" class="flex items-center justify-center">
            <svg
              class="inline-block h-[22px] min-w-[22px]"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 4L4 18M18 18L4 4.00001"
                stroke="#3C4242"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <img
            :src="item.imageScr"
            :alt="item.name"
            class="h-40 block min-w-[110px] rounded-[4px] overflow-hidden"
          />

          <div class="flex-1 flex items-center justify-between gap-4">
            <div class="flex flex-col gap-[12px]">
              <p class="mb-[5px] font-bold text-[22px] leading-[26px]">
                {{ item.name }}
              </p>

              <p
                class="font-bold text-[22px] leading-[26px] flex gap-[2px] text-nowrap"
              >
                Color :
                <span class="text-[#807D7E] font-light">{{ item.color }}</span>
              </p>

              <p
                class="font-bold text-[22px] leading-[26px] flex gap-[2px] text-nowrap"
              >
                Quantity :
                <span class="text-[#807D7E] font-light">1</span>
              </p>
            </div>
            <div class="flex gap-[50px] items-center justify-end">
              <p class="font-bold text-[22px] leading-[26px] text-[#807D7E]">
                ${{ item.price }}
              </p>

              <nuxt-link
                class="w-fit bg-purple text-white p-[14px_28px] rounded-[8px] font-medium text-[18px] leading-[22px]"
                :class="{ 'cursor-default' : pendingList }"
                :href="pendingList ? route.path : `/products/${item.gender}/${item.category.toLowerCase()}/${item.id}`"
              >
                Add to cart
              </nuxt-link>
            </div>
          </div>
        </li>
      </ul>
    </client-only>
  </div>
</template>

<style scoped></style>
