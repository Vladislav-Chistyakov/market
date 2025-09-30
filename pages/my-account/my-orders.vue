<script setup lang="ts">
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import type { Ref } from 'vue'

const ordersList: Ref<any[]> = ref([])
onMounted(async () => {
  ordersList.value = await useFirebaseFunctions().getOrders()
})
</script>

<template>
  <NuxtLayout name="my-account">
    <div class="font-caustentext-color-black min-h-[656px]">
      <h1 class="mb-5 text-[29px] leading-5 font-semibold">My Orders</h1>

      <hr class="border-b border-[#F6F6F6] mb-5" />

      <client-only>
        <template v-if="ordersList && ordersList.length > 0">
          <ul class="flex flex-col gap-[30px]">
            <PagesMyAccountOrdersItem
              v-for="(order, orderIndex) in ordersList"
              :key="orderIndex"
              :item="order"
            />
          </ul>
        </template>
      </client-only>
    </div>
  </NuxtLayout>
</template>
