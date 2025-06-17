<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { navigateTo } from '#app/composables/router'

const userStore = useUserStore()

onMounted(() => {
  const infoUser = JSON.parse(localStorage.getItem('user'))
  if (infoUser) {
    userStore.userData = infoUser
  } else {
    navigateTo('/authorization/sign-in')
  }
})
</script>

<template>
  <NuxtLayout />
</template>
