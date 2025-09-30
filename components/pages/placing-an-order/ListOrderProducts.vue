<script setup lang="ts">
type Props = {
  list:
}
const props = defineProps()
</script>

<template>
  <ul class="flex flex-col gap-[15px] pt-[15px] mb-[15px]">
    <li
      v-for="(item, index) in arrayProductsOrder"
      :key="index"
      class="flex gap-[15px] items-center border-b border-[#EDEEF2] pb-[15px]"
    >
      <img
        v-if="item.imgSrc"
        :src="item.imgSrc"
        :alt="item.name"
        class="block h-[63px] w-[63px] rounded-[4px] overflow-hidden"
      />

      <div class="">
        <p
          v-if="item.name"
          class="mb-[5px] font-bold text-[14px] leading-[17px]"
        >
          {{ item.name }}
          <span v-if="item.count" class="text-gray-600">
            x {{ item.count }}
          </span>
        </p>

        <p v-if="item.color" class="font-bold text-[14px] leading-[17px]">
          Colour:
          <span class="text-gray-600 font-light">{{ item.color }}</span>
        </p>
      </div>

      <p
        v-if="item.price"
        class="ml-auto font-bold text-[14px] leading-[17px] text-gray-600"
      >
        ${{ Number(item.price).toFixed(2) }}
      </p>
    </li>
  </ul>
</template>

<style scoped></style>
