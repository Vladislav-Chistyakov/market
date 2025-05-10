<script setup lang="ts">
type Props = {
  title: string,
  decoration: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Title',
  decoration: true
})
</script>

<template>
  <h2 class="flex gap-[20px]">
    <span v-if="decoration" class="block bg-purple h-[30px] w-[6px] rounded-[10px] mb-[2px]" />

    <span class="block font-core-sans-c font-semibold text-[34px] text-black leading-[34px]">
      {{ title }}
    </span>
  </h2>
</template>

<style scoped>

</style>