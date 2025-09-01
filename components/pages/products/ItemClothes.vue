<script setup lang="ts">
import { useWishlistStore } from '~/store/wishlist'

type Props = {
  item: Object
}

const wishlistStore = useWishlistStore()

withDefaults(defineProps<Props>(), {
  item: () => {},
})

const changeStatusProductWishlist = async function (productId: string) {
  console.log('productId - ', productId)
  await wishlistStore.changeProductToWishlist(productId).then(() => {
    console.log('productId Сохранен в wishlist ', productId)
  })
}
</script>

<template>
  <li class="font-causten pb-[26px]">
    <nuxt-link
      target="_blank"
      :href="
        '/products/'
        + item.gender
        + '/'
        + item.category.toLowerCase()
        + '/'
        + item.id
      "
    >
      <div
        class="relative h-[370px] w-[281px] rounded-[12px] overflow-hidden mb-[30px]"
      >
        <img
          v-if="item.images && item.images[0]"
          :src="item.images[0]"
          :alt="item.name"
          class="object-cover object-top h-[inherit] w-full"
        />

        <button
          @click.prevent="changeStatusProductWishlist(item.id)"
          class="h-[32px] w-[32px] bg-white absolute right-[20px] top-[26px] flex items-center justify-center rounded-full"
        >
          <svg
            class="flex"
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.71983 2.7123C6.34501 1.11009 4.0524 0.679108 2.32985 2.14624C0.607289 3.61338 0.364777 6.06636 1.71751 7.80154C2.84222 9.24424 6.24597 12.287 7.36154 13.2718C7.48635 13.382 7.54875 13.4371 7.62155 13.4587C7.68508 13.4776 7.75459 13.4776 7.81812 13.4587C7.89092 13.4371 7.95332 13.382 8.07813 13.2718C9.19369 12.287 12.5974 9.24424 13.7222 7.80154C15.0749 6.06636 14.862 3.59795 13.1098 2.14624C11.3577 0.69454 9.09466 1.11009 7.71983 2.7123Z"
              stroke="#3C4242"
              stroke-width="1.26066"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <div class="flex gap-[15px] justify-between">
        <div>
          <b
            class="block font-semibold text-[16px] leading-[18px] text-black mb-[5px]"
          >
            {{ item.name }}
          </b>

          <p class="font-medium text-[14px] leading-[16px] text-text-gray-200">
            {{ item.brands || 'No brands' }}
          </p>
        </div>

        <button
          @click.prevent="console.log('1')"
          class="text-center text-black p-[10px] bg-text-gray-50 font-bold text-[14px] leading-[16px] min-w-[82px] rounded-[8px]"
        >
          ${{ item.price || 123 }}
        </button>
      </div>
    </nuxt-link>
  </li>
</template>

<style scoped></style>
