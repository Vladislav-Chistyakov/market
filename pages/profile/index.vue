<script setup lang="ts">
import { useFirebaseFunctions } from '@/composables/useFirebaseFunctions'

const { getAllProducts } = useFirebaseFunctions()

const pending = ref(false)
const data = ref({})

const getProducts = async () => {
  try {
    pending.value = true
    data.value = await getAllProducts()
  } catch (err) {
    console.error('Ошибка получения списка:', err)
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="container">
    <div class="px-[40px] py-[100px]">
      <button @click="getProducts">Получить список товаров</button>
    </div>

    <div>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<style scoped></style>