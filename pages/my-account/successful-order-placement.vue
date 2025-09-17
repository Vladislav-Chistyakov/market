<script setup lang="ts"></script>

<template>
  <div
    class="lg:max-w-[1024px] xl:max-w-[1440px] lg:mx-auto container pt-[125px] pb-[108px]"
  >
    <div class="flex justify-center">
      <div class="pt-11">
        <img
          class="relative left-5"
          src="@/assets/images/pages/my-account/woman.svg"
          alt="woman"
        />
      </div>

      <div class="relative flex justify-center min-h-[462px] min-w-[412px]">
        <img
          class="z-0 absolute min-h-[462px] min-w-[412px]"
          src="@/assets/images/pages/my-account/border.svg"
          alt="border"
        />

        <div class="z-10 flex absolute top-5 right-6">
          <img
            class="h-[18px] w-[18px]"
            src="@/assets/images/pages/my-account/close.svg"
            alt="border"
          />
        </div>

        <div
          class="relative z-10 flex flex-col w-full pl-10 pt-20 items-center gap-10"
        >
          <img
            class="h-[126px] w-[203px]"
            src="@/assets/images/pages/my-account/success.svg"
            alt="success"
          />

          <div class="flex flex-col items-center gap-5">
            <b
              class="font-core-sans-c max-w-[230px] text-center font-semibold text-[34px] leading-[40px] text-black"
            >
              Your Order is Confirmed
            </b>

            <nuxt-link
              to="/products/male"
              class="w-fit mx-auto bg-purple text-white p-[16px_48px] rounded-[8px] font-medium text-[18px] leading-[22px]"
            >
              Continue Shopping
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
