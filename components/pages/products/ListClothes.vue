<script setup lang="ts">
import ItemClothes from '~/components/pages/products/ItemClothes.vue'

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
  <div class="mb-[30px]">
    <ul v-if="list" class="flex flex-wrap flex-row gap-[24px]">
      <ItemClothes v-for="(item, index) in list" :key="index" :item="item" />
    </ul>

    <div v-else class="flex h-full items-center w-full">
      <p
        class="w-full text-black font-causten font-semibold text-[16px] leading-[18px] text-center"
      >
        Loading...
      </p>
    </div>
  </div>
</template>

<style scoped></style>
