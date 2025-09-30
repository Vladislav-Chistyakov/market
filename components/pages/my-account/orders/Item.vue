<script setup lang="ts">
type Props = { item: any }
const props = withDefaults(defineProps<Props>(), {
  item: {},
})

const generateDate = computed(() => {
  const date = new Date(props.item.createdAt)
  const createdAt = date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const dateDelivery = new Date(props.item.createdAt)
  dateDelivery.setDate(dateDelivery.getDate() + 10)

  const day = dateDelivery.getDate()
  const month = dateDelivery.toLocaleString('en-US', { month: 'long' })
  const year = dateDelivery.getFullYear()
  return {
    createdAt,
    deliveryDate: `${day} ${month} ${year}`,
  }
})
</script>

<template>
  <li class="flex flex-col gap-[30px]">
    <div class="bg-[#F6F6F6] py-7 px-4 sm:px-12 rounded-lg">
      <div class="mb-4 flex justify-center gap-1 items-center sm:block">
        <span class="text-[#3C4242] text-[14px] lg:text-xl font-semibold">
          Order id:
        </span>

        <b class="text-[#3C4242] text-[16px] lg:text-[22px] font-semibold">
          {{ item.id }}
        </b>
      </div>

      <div class="flex flex-col gap-5 xl:gap-2">
        <div
          class="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-5"
        >
          <div class="flex flex-col sm:flex-row gap-0.5 items-center">
            <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">
              Order Date :
            </p>
            <span
              v-if="generateDate.createdAt"
              class="text-gray-500 text-[14px] leading-4 font-normal"
            >
              {{ generateDate.createdAt }}
            </span>
          </div>

          <div class="flex flex-col sm:flex-row gap-0.5 items-center">
            <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">
              Order Status :
            </p>
            <span class="text-gray-500 text-[14px] leading-4 font-normal">
              Inprogress
            </span>
          </div>
        </div>

        <div
          class="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-5"
        >
          <div class="flex flex-col sm:flex-row gap-0.5 items-center">
            <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">
              Estimated Delivery Date :
            </p>
            <span class="text-gray-500 text-[14px] leading-4 font-normal">
              {{ generateDate.deliveryDate }}
            </span>
          </div>

          <div class="flex flex-col sm:flex-row gap-0.5 items-center">
            <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">
              Payment Method :
            </p>
            <span class="text-gray-500 text-[14px] leading-4 font-normal">
              Cash on delivery
            </span>
          </div>
        </div>
      </div>
    </div>

    <ul v-if="item.products" class="flex flex-col gap-6">
      <li
        class="flex flex-col gap-[30px]"
        v-for="(product, productIndex) in item.products"
        :key="productIndex"
      >
        <div class="flex gap-6 items-center">
          <img
            v-if="product.imgSrc"
            :src="product.imgSrc"
            :alt="product.name || ''"
            class="block h-auto w-28 rounded-[4px] overflow-hidden"
          />

          <div class="flex flex-col">
            <p
              v-if="product.name"
              class="mb-2.5 font-semibold text-[16px] leading-[18px]"
            >
              {{ product.name }}
            </p>

            <p
              v-if="product.color"
              class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"
            >
              Color :
              <span class="text-gray-500 font-semibold">
                {{ product.color }}
              </span>
            </p>

            <p
              v-if="product.count"
              class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"
            >
              Qty :
              <span class="text-gray-500 font-semibold">{{
                product.count
              }}</span>
            </p>

            <p
              v-if="product.price"
              class="text-[#807D7E] font-bold text-[14px] leading-4"
            >
              Total :
              <span class="text-[#807D7E] font-semibold">
                ${{ product.price }}
              </span>
            </p>
          </div>
        </div>

        <hr class="border-b border-t-0 border-[#EDEEF2]" />
      </li>
    </ul>

    <p>
      Total order amount:
      <span class="text-[#807D7E] font-semibold"> ${{ item.totalPrice }} </span>
    </p>

    <hr class="border-b border-t-0 border-[#EDEEF2]" />
  </li>
</template>

<style scoped></style>
