<script setup lang="ts">
import { useRouter } from '#vue-router'
import { useCartStore } from '~/store/cart'

type Props = {
  pending: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pending: false,
})

const cartStore = useCartStore()

const coupon = ref('')
const pendingDiscount = ref(false)
const usedCoupon = ref(false)
const messageCoupon = ref('')

const pendingComponent = computed(() => props.pending || pendingDiscount.value)

const router = useRouter()

function goToCreateOrderPage() {
  router.push('/placing-an-order')
}

async function checkCoupon() {
  if (coupon.value && !usedCoupon.value) {
    pendingDiscount.value = true
    await $fetch(`/nuxt-api/coupon/${coupon.value}`, {
      method: 'GET',
    })
      .then((res) => {
        if (res) {
          console.log('TEst 3 __ ', res)
          cartStore.useCouponDiscount(res)
          usedCoupon.value = true
          messageCoupon.value = ''
        } else {
          usedCoupon.value = false
          messageCoupon.value = 'There is no such coupon'
        }
      })
      .finally(() => (pendingDiscount.value = false))
  }
}

onMounted(() => {
  if (cartStore.discountCoupon && cartStore.discountCoupon.name) {
    coupon.value = cartStore.discountCoupon.name
    usedCoupon.value = true
  }
})
</script>

<template>
  <div class="container max-w-full xl:max-w-[1440px] bg-gray-50">
    <div class="flex flex-col lg:flex-row gap-5 justify-between font-causten">
      <div class="py-[29px]">
        <b class="block text-[24px] leading-[29px] text-black mb-[10px]">
          Discount Codes
        </b>

        <p class="text-[16px] leading-[19px] text-gray-600 mb-[41px]">
          Enter your coupon code if you have one
        </p>

        <div class="relative mb-[37px]">
          <div
            class="relative rounded-[10px] border overflow-hidden border-gray-500 flex overflow w-fit"
          >
            <input
              v-model="coupon"
              :disabled="pendingComponent || usedCoupon"
              class="disabled:opacity-40 focus:outline-none px-[12px] text-[16px] font-semibold leading-[19px]"
            />

            <button
              @click="checkCoupon"
              :disabled="pendingComponent || usedCoupon"
              class="disabled:opacity-40 bg-purple text-white text-[16px] font-semibold leading-[19px] px-[31px] py-[13px] border-l border-gray-500"
            >
              Apply Coupon
            </button>
          </div>

          <div
            class="absolute w-fit bottom-[-20px] right-0 text-[16px] font-semibold leading-[19px]"
          >
            <span v-if="usedCoupon" class="text-green">You used a coupon</span>
            <span v-else-if="messageCoupon" class="text-red">{{
              messageCoupon
            }}</span>
          </div>
        </div>

        <nuxt-link
          to="/products/male/"
          class="disabled:opacity-40 bg-white rounded-[8px] border border-gray-500 text-black text-[16px] font-semibold leading-[19px] px-[49px] py-[11px]"
        >
          Continue Shopping
        </nuxt-link>
      </div>

      <div class="bg-[#F3F3F3] lg:max-w-[465px] w-full">
        <div
          class="flex items-center justify-center px-[10px] pt-[39px] pb-[50px]"
        >
          <table border="1" cellpadding="8" cellspacing="0">
            <tbody>
              <tr
                class="font-medium font-causten text-black text-[22px] leading-[26px]"
              >
                <td>Sub Total</td>
                <td>${{ cartStore.subtotalProducts }}</td>
              </tr>

              <tr
                class="font-medium font-causten text-black text-[22px] leading-[26px]"
              >
                <td>Shipping</td>
                <td>${{ cartStore.shippingAmount }}</td>
              </tr>

              <tr
                class="font-medium font-causten text-black text-[22px] leading-[26px]"
              >
                <td>Saving</td>
                <td>${{ cartStore.saving }}</td>
              </tr>

              <tr
                class="font-bold font-causten text-black text-[22px] leading-[26px]"
              >
                <td>Grand Total</td>
                <td>${{ cartStore.fullAmount }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr class="border-gray-500" />

        <div class="p-[50px] flex items-center justify-center">
          <button
            @click="goToCreateOrderPage"
            :disabled="pendingComponent && !cartStore.arrayCartProduct.length"
            class="bg-purple text-white text-[18px] font-semibold leading-[22px] px-[33px] py-[12px] rounded-[8px] disabled:opacity-40"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
