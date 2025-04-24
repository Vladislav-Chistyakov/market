<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
// import required modules
const modules = [Mousewheel, Pagination, Navigation]
</script>

<template>
  <swiper
      direction="vertical"
      :slidesPerView="4"
      :spaceBetween="30"
      :mousewheel="true"
      :navigation="true"
      :pagination="{
      clickable: true,
    }"
      :modules="modules"
      class="swiper-product max-h-[300px]"
  >
    <swiper-slide class="h-[40px]">Slide 1</swiper-slide>
    <swiper-slide class="h-[40px]">Slide 2</swiper-slide><swiper-slide class="h-[40px]">Slide 3</swiper-slide>
    <swiper-slide class="h-[40px]">Slide 4</swiper-slide><swiper-slide class="h-[40px]">Slide 5</swiper-slide>
    <swiper-slide class="h-[40px]">Slide 6</swiper-slide><swiper-slide class="h-[40px]">Slide 7</swiper-slide>
    <swiper-slide class="h-[40px]">Slide 8</swiper-slide><swiper-slide class="h-[40px]">Slide 9</swiper-slide>
  </swiper>
</template>

<style>
.swiper-product {
  .swiper-button-prev, .swiper-button-next {
    bottom: 0;
    top: auto;
  }
}
</style>
