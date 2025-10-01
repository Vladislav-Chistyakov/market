<script setup lang="ts"></script>

<template>
  <ul
    class="container xl:max-w-[1440px] xl:mx-auto grid grid-cols-1 md:grid-cols-2 gap-[30px]"
  >
    <li
      class="bg-[url(@/assets/images/pages/main/woman-one.webp)] bg-cover bg-no-repeat p-[30px_20px_26px_18px] sm:p-[40px_30px_36px_28px] xl:p-[71px_40px_56px_28px] rounded-[16px] overflow-hidden"
    >
      <p
        class="font-montserrat font-extrabold text-[18px] text-white leading-[22px] mb-4 xl:mb-[30px]"
      >
        Low Price
      </p>

      <h3
        class="max-w-[264px] font-core-sans-c font-extrabold text-[26px] leading-7 xl:text-[34px] text-white xl:leading-[45px] mb-[10px]"
      >
        High Coziness
      </h3>

      <span
        class="block font-core-sans-c font-medium text-[16px] text-white leading-[25px] mb-5 xl:mb-[43px]"
      >
        UPTO 50% OFF
      </span>

      <nuxt-link
        to="/products/female"
        class="ml-[4px] font-core-sans-c font-bold text-[20px] text-white leading-[30px] border-b border-white"
      >
        Explore Items
      </nuxt-link>
    </li>

    <li
      class="bg-[url(@/assets/images/pages/main/woman-two.webp)] bg-cover bg-no-repeat p-[30px_20px_26px_18px] sm:p-[40px_30px_36px_28px] xl:p-[71px_40px_56px_28px] rounded-[16px] overflow-hidden"
    >
      <p
        class="font-montserrat font-extrabold text-[18px] text-white leading-[22px] mb-4 xl:mb-[30px]"
      >
        Beyoung Presents
      </p>

      <h3
        class="max-w-[270px] font-core-sans-c font-extrabold text-[26px] leading-7 xl:text-[34px] text-white xl:leading-[45px] mb-[10px]"
      >
        Breezy Summer Style
      </h3>

      <span
        class="block font-core-sans-c font-medium text-[16px] text-white leading-[25px] mb-5 xl:mb-[32px]"
      >
        UPTO 50% OFF
      </span>

      <nuxt-link
        to="/products/female"
        class="font-core-sans-c font-bold text-[20px] text-white leading-[30px] border-b border-white"
      >
        Explore Items
      </nuxt-link>
    </li>
  </ul>
</template>

<style scoped></style>
