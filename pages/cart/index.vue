<script setup lang="ts">
import { useCartStore } from '~/store/cart'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const cartStore = useCartStore()

const pending = ref(false)

const pagePending = computed(() => pending.value || cartStore.pendingCart)

// Получение корзины товаров
const getCartUser = async function() {
  await cartStore.getCartUser().finally(() => pending.value = false)
}

await getCartUser()

// Получения списка товара для вывода в список
const arrayCartProduct = computed(() => cartStore.arrayCartProduct)
</script>

<template>
  <div class="font-causten">
    <div class="container xl:max-w-[1440px] py-[50px]">
      <div class="flex items-center gap-[15px] mb-[30px]">
        <nuxt-link
          to="/"
          class="text-[18px] leading-[22px] text-[#807D7E] font-medium"
        >
          Home
        </nuxt-link>

        <div class="flex">
          <svg
            width="5"
            height="12"
            viewBox="0 0 5 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.157568 10.9358C-0.0436482 10.7467 -0.0534543 10.4302 0.135666 10.229L3.92592 6.19633C4.02469 6.09124 4.02469 5.90878 3.92592 5.8037L0.135667 1.77102C-0.0534536 1.5698 -0.0436474 1.25337 0.157569 1.06425C0.358786 0.875128 0.675216 0.884934 0.864336 1.08615L4.65459 5.11883C5.11514 5.60883 5.11514 6.39119 4.65459 6.88119L0.864336 10.9139C0.675215 11.1151 0.358785 11.1249 0.157568 10.9358Z"
              fill="#807D7E"
            />
          </svg>
        </div>

        <p class="text-[18px] leading-[22px] text-black font-medium">
          Add To Cart
        </p>
      </div>

      <div>
        <p class="text-[14px] leading-[17px] text-[#807D7E]">
          Please fill in the fields below and click place order to complete your
          purchase!
        </p>

        <p
          v-if="!userStore.isAuthorization"
          class="text-[14px] leading-[17px] text-[#807D7E]"
        >
          Already registered?
          <nuxt-link
            to="/authorization/sign-in"
            class="font-medium text-purple"
          >
            Please login here
          </nuxt-link>
        </p>
      </div>
    </div>

    <div class="mx-auto xl:max-w-[1440px]">
      <PagesCartListProducts
        :array-cart-product="arrayCartProduct"
        :pending="pagePending"
      />
    </div>

    <PagesCartOrderSummary
      :array-cart-product="arrayCartProduct"
      :pending="pagePending"
    />
  </div>
</template>

<style scoped></style>
