<script setup lang="ts">
import { useRoute } from '#vue-router'

const route = useRoute()
const isSignIn = computed(() => route.path.includes('sign-in'))
const isSignUp = computed(() => route.path.includes('sign-up'))
</script>

<template>
  <header
    class="container flex flex-row items-center border-b border-solid border-b-gray-border xl:max-w-[1440px] py-[14px] xl:py-[32px]"
  >
    <nuxt-link to="/">
      <picture>
        <img src="@/assets/images/header/logo.svg" alt="logo" />
      </picture>
    </nuxt-link>

    <label
      class="hidden xl:flex gap-[12px] item-center ml-[163px] min-w-[184px] bg-gray-50 rounded-[8px] px-[48px] py-[12px]"
    >
      <img src="@/assets/images/header/search.svg" alt="search" />
      <input
        disabled
        type="text"
        class="outline-none placeholder-color-gray-200 max-w-[120px] bg-gray-50 rounded-[8px] font-causten font-medium text-[18px] leading-[22px] text-color-gray-200"
        placeholder="Search"
      />
    </label>

    <ul class="ml-auto flex flex-row items-center gap-3">
      <li>
        <nuxt-link
          :to="'/authorization/sign-in'"
          :class="[
            isSignIn ?
              'bg-purple border-purple text-white'
            : 'bg-transparent text-purple border-black-100',
          ]"
          class="py-1 px-3 lg:py-3 lg:px-12 border rounded-[8px] leading-[22px] text-[18px] font-causten font-medium hover:bg-purple hover:border-purple hover:text-white"
        >
          Login
        </nuxt-link>
      </li>

      <li>
        <nuxt-link
          :to="'/authorization/sign-up'"
          :class="[
            isSignUp ?
              'bg-purple border-purple text-white'
            : 'bg-transparent text-purple border-black-100',
          ]"
          class="py-1 px-3 lg:py-3 lg:px-12 border rounded-[8px] leading-[22px] text-[18px] font-causten font-medium hover:bg-purple hover:border-purple hover:text-white"
        >
          Sign Up
        </nuxt-link>
      </li>
    </ul>
  </header>
</template>

<style scoped></style>
