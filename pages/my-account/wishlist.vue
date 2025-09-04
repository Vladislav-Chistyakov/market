<script setup lang="ts">
import EmptyList from '~/components/pages/my-account/wishlist/EmptyList.vue'
import CompletedList from '~/components/pages/my-account/wishlist/CompletedList.vue'
import { useWishlistStore } from '~/store/wishlist'

const wishlistStore = useWishlistStore()

// Стор не всегда успевает загрузится, чтобы не показывать что список пуст
// При первой загрузке страницы пока стора еще нет, вывожу пустой див с фикс высотой
const pendingList = computed(() => {
  if (!wishlistStore.wishlistAlreadyReceived) {
    return true
  } else if (wishlistStore.wishlistAlreadyReceived) {
    return false
  }
  return true
})

// Если мы заходим на страницу, еще раз получаем список продуктов
// (проверка, вдруг добавили продукты на другой странице)
onMounted(async () => {
  await wishlistStore.getWishlistIdsUser()
})
</script>

<template>
  <NuxtLayout name="my-account">
    <template v-if="wishlistStore.countProductsWishlist">
      <CompletedList />
    </template>

    <template v-else-if="!pendingList && wishlistStore.countProductsWishlist === 0">
      <EmptyList />
    </template>

    <template v-else>
      <div class="min-h-[656px]" />
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
