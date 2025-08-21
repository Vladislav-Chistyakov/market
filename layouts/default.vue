<script setup lang="ts">
import { useRoute } from '#vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <Header />

    <main v-if="route.matched.length">
      <NuxtPage v-if="route.matched.length" />
    </main>

    <main v-else>
      <PagesError />
    </main>

    <Footer />
  </div>
</template>

<style scoped></style>