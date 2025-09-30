<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Scrollbar } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const modules = [Pagination, Scrollbar]
</script>

<template>
  <div class="hero mb-[30px] md:mb-[60px] xl:mb-[130px]">
    <swiper
      class="container xl:max-w-[1440px] h-fit xl:h-[716px]"
      :slides-per-view="1"
      :space-between="0"
      :modules="modules"
      :navigation="{ enabled: true }"
      :pagination="{ clickable: true }"
    >
      <swiper-slide class="text-white">
        <div
          class="pl-[40px] pt-[40px] pb-[32px] image-hero-one bg-[url('@/assets/images/pages/main/hero/hero-one.jpeg')] bg-position-left bg-cover bg-no-repeat xl:h-full xl:bg-cover xl:pl-[193px] xl:pt-[140px] xl:pb-[132px] xl:bg-position-top"
        >
          <b
            class="text-start block text-white font-core-sans-c text-[20px] leading-6 xl:text-[32px] xl:leading-[38px] font-medium mb-[40px]"
          >
            T-shirt / Tops
          </b>

          <h1
            class="text-start max-w-[440px] text-white font-core-sans-c text-[28px] leading-8 xl:text-[78px] xl:leading-[94px] font-extrabold mb-[40px]"
          >
            Summer Value Pack
          </h1>

          <p
            class="text-start text-white font-core-sans-c text-[20px] leading-6 xl:text-[32px] xl:leading-[48px] font-medium mb-[40px]"
          >
            cool / colorful / comfy
          </p>

          <nuxt-link
            to="/products/female"
            class="block w-fit bg-white rounded-[8px] px-8 py-4 xl:px-[72px] xl:py-[16px] text-black font-causten text-[20px] leading-6 xl:text-[24px] xl:leading-7 font-bold"
          >
            Shop Now
          </nuxt-link>
        </div>
      </swiper-slide>

      <swiper-slide class="text-white">
        <div
          class="pl-[40px] pt-[40px] pb-[32px] xl:pl-[193px] xl:pt-[140px] xl:pb-[132px] bg-[url('@/assets/images/pages/main/hero/hero-two.jpeg')] bg-cover bg-no-repeat xl:h-full"
        >
          <b
            class="text-start block text-white font-core-sans-c text-[20px] leading-6 xl:text-[32px] xl:leading-[38px] font-medium mb-[40px]"
          >
            T-shirt / Tops
          </b>

          <h2
            class="text-start max-w-[440px] text-white font-core-sans-c text-[28px] leading-8 xl:text-[78px] xl:leading-[94px] font-extrabold mb-[40px]"
          >
            Summer Value Pack
          </h2>

          <p
            class="text-start text-white font-core-sans-c text-[20px] leading-6 xl:text-[32px] xl:leading-[48px] font-medium mb-[40px]"
          >
            cool / colorful / comfy
          </p>

          <nuxt-link
            to="/products/female"
            class="block w-fit bg-white rounded-[8px] px-8 py-4 xl:px-[72px] xl:py-[16px] text-black font-causten text-[20px] leading-6 xl:text-[24px] xl:leading-7 font-bold"
          >
            Shop Now
          </nuxt-link>
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

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
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
