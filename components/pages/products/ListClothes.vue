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
    <client-only>
      <ul
        v-if="list"
        class="grid justify-center sm:grid-cols-2 2xl:grid-cols-[1fr_1fr_1fr] gap-[24px]"
      >
        <ItemClothes v-for="(item, index) in list" :key="index" :item="item" />
      </ul>

      <div v-else class="flex h-full items-center w-full">
        <p
          class="w-fulltext-color-black font-causten font-semibold text-[16px] leading-[18px] text-center"
        >
          Loading...
        </p>
      </div>
    </client-only>
  </div>
</template>

<style scoped></style>
