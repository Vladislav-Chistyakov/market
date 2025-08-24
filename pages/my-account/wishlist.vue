<script setup lang="ts">
import EmptyList from '~/components/pages/my-account/wishlist/EmptyList.vue'
import CompletedList from '~/components/pages/my-account/wishlist/CompletedList.vue'
</script>

<template>
  <NuxtLayout name="my-account">
    <CompletedList />
    <!--      <EmptyList />-->
  </NuxtLayout>
</template>

<style scoped></style>
