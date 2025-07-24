<script setup lang="ts"></script>

<template>
  <div>
    <div class="container xl:max-w-[1440px] font-causten bg-[#F6F6F6]">
      <div></div>

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
            <input />
            <button
              class="bg-purple text-white text-[16px] font-semibold leading-[19px] px-[31px] py-[13px] border-l border-[#BEBCBD]"
            >
              Apply Coupon
            </button>
          </div>

          <button
            class="bg-white rounded-[8px] border border-[#BEBCBD] text-black text-[16px] font-semibold leading-[19px] px-[49px] py-[11px]"
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
                  <td>$513.00</td>
                </tr>

                <tr
                  class="font-medium font-causten text-black text-[22px] leading-[26px]"
                >
                  <td>Shipping</td>
                  <td>$50.00</td>
                </tr>

                <tr
                  class="font-bold font-causten text-black text-[22px] leading-[26px]"
                >
                  <td>Grand Total</td>
                  <td>$563.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr class="border-[#BEBCBD]" />

          <div class="p-[50px] flex items-center justify-center">
            <button
              class="bg-purple text-white text-[18px] font-semibold leading-[22px] px-[33px] py-[12px] rounded-[8px]"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
