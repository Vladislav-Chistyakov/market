<script setup lang="ts">
import EmptyList from '~/components/pages/my-account/wishlist/EmptyList.vue'
import CompletedList from '~/components/pages/my-account/wishlist/CompletedList.vue'
import { useWishlistStore } from '~/store/wishlist'

const wishlistStore = useWishlistStore()

const list = computed(() => wishlistStore.editedWishlistForPage)

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
    <template v-if="list && list.length">
      <CompletedList />
    </template>

    <template v-else-if="!pendingList && list && list.length === 0">
      <EmptyList />
    </template>

    <template v-else>
      <div class="min-h-[656px]" />
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
