<script setup lang="ts">
type Props = {
  title: string
  list: any[]
}

withDefaults(defineProps<Props>(), {
  title: '',
  list: () => [],
})
</script>

<template>
  <div class="container xl:max-w-[1440px]">
    <div class="flex justify-center md:block">
      <UniversalBaseHeading :title="title" class="mb-[68px]" />
    </div>

    <ul
      class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] xl:gap-[50px]"
    >
      <li
        v-for="(item, index) in list"
        :key="index"
        class="flex justify-center"
      >
        <nuxt-link
          target="_blank"
          :href="'/products/' + item.gender + '/' + item.category.toLowerCase()"
        >
          <div
            class="h-[393px] md:w-full lg:w-[270px] rounded-[10px] overflow-hidden mb-[15px]"
          >
            <img
              v-if="item.images && item.images[0]"
              :src="item.images[0]"
              :alt="item.name"
              class="object-right object-cover h-[inherit] md:w-full"
            />
          </div>

          <div class="flex justify-between gap-2.5">
            <div>
              <b
                class="block font-causten font-bold text-[18px] leading-[26px]text-color-black"
              >
                {{ item.category[0].toUpperCase() + item.category.slice(1) }}
              </b>

              <p class="font-causten text-[14px] font-medium leading-[26px]">
                Explore Now!
              </p>
            </div>

            <img
              src="@/assets/images/pages/main/products/arrow.svg"
              alt="arrow"
              class="h-fit pt-[15px]"
            />
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
