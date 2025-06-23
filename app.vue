<script setup lang="ts">
import { navigateTo } from '#app/composables/router'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

onMounted(() => {
  const onAuthState = useFirebaseFunctions().onAuthUser
  // const { auth } = useFirebaseFunctions()
  onAuthState(() => {
    navigateTo('/authorization/sign-in')
  })
})
</script>

<template>
  <NuxtLayout />
</template>
