<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <NuxtLayout>
    <template #main>
      <PagesError />
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
