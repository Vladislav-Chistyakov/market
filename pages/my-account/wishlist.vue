<script setup lang="ts">
import EmptyList from '~/components/pages/my-account/wishlist/EmptyList.vue'
import CompletedList from '~/components/pages/my-account/wishlist/CompletedList.vue'
import { useWishlistStore } from '~/store/wishlist'

const wishlistStore = useWishlistStore()

const list = computed(() => wishlistStore.editedWishlistForPage)
</script>

<template>
  <NuxtLayout name="my-account">
<!--    <template v-if="list && list.length && !wishlistStore.pendingWishlist">-->
      <CompletedList />
<!--    </template>-->
<!---->
<!--    <template v-else-if="wishlistStore.pendingWishlist">-->
<!--      Loading...-->
<!--    </template>-->
<!---->
<!--    <template v-else>-->
<!--      <EmptyList />-->
<!--    </template>-->
  </NuxtLayout>
</template>

<style scoped></style>
