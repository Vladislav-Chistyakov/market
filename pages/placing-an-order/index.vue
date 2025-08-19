<script setup lang="ts">
import type { Reactive } from 'vue'

const pending = ref(false)


type Form = {
  name: string
}

const form: Reactive<Form> = reactive({
  name: 'Turtleneck',
})

const resetForm = function () {
  form.name = ''
}
</script>

<template>
  <div class="font-causten container xl:max-w-[1440px] pt-[23px] pb-[44px]">

    <div class="flex items-center gap-[15px] mb-[55px]">
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

      <nuxt-link
        to="/"
        class="text-[18px] leading-[22px] text-[#807D7E] font-medium"
      >
        My Account
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
        Check Out
      </p>
    </div>


    <UniversalBaseHeading title="Check Out" class="mb-[20px]" :small="true" />

    <div class="grid gap-x-[38px] gap-y-[43px] grid-cols-[1fr_400px]">
      <div>
        <b class="block text-[24px] leading-[26px] font-bold text-black mb-[56px]">
          Billing Details
        </b>

        <form class="grid grid-cols-2 gap-x-[38px] gap-y-[29px]">
          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="First Name"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  First Name*
                </p>
              </template>
            </UniversalBaseInput>
          </div>

          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="Last Name"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  Last Name*
                </p>
              </template>
            </UniversalBaseInput>
          </div>

          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="Country / Region"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  Country / Region*
                </p>
              </template>
            </UniversalBaseInput>
          </div>

          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="Company (optional)"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  Company Name
                </p>
              </template>
            </UniversalBaseInput>
          </div>

          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="House number and street name"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  Street Address*
                </p>
              </template>
            </UniversalBaseInput>
          </div>

          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="apartment, suite, unit, etc. (optional)"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  Apt, suite, unit
                </p>
              </template>
            </UniversalBaseInput>
          </div>

          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="Town / City"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  City*
                </p>
              </template>
            </UniversalBaseInput>
          </div>

          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="State"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  State*
                </p>
              </template>
            </UniversalBaseInput>
          </div>

          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="Postal Code"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  Postal Code*
                </p>
              </template>
            </UniversalBaseInput>
          </div>

          <div>
            <UniversalBaseInput
              :disabled="pending"
              type="text"
              placeholder="Phone"
              :value="form.name"
              style-input="gray"
              @update:value="form.name = $event"
            >
              <template #label>
                <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
                  Phone*
                </p>
              </template>
            </UniversalBaseInput>
          </div>

        </form>
      </div>


      <div class="h-fit text-black shadow-[2px_2px_4px_0_#0000000D] relative z-[2] after:absolute after:z-[-1] after:top-0 after:h-full after:w-full after:block after:content-[''] after:shadow-[-2px_-2px_4px_0_#0000000D]">
        <div class="px-[22px] py-[40px]">
          <b class="block text-[24px] leading-[24px] mb-[15px]">
            Order Summary
          </b>

          <hr class="border-[#EDEEF2]">

          <ul class="flex flex-col gap-[15px] pt-[15px] mb-[15px]">
            <li class="flex gap-[15px] items-center border-b border-[#EDEEF2] pb-[15px]">
              <img src="#" alt="test" class="block h-[63px] w-[63px] rounded-[4px] overflow-hidden">

              <div class="">
                <p class="mb-[5px] font-bold text-[14px] leading-[17px]">Name product
                  <span class="text-[#807D7E]">x 1</span>
                </p>

                <p class="font-bold text-[14px] leading-[17px]">Colour:
                  <span class="text-[#807D7E] font-light">Gray</span>
                </p>
              </div>

              <p class="ml-auto font-bold text-[14px] leading-[17px] text-[#807D7E]">$29.00</p>
            </li>
          </ul>

          <div class="flex items-center justify-between gap-[10px] mb-[15px]">
            <p class="font-bold text-[18px] leading-[22px]">Subtotal
              <span class="font-light text-[#807D7E]">( 3 items )</span>
            </p>

            <b class="font-bold text-[18px] leading-[22px]">$513.00</b>
          </div>

          <div class="flex items-center justify-between gap-[10px] mb-[15px]">
            <p class="font-bold text-[18px] leading-[22px]">Saving</p>

            <b class="font-bold text-[18px] leading-[22px]">-$30.00</b>
          </div>

          <hr class="border-[#EDEEF2] block mb-[15px]">

          <div class="flex items-center justify-between gap-[10px] mb-[15px]">
            <p class="font-bold text-[18px] leading-[22px]">Shipping</p>

            <b class="font-bold text-[18px] leading-[22px]">-$4.00</b>
          </div>

          <hr class="border-[#EDEEF2] block mb-[15px]">

          <div class="flex items-center justify-between gap-[10px]">
            <p class="font-bold text-[18px] leading-[22px]">Total</p>

            <b class="font-bold text-[18px] leading-[22px]">$560.00</b>
          </div>
        </div>
      </div>

      <button class="bg-purple block w-fit p-[13px_20px] rounded-[8px] text-white text-[18px] font-causten font-light">
        Continue to delivery
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>