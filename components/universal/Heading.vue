<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h2 class="flex gap-[20px]">
    <span class="block bg-purple h-[30px] w-[6px] rounded-[10px] mb-[2px]" />

    <span class="block font-core-sans-c font-semibold text-[34px] text-black leading-[34px]">
      {{ title }}
    </span>
  </h2>
</template>

<style scoped>

</style>