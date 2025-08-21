<script setup lang="ts">
import { useRoute } from '#vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <Header />

    <main>
      <slot name="main">
        <NuxtPage />
      </slot>
    </main>

    <Footer />
  </div>
</template>

<style scoped></style>