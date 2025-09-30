<script setup lang="ts"></script>

<template>
  <div
    class="mb-[100px] font-causten max-w-[692px] w-fit mx-auto h-fittext-color-black shadow-[2px_2px_4px_0_#0000000D] relative z-[2] after:absolute after:z-[-1] after:top-0 after:h-full after:w-full after:block after:content-[''] after:shadow-[-2px_-2px_4px_0_#0000000D]"
  >
    <div
      class="px-8 lg:px-[118px] py-6 lg:py-[78px] flex flex-col justify-center items-center"
    >
      <svg
        class="inline-block mb-10 lg:mb-[60px]"
        width="170"
        height="170"
        viewBox="0 0 170 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="85" cy="85" r="85" fill="#F0F9F4" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M85.4787 63.46C79.2557 56.2078 68.8785 54.257 61.0815 60.8978C53.2845 67.5387 52.1868 78.6418 58.3098 86.4959C63.4007 93.0261 78.8074 106.799 83.8569 111.256C84.4218 111.755 84.7043 112.005 85.0338 112.103C85.3214 112.188 85.636 112.188 85.9236 112.103C86.2531 112.005 86.5355 111.755 87.1005 111.256C92.15 106.799 107.557 93.0261 112.648 86.4959C118.771 78.6418 117.807 67.4688 109.876 60.8978C101.945 54.3269 91.7017 56.2078 85.4787 63.46Z"
          stroke="#28A642"
          stroke-width="6.225"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <b
        class="block text-center font-core-sans-c text-[22px] leading-[24px] lg:text-[34px] lg:leading-[36px] font-semibold mb-[10px]"
        >Your wishlist is empty.</b
      >

      <p
        class="text-center font-medium text-[16px] leading-[18px] text-[#807D7E] mb-[42px]"
      >
        You don’t have any products in the wishlist yet. You will find a lot of
        interesting products on our Shop page.
      </p>

      <nuxt-link
        to="/products/male"
        class="w-fit mx-auto bg-purple text-white p-[12px_48px] rounded-[8px] font-medium text-[18px] leading-[22px]"
      >
        Continue Shopping
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped></style>
