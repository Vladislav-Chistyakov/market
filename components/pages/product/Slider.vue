<script setup>
import { ref } from 'vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
const thumbsSwiper = ref(null)

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const modules = [FreeMode, Navigation, Thumbs]

const navigationOption = {
  prevEl: '.product-slider-button-prev',
  nextEl: '.product-slider-button-next',
}
</script>

<template>
  <div class="relative h-fit grid grid-cols-[77px_1fr] gap-[34px] min-h-[785px] max-w-[1000px] items-center">
    <div class="flex items-center justify-center h-[300px]">
      <swiper
          @swiper="setThumbsSwiper"
          direction="vertical"
          :spaceBetween="10"
          :slidesPerView="3"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
          class="mySwiper"
      >
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </swiper-slide>
      </swiper>
    </div>

    <swiper
        :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
        :spaceBetween="10"
        :navigation="navigationOption"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="modules"
        class="mySwiper2"
    >
      <swiper-slide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-10.jpg"/>
      </swiper-slide>
    </swiper>


    <div class="absolute bottom-[155px] left-[26px] flex flex-col gap-3 items-center justify-center h-[55px]">
      <button class="product-slider-button-prev bg-red h-[21px] w-[21px] rounded-full flex items-center justify-center">
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.20263 5.31578C7.94439 5.51267 7.57544 5.46294 7.37855 5.2047L4.44462 1.35659C4.37158 1.30823 4.26493 1.30823 4.19188 1.35659L1.25795 5.2047C1.06107 5.46294 0.692114 5.51267 0.433878 5.31578C0.175641 5.11889 0.125909 4.74994 0.322797 4.4917L3.26685 0.630317C3.30121 0.585256 3.3532 0.522894 3.42521 0.463225C3.93831 0.0380759 4.6982 0.0380759 5.2113 0.463225C5.28331 0.522894 5.3353 0.585256 5.36966 0.630317L8.31371 4.4917C8.5106 4.74994 8.46087 5.11889 8.20263 5.31578Z" fill="#3C4242"/>
        </svg>
      </button>

      <button class="product-slider-button-next bg-green-700 rotate-180 h-[21px] w-[21px] rounded-full flex items-center justify-center">
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.20263 5.31578C7.94439 5.51267 7.57544 5.46294 7.37855 5.2047L4.44462 1.35659C4.37158 1.30823 4.26493 1.30823 4.19188 1.35659L1.25795 5.2047C1.06107 5.46294 0.692114 5.51267 0.433878 5.31578C0.175641 5.11889 0.125909 4.74994 0.322797 4.4917L3.26685 0.630317C3.30121 0.585256 3.3532 0.522894 3.42521 0.463225C3.93831 0.0380759 4.6982 0.0380759 5.2113 0.463225C5.28331 0.522894 5.3353 0.585256 5.36966 0.630317L8.31371 4.4917C8.5106 4.74994 8.46087 5.11889 8.20263 5.31578Z" fill="#fff"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mySwiper {
  .swiper-slide {
    padding: 4px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 12px;
  }

  .swiper-slide img {
    @apply rounded-[8px];
  }

  .swiper-slide-thumb-active {
    border: 1px solid #3C4242;
  }
}



body {
  //background: #000;
  //color: #000;
}

.swiper {
  width: 100%;
  //margin-left: auto;
  //margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  //height: 80%;
  //width: 100%;
}

.mySwiper {
  height: 100%;
  //height: 20%;
  //box-sizing: border-box;
  //padding: 10px 0;
}

.mySwiper .swiper-slide {
  //width: 25%;
  //height: 100%;
  //opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  //opacity: 1;
}

.swiper-slide img {
  //display: block;
  //width: 100%;
  //height: 100%;
  //object-fit: cover;
}
</style>