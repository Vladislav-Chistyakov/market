<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination, Scrollbar } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

const modules = [Pagination, Scrollbar]

type StarsStatus = Array<"full" | "half" | "outline">

const reviews = [
  {
    name: "Floyd Miles",
    srcImg: "/images/person-review/person-one.png",
    stars: 4.5,
    review: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
      enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est
      sit aliqua dolor
      do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.`,
  },
  {
    name: "Ronald Richards",
    srcImg: "/images/person-review/person-two.png",
    stars: 4,
    review: `ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
      Exercitation veniam consequat sunt nostrud amet.`,
  },
  {
    name: "Savannah Nguyen",
    srcImg: "/images/person-review/person-three.png",
    stars: 3.5,
    review: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
      enim velit mollit.
      Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor
      do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.`,
  },
  {
    name: "Floyd Miles",
    srcImg: "/images/person-review/person-one.png",
    stars: 4.5,
    review: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
      enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est
      sit aliqua dolor
      do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.`,
  },
  {
    name: "Ronald Richards",
    srcImg: "/images/person-review/person-two.png",
    stars: 4,
    review: `ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
      Exercitation veniam consequat sunt nostrud amet.`,
  },
]

function listStar(starsNumber: number): StarsStatus {
  let stars = starsNumber
  const starsStatus: StarsStatus = []
  for (let i = 5; i > 0; i--) {
    if (stars > 1) {
      starsStatus.push("full")
    } else if (stars > 0 && stars < 1) {
      starsStatus.push("half")
    } else {
      starsStatus.push("outline")
    }
    stars--
  }
  return starsStatus
}
</script>

<template>
  <div class="reviews container xl:max-w-[1440px]">
    <UniversalHeading title="Feedback" class="mb-[70px]" />

    <swiper
      class="h-fit"
      :slides-per-view="3"
      :space-between="30"
      :modules="modules"
      :pagination="{ clickable: true }"
      navigation
    >
      <swiper-slide
        v-for="(item, index) in reviews"
        :key="index"
        class="pb-[43px]"
      >
        <div
          class="h-full flex flex-col gap-[15px] p-[21px_22px_21px_21px] border-2 border-gray-border rounded-[10px]"
        >
          <div class="flex justify-between gap-2.5">
            <img :src="item.srcImg" height="58px" width="58px" />

            <ul class="flex flex-row items-center h-fit">
              <li
                v-for="(star, starIndex) in listStar(item.stars)"
                :key="starIndex"
              >
                <img
                  v-show="star === 'full'"
                  src="@/assets/images/pages/main/reviews/star_full.svg"
                  height="23.2px"
                  width="23.2px"
                />
                <img
                  v-show="star === 'half'"
                  src="@/assets/images/pages/main/reviews/star_half.svg"
                  height="23.2px"
                  width="23.2px"
                />
                <img
                  v-show="star === 'outline'"
                  src="@/assets/images/pages/main/reviews/star_outline.svg"
                  height="23.2px"
                  width="23.2px"
                />
              </li>
            </ul>
          </div>

          <b class="block font-core-sans-c font-medium text-[22px] text-black">
            {{ item.name }}
          </b>

          <p class="font-causten text-[14px] font-normal text-text-gray-100">
            {{ item.review }}
          </p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style>
.reviews {
  .swiper-slide {
    @apply h-auto;
  }

  .swiper-horizontal {
    .swiper-pagination-bullet {
      margin: 0 2px;
    }
  }

  .swiper-pagination-bullet {
    @apply bg-black;
    height: 8px;
    width: 8px;
  }
}
</style>
