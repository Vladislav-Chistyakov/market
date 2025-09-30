<script setup lang="ts">
import { useRoute } from '#vue-router'

const route = useRoute()

enum Pages {
  MyOrders = '/my-account/my-orders',
  Wishlist = '/my-account/wishlist',
  MyInfo = '/my-account/my-info',
}
</script>

<template>
  <div
    class="lg:max-w-[1024px] xl:max-w-[1440px] lg:mx-auto container pt-[23px]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-[294px_1fr] gap-[50px]">
      <div>
        <UniversalBaseHeading
          title="Hello ${name}"
          :small="true"
          class="mb-[20px]"
        />

        <p
          class="font-core-sans-c text-[13px] leading-[15px] text-color-gray-200 mb-[32px]"
        >
          Welcome to your Account
        </p>

        <ul class="flex flex-col gap-[9px]">
          <li>
            <NuxtLink
              :to="Pages.MyOrders"
              :disabled="Pages.MyOrders === route.path"
              class="flex flex-row gap-[15px] border-l-2 border-white py-[12px] px-[35px]"
              :class="{ 'nuxt-link-active': Pages.MyOrders === route.path }"
            >
              <img
                src="@/assets/images/pages/my-account/my-orders.svg"
                alt="my-orders"
              />

              <span
                class="block font-causten font-semibold text-[18px] leading-[20px] text-color-gray-200"
              >
                My orders
              </span>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              :to="Pages.Wishlist"
              :disabled="Pages.Wishlist === route.path"
              class="flex flex-row gap-[15px] border-l-2 border-white py-[12px] px-[35px]"
              :class="{ 'nuxt-link-active': Pages.Wishlist === route.path }"
            >
              <img
                src="@/assets/images/pages/my-account/heart.svg"
                alt="heart"
              />

              <span
                class="block font-causten font-semibold text-[18px] leading-[20px] text-color-gray-200"
              >
                Wishlist
              </span>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              :to="Pages.MyInfo"
              :disabled="Pages.MyInfo === route.path"
              class="flex flex-row gap-[15px] border-l-2 border-white py-[12px] px-[35px]"
              :class="{ 'nuxt-link-active': Pages.MyInfo === route.path }"
            >
              <img src="@/assets/images/pages/my-account/user.svg" alt="user" />

              <span
                class="block font-causten font-semibold text-[18px] leading-[20px] text-color-gray-200"
              >
                My info
              </span>
            </NuxtLink>
          </li>

          <li>
            <button
              class="w-full flex flex-row gap-[15px] border-l-2 border-white py-[12px] px-[35px]"
            >
              <img
                src="@/assets/images/pages/my-account/sign-out.svg"
                alt="sign-out"
              />

              <span
                class="block font-causten font-semibold text-[18px] leading-[20px] text-color-gray-200"
              >
                Sign out
              </span>
            </button>
          </li>
        </ul>
      </div>

      <slot name="default" />
    </div>

    <div>
      <slot name="additional" />
    </div>
  </div>
</template>

<style scoped>
.nuxt-link-active {
  @apply border-color-black bg-color-gray-50 rounded-r-lg;
}
</style>
