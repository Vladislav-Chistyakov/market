<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, Navigation } from 'swiper/modules'
import type { NavigationOptions } from 'swiper/types'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

const navigationOption: NavigationOptions = {
  prevEl: '.product-slider-button-prev',
  nextEl: '.product-slider-button-next',
}

const modules = [Mousewheel, Navigation]
</script>

<template>
  <div class="relative overflow-visible">
    <swiper
        direction="vertical"
        :slidesPerView="4"
        :spaceBetween="30"
        :mousewheel="true"
        :navigation="navigationOption"
        :pagination="{
      clickable: true,
    }"
        :modules="modules"
        class="swiper-product max-h-[300px]"
    >
      <swiper-slide class="h-[40px]">Slide 1</swiper-slide>

      <swiper-slide class="h-[40px]">Slide 2</swiper-slide>

      <swiper-slide class="h-[40px]">Slide 3</swiper-slide>

      <swiper-slide class="h-[40px]">Slide 4</swiper-slide>

      <swiper-slide class="h-[40px]">Slide 5</swiper-slide>

      <swiper-slide class="h-[40px]">Slide 6</swiper-slide>

      <swiper-slide class="h-[40px]">Slide 7</swiper-slide>

      <swiper-slide class="h-[40px]">Slide 8</swiper-slide>

      <swiper-slide class="h-[40px]">Slide 9</swiper-slide>
    </swiper>

    <div class="absolute">
      <button class="swiper-button-prev product-slider-button-prev" />
      <button class="swiper-button-next product-slider-button-next" />
    </div>
  </div>
</template>

<style>
.swiper-product {
  .swiper-button-prev, .swiper-button-next {
    bottom: -20px;
    top: auto;
  }
}
</style>
