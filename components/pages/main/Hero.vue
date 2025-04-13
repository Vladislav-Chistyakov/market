<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Scrollbar, A11y } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const onSwiper = (swiper) => {
  console.log(swiper)
}
const onSlideChange = () => {
  console.log('slide change')
}

const modules = [Pagination, Scrollbar, A11y]
</script>

<template>
  <div class="hero mb-[130px]">
    <swiper
        class="container xl:max-w-[1440px] h-[716px]"
        :slides-per-view="1"
        :space-between="0"
        :modules="modules"
        :pagination="{ clickable: true }"
        navigation
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
      <swiper-slide class="text-white">
        <div class="pl-[193px] pt-[140px] pb-[132px] bg-[url('@/assets/images/pages/main/hero/hero-one.jpeg')] bg-cover bg-no-repeat h-full">
          <b class="block text-white font-core-sans-c text-[32px] leading-[38px] font-medium mb-[40px]">
            T-shirt / Tops
          </b>

          <h1 class="max-w-[440px] text-white font-core-sans-c text-[78px] leading-[94px] font-extrabold mb-[40px]">
            Summer Value Pack
          </h1>

          <p class="text-white font-core-sans-c text-[32px] leading-[48px] font-medium mb-[40px]">
            cool / colorful / comfy
          </p>

          <button class="block bg-white rounded-[8px] px-[72px] py-[16px] text-text-black font-causten text-[24px] font-bold">
            Shop Now
          </button>
        </div>
      </swiper-slide>


      <swiper-slide class="text-white">
        <div class="pl-[193px] pt-[140px] pb-[132px] bg-[url('@/assets/images/pages/main/hero/hero-two.jpeg')] bg-cover bg-no-repeat h-full">
          <b class="block text-white font-core-sans-c text-[32px] leading-[38px] font-medium mb-[40px]">
            T-shirt / Tops
          </b>

          <h2 class="max-w-[440px] text-white font-core-sans-c text-[78px] leading-[94px] font-extrabold mb-[40px]">
            Summer Value Pack
          </h2>

          <p class="text-white font-core-sans-c text-[32px] leading-[48px] font-medium mb-[40px]">
            cool / colorful / comfy
          </p>

          <button class="block bg-white rounded-[8px] px-[72px] py-[16px] text-text-black font-causten text-[24px] font-bold">
            Shop Now
          </button>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style>
.hero {

  .swiper-horizontal {
    .swiper-pagination-bullet {
      margin: 0 1px;
    }
  }

  .swiper-pagination-bullet {
    background-color: white;
    height: 10px;
    width: 64px;
  }

  .swiper-pagination-bullet:first-child {
    border-radius: 10px 0 0 10px;
  }

  .swiper-pagination-bullet:last-child {
    border-radius: 0 10px 10px 0;
  }
}
</style>