<script setup lang="ts">
type Props = {
  pending: boolean
  arrayCartProduct: Array<any>
}

const props = withDefaults(defineProps<Props>(), {
  pending: false,
  arrayCartProduct: () => [],
})

const deliveryAmount = computed(() => {
  return props.arrayCartProduct.reduce(
    (accumulator, item) => {
      return item.subtotal ? accumulator + item.subtotal : accumulator + 0
    },
    0,
  ).toFixed(2)
})

const amountWithoutDelivery = computed(() => {
  return props.arrayCartProduct.reduce(
    (accumulator, item) => {
      return item.count > 1 ? accumulator + item.price * item.count : accumulator + item.price
    },
    0,
  ).toFixed(2)
})

const fullAmount = computed(() => {
  return (Number(amountWithoutDelivery.value) + Number(deliveryAmount.value)).toFixed(2)
})
</script>

<template>
  <div class="container xl:max-w-[1440px] bg-[#F6F6F6]">
    <div class="flex gap-[20px] justify-between font-causten">
      <div class="py-[29px]">
        <b class="block text-[24px] leading-[29px] text-black mb-[10px]">
          Discount Codes
        </b>

        <p class="text-[16px] leading-[19px] text-[#807D7E] mb-[41px]">
          Enter your coupon code if you have one
        </p>

        <div
          class="rounded-[10px] border border-[#BEBCBD] flex overflow-hidden w-fit mb-[37px]"
        >
          <input
            :disabled="pending"
            class="disabled:opacity-40 focus:outline-none px-[12px] text-[16px] font-semibold leading-[19px]"
          />

          <button
            :disabled="pending"
            class="disabled:opacity-40 bg-purple text-white text-[16px] font-semibold leading-[19px] px-[31px] py-[13px] border-l border-[#BEBCBD]"
          >
            Apply Coupon
          </button>
        </div>

        <button
          :disabled="pending"
          class="disabled:opacity-40 bg-white rounded-[8px] border border-[#BEBCBD] text-black text-[16px] font-semibold leading-[19px] px-[49px] py-[11px]"
        >
          Continue Shopping
        </button>
      </div>

      <div class="bg-[#F3F3F3] max-w-[465px] w-full">
        <div
          class="flex items-center justify-center px-[10px] pt-[39px] pb-[50px]"
        >
          <table border="1" cellpadding="8" cellspacing="0">
            <tbody>
              <tr
                class="font-medium font-causten text-black text-[22px] leading-[26px]"
              >
                <td>Sub Total</td>
                <td>${{ amountWithoutDelivery }}</td>
              </tr>

              <tr
                class="font-medium font-causten text-black text-[22px] leading-[26px]"
              >
                <td>Shipping</td>
                <td>${{ deliveryAmount }}</td>
              </tr>

              <tr
                class="font-bold font-causten text-black text-[22px] leading-[26px]"
              >
                <td>Grand Total</td>
                <td>${{ fullAmount }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr class="border-[#BEBCBD]" />

        <div class="p-[50px] flex items-center justify-center">
          <button
            :disabled="pending"
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
