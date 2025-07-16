<script setup lang="ts">
import { useFirebaseFunctions } from '@/composables/useFirebaseFunctions'

const { getAllProducts, getProductId } = useFirebaseFunctions()

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

const getProduct = async (id: string) => {
  try {
    pending.value = true
    data.value = await getProductId(id)
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
      <button @click="getProduct('0BGmfERh6PpmEDrSXrI6')">
        Получить список товаров
      </button>
    </div>

    <div>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<style scoped></style>
