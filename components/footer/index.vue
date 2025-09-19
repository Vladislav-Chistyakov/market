<script setup lang="ts">
</script>

<template>
  <footer class="bg-black py-6 md:py-9 lg:pt-[50px] lg:pb-[50px] xl:pt-[74px] xl:pb-[60px] xl:max-w-[1440px] mx-auto">
    <div
      class="container xl:max-w-[1220px] mb-[41px] flex flex-wrap md:gap-12 lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-[50px] xl:grid-rows-[auto_auto] xl:grid-cols-[auto_1fr] xl:gap-x-[80px] xl:gap-y-[10px]"
    >
      <!--  Блоки Help, Company, More Info      -->
      <ul class="w-full flex flex-wrap gap-8 sm:flex-row sm:justify-between sm:gap-4 lg:grid lg:grid-cols-3 lg:gap-[50px]">
        <li>
          <b
            class="block font-causten font-bold text-text-gray-50 text-[28px] leading-[32px] mb-[39px]"
          >
            Need Help
          </b>

          <ul class="flex flex-col gap-[22px]">
            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Contact Us
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Track Order
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Returns & Refunds
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              FAQ's
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Career
            </li>
          </ul>
        </li>

        <li>
          <b
            class="block font-causten font-bold text-text-gray-50 text-[28px] leading-[32px] mb-[39px]"
          >
            Company
          </b>

          <ul class="flex flex-col gap-[22px]">
            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              About Us
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              euphoria Blog
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              euphoriastan
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Collaboration
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Media
            </li>
          </ul>
        </li>

        <li>
          <b
            class="block font-causten font-bold text-text-gray-50 text-[28px] leading-[32px] mb-[39px]"
          >
            More Info
          </b>

          <ul class="flex flex-col gap-[22px]">
            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Term and Conditions
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Privacy Policy
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Shipping Policy
            </li>

            <li
              class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
            >
              Sitemap
            </li>
          </ul>
        </li>
      </ul>

      <!-- Блок Location      -->
      <div class="">
        <b
          class="block font-causten font-bold text-text-gray-50 text-[28px] leading-[32px] mb-[39px]"
        >
          Location
        </b>

        <ul class="flex flex-col gap-[22px]">
          <li
            class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
          >
            support@euphoria.in
          </li>

          <li
            class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
          >
            Eklingpura Chouraha, Ahmedabad Main Road
          </li>

          <li
            class="font-causten font-bold text-text-gray-50 text-[18px] leading-[22px]"
          >
            (NH 8- Near Mahadev Hotel) Udaipur, India- 313002
          </li>
        </ul>
      </div>

      <!-- Социальнаые сети     -->
      <ul class="w-full flex items-end md:flex-1 lg:flex-auto lg:w-fit md:items-end md:justify-end lg:items-end xl:items-center gap-[9px] lg:pl-[8px] lg:pb-[7px]">
        <li>
          <nuxt-link>
            <img src="@/assets/images/footer/social/fac.svg" alt="facebook" />
          </nuxt-link>
        </li>

        <li>
          <nuxt-link>
            <img src="@/assets/images/footer/social/inst.svg" alt="instagram" />
          </nuxt-link>
        </li>

        <li>
          <nuxt-link>
            <img src="@/assets/images/footer/social/tw.svg" alt="twitter" />
          </nuxt-link>
        </li>

        <li>
          <nuxt-link>
            <img src="@/assets/images/footer/social/in.svg" alt="link in" />
          </nuxt-link>
        </li>
      </ul>

      <!--  Блок скачать приложение через store  -->
      <div>
        <strong
          class="block mb-3 md:mb-5 lg:mb-6 xl:mb-9 font-causten font-bold text-text-gray-50 text-[28px] leading-8"
        >
          Download The App
        </strong>

        <ul class=" flex items-center gap-5 pl-1">
          <li class="flex">
            <button>
              <img
                src="@/assets/images/footer/google-play.svg"
                alt="google play"
              />
            </button>
          </li>

          <li class="flex">
            <button>
              <img src="@/assets/images/footer/app-store.svg" alt="app store" />
            </button>
          </li>
        </ul>
      </div>
    </div>

    <hr class="border-gray-border pb-[24px] xl:max-w-[1220px] mx-auto" />

    <div class="container xl:max-w-[1220px] pr-[62px]">
      <!--  Кнопка раскрытия аккардиона    -->
      <button
        disabled
        class="w-full flex flex-row justify-between items-center font-causten text-white text-center font-bold text-[28px] leading-[32px]"
      >
        <span> Popular Categories </span>

        <img src="@/assets/images/footer/arrow.svg" alt="arrow" />
      </button>
    </div>

    <hr class="border-gray-border mt-[28px] xl:max-w-[1220px] mx-auto" />

    <b
      class="block mt-6 container xl:max-w-[1220px] md:pt-[44px] font-causten text-white text-center font-bold text-[18px] leading-[22px]"
    >
      Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
    </b>
  </footer>
</template>

<style scoped></style>