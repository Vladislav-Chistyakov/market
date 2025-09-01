<script setup lang="ts">
import { useProductsStore } from '~/store/products'

const productsStore = useProductsStore()

if (productsStore.productsAll.length === 0) {
  await productsStore.getProducts()
}
</script>

<template>
  <NuxtLayout />
</template>
