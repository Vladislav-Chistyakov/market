<script setup lang="ts">
import { useUserStore } from '~/store/user'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import type { Ref } from 'vue'

const { getCart } = useFirebaseFunctions()

const getProductId = useFirebaseFunctions().getProductId
const userStore = useUserStore()
const pending = ref(false)

type CartItem = {
  color: string
  price: number
  countProductCart: number
  size: string
  productId: string
  key: string
}

type CartUser = {
  [productId: string]: CartItem
}

const products: Ref<unknown> = ref([])
let cartUser: CartUser = reactive({})

async function getCartUser() {
  pending.value = true
  try {
    if (userStore.userData && userStore.userData.uid) {
      const data = await getCart(userStore.userData.uid)

      // Удаляем старые ключи
      for (const key in cartUser) {
        delete cartUser[key]
      }

      // Добавляем новые
      for (const key in data) {
        cartUser[key] = data[key]
        cartUser[key].key = key
      }

      const productIds = Object.values(cartUser).map((item) => item.productId)

      const productRequests = productIds.map((id) => getProductId(id))

      products.value = await Promise.all(productRequests)
      console.log('products', products.value)
    }
  } catch (error) {
    console.log('Error getCartUser', error)
  } finally {
    pending.value = false
  }
}
getCartUser()

const arrayCartProduct = computed(() => {
  const arrCart = Object.values(cartUser)
  const arr = products.value.map((item: any, index: number) => {
    console.log({ ...item, ...arrCart[index] })
    return {
      name: item.name || '',
      color: arrCart[index].color || '',
      size: arrCart[index].size || '',
      price: arrCart[index].price || null,
      imgSrc: item.images[0] || '',
      count: arrCart[index].countProductCart || null,
      subtotal: item.subtotal,
      id: `${item.id}-${arrCart[index].color}-${arrCart[index].size}` || '',
    }
  })
  return arr
})
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
        :pending="pending"
      />
    </div>

    <PagesCartOrderSummary
      :array-cart-product="arrayCartProduct"
      :pending="pending"
    />
  </div>
</template>

<style scoped></style>
