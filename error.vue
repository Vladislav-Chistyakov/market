<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})

</script>

<template>
  <NuxtLayout>
    <template #main>
      <PagesError v-if="error.statusCode === 404" />
      <div v-else>Error code {{ error.statusCode }} </div>
    </template>
  </NuxtLayout>
</template>

<style scoped></style>