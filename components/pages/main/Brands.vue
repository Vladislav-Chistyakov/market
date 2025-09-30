<script setup lang="ts"></script>

<template>
  <div class="container max-w-[1440px]">
    <div class="bg-black px-5 pt-[32px] pb-[60px] lg:px-[123px] rounded-[12px]">
      <h2
        class="font-core-sans-c font-extrabold text-white text-[28px] lg:text-[38px] xl:text-[50px] text-center mb-[8px]"
      >
        Top Brands Deal
      </h2>

      <p
        class="font-causten text-[22px] text-white mb-[32px] lg:mb-[64px] text-center"
      >
        Up To
        <span class="text-color-yellow font-causten font-bold">60%</span>
        off on brands
      </p>

      <ul class="grid grid-cols-1 lg:grid-cols-5 gap-[24px] items-center">
        <li
          class="h-[85px] bg-white rounded-[12px] flex items-center justify-center px-[13px]"
        >
          <img src="@/assets/images/pages/main/brands/nike.svg" />
        </li>

        <li
          class="h-[85px] bg-white rounded-[12px] flex items-center justify-center px-[13px]"
        >
          <img src="@/assets/images/pages/main/brands/hm.svg" />
        </li>

        <li
          class="h-[85px] bg-white rounded-[12px] flex items-center justify-center px-[13px]"
        >
          <img src="@/assets/images/pages/main/brands/levis.svg" />
        </li>

        <li
          class="h-[85px] bg-white rounded-[12px] flex items-center justify-center px-[13px]"
        >
          <img src="@/assets/images/pages/main/brands/polo.svg" />
        </li>

        <li
          class="h-[85px] bg-white rounded-[12px] flex items-center justify-center px-[13px]"
        >
          <img src="@/assets/images/pages/main/brands/puma.svg" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
