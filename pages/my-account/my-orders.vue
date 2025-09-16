<script setup lang="ts">
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

const ordersList = await useFirebaseFunctions().getOrders()
</script>

<template>
  <NuxtLayout name="my-account">
    <div class="font-causten text-black min-h-[656px]">
      <h1 class="mb-5 text-[29px] leading-5 font-semibold">My Orders</h1>

      <hr class="border-b border-[#F6F6F6] mb-5" />

      <ul
        v-for="(order, orderIndex) in ordersList"
        :key="orderIndex"
        class="flex flex-col gap-[30px]"
      >
        <li class="flex flex-col gap-[30px]">
          <div class="bg-[#F6F6F6] py-7 px-12 rounded-lg">
            <div class="mb-4">
              <span class="text-[#3C4242] text-xl font-semibold">
                Order id:
              </span>

              <b class="text-[#3C4242] text-[22px] font-semibold">
                {{ order.id }}
              </b>
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex flex-row items-center justify-between gap-5">
                <div class="flex gap-0.5 items-center">
                  <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">
                    Order Date :
                  </p>
                  <span
                    class="text-[#BEBCBD] text-[14px] leading-4 font-normal"
                  >
                    2 June 2023 2:40 PM
                  </span>
                </div>

                <div class="flex gap-0.5 items-center">
                  <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">
                    Order Status :
                  </p>
                  <span
                    class="text-[#BEBCBD] text-[14px] leading-4 font-normal"
                  >
                    Inprogress
                  </span>
                </div>
              </div>

              <div class="flex flex-row items-center justify-between gap-5">
                <div class="flex gap-0.5 items-center">
                  <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">
                    Estimated Delivery Date :
                  </p>
                  <span
                    class="text-[#BEBCBD] text-[14px] leading-4 font-normal"
                  >
                    8 June 2023
                  </span>
                </div>

                <div class="flex gap-0.5 items-center">
                  <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">
                    Payment Method :
                  </p>
                  <span
                    class="text-[#BEBCBD] text-[14px] leading-4 font-normal"
                  >
                    Cash on delivery
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ul class="flex flex-col gap-2">
            <li class="flex flex-col gap-[30px]">
              <div class="flex gap-6 items-center">
                <img
                  src="#"
                  alt="item.name"
                  class="block h-28 w-28 rounded-[4px] overflow-hidden"
                />

                <div class="flex flex-col">
                  <p class="mb-2.5 font-semibold text-[16px] leading-[18px]">
                    Black Printed T-shirt
                  </p>

                  <p
                    class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"
                  >
                    Color :
                    <span class="text-[#BEBCBD] font-semibold">Black</span>
                  </p>

                  <p
                    class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"
                  >
                    Qty :
                    <span class="text-[#BEBCBD] font-semibold">1</span>
                  </p>

                  <p class="text-[#807D7E] font-bold text-[14px] leading-4">
                    Total :
                    <span class="text-[#807D7E] font-semibold">$23.00</span>
                  </p>
                </div>
              </div>

              <hr class="border-b border-t-0 border-[#EDEEF2]" />
            </li>
            <li class="flex flex-col gap-[30px]">
              <div class="flex gap-6 items-center">
                <img
                  src="#"
                  alt="item.name"
                  class="block h-28 w-28 rounded-[4px] overflow-hidden"
                />

                <div class="flex flex-col">
                  <p class="mb-2.5 font-semibold text-[16px] leading-[18px]">
                    Black Printed T-shirt
                  </p>

                  <p
                    class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"
                  >
                    Color :
                    <span class="text-[#BEBCBD] font-semibold">Black</span>
                  </p>

                  <p
                    class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"
                  >
                    Qty :
                    <span class="text-[#BEBCBD] font-semibold">1</span>
                  </p>

                  <p class="text-[#807D7E] font-bold text-[14px] leading-4">
                    Total :
                    <span class="text-[#807D7E] font-semibold">$23.00</span>
                  </p>
                </div>
              </div>

              <hr class="border-b border-t-0 border-[#EDEEF2]" />
            </li>
          </ul>
        </li>
        <!--        <li class="flex flex-col gap-[30px]">-->
        <!--          <div class="bg-[#F6F6F6] py-7 px-12 rounded-lg">-->
        <!--            <div class="mb-4">-->
        <!--              <span class="text-[#3C4242] text-xl font-semibold">-->
        <!--                Order no:-->
        <!--              </span>-->

        <!--              <b class="text-[#3C4242] text-[22px] font-semibold">-->
        <!--                #123456789-->
        <!--              </b>-->
        <!--            </div>-->

        <!--            <div class="flex flex-col gap-2">-->
        <!--              <div class="flex flex-row items-center justify-between gap-5">-->
        <!--                <div class="flex gap-0.5 items-center">-->
        <!--                  <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">-->
        <!--                    Order Date :-->
        <!--                  </p>-->
        <!--                  <span-->
        <!--                    class="text-[#BEBCBD] text-[14px] leading-4 font-normal"-->
        <!--                  >-->
        <!--                    2 June 2023 2:40 PM-->
        <!--                  </span>-->
        <!--                </div>-->

        <!--                <div class="flex gap-0.5 items-center">-->
        <!--                  <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">-->
        <!--                    Order Status :-->
        <!--                  </p>-->
        <!--                  <span-->
        <!--                    class="text-[#BEBCBD] text-[14px] leading-4 font-normal"-->
        <!--                  >-->
        <!--                    Inprogress-->
        <!--                  </span>-->
        <!--                </div>-->
        <!--              </div>-->

        <!--              <div class="flex flex-row items-center justify-between gap-5">-->
        <!--                <div class="flex gap-0.5 items-center">-->
        <!--                  <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">-->
        <!--                    Estimated Delivery Date :-->
        <!--                  </p>-->
        <!--                  <span-->
        <!--                    class="text-[#BEBCBD] text-[14px] leading-4 font-normal"-->
        <!--                  >-->
        <!--                    8 June 2023-->
        <!--                  </span>-->
        <!--                </div>-->

        <!--                <div class="flex gap-0.5 items-center">-->
        <!--                  <p class="text-[#807D7E] text-[14px] leading-4 font-semibold">-->
        <!--                    Payment Method :-->
        <!--                  </p>-->
        <!--                  <span-->
        <!--                    class="text-[#BEBCBD] text-[14px] leading-4 font-normal"-->
        <!--                  >-->
        <!--                    Cash on delivery-->
        <!--                  </span>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->

        <!--          <ul class="flex flex-col gap-2">-->
        <!--            <li class="flex flex-col gap-[30px]">-->
        <!--              <div class="flex gap-6 items-center">-->
        <!--                <img-->
        <!--                  src="#"-->
        <!--                  alt="item.name"-->
        <!--                  class="block h-28 w-28 rounded-[4px] overflow-hidden"-->
        <!--                />-->

        <!--                <div class="flex flex-col">-->
        <!--                  <p class="mb-2.5 font-semibold text-[16px] leading-[18px]">-->
        <!--                    Black Printed T-shirt-->
        <!--                  </p>-->

        <!--                  <p-->
        <!--                    class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"-->
        <!--                  >-->
        <!--                    Color :-->
        <!--                    <span class="text-[#BEBCBD] font-semibold">Black</span>-->
        <!--                  </p>-->

        <!--                  <p-->
        <!--                    class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"-->
        <!--                  >-->
        <!--                    Qty :-->
        <!--                    <span class="text-[#BEBCBD] font-semibold">1</span>-->
        <!--                  </p>-->

        <!--                  <p class="text-[#807D7E] font-bold text-[14px] leading-4">-->
        <!--                    Total :-->
        <!--                    <span class="text-[#807D7E] font-semibold">$23.00</span>-->
        <!--                  </p>-->
        <!--                </div>-->
        <!--              </div>-->

        <!--              <hr class="border-b border-t-0 border-[#EDEEF2]" />-->
        <!--            </li>-->
        <!--            <li class="flex flex-col gap-[30px]">-->
        <!--              <div class="flex gap-6 items-center">-->
        <!--                <img-->
        <!--                  src="#"-->
        <!--                  alt="item.name"-->
        <!--                  class="block h-28 w-28 rounded-[4px] overflow-hidden"-->
        <!--                />-->

        <!--                <div class="flex flex-col">-->
        <!--                  <p class="mb-2.5 font-semibold text-[16px] leading-[18px]">-->
        <!--                    Black Printed T-shirt-->
        <!--                  </p>-->

        <!--                  <p-->
        <!--                    class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"-->
        <!--                  >-->
        <!--                    Color :-->
        <!--                    <span class="text-[#BEBCBD] font-semibold">Black</span>-->
        <!--                  </p>-->

        <!--                  <p-->
        <!--                    class="mb-[5px] text-[#3C4242] font-bold text-[14px] leading-4 flex gap-[2px] text-nowrap"-->
        <!--                  >-->
        <!--                    Qty :-->
        <!--                    <span class="text-[#BEBCBD] font-semibold">1</span>-->
        <!--                  </p>-->

        <!--                  <p class="text-[#807D7E] font-bold text-[14px] leading-4">-->
        <!--                    Total :-->
        <!--                    <span class="text-[#807D7E] font-semibold">$23.00</span>-->
        <!--                  </p>-->
        <!--                </div>-->
        <!--              </div>-->

        <!--              <hr class="border-b border-t-0 border-[#EDEEF2]" />-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--        </li>-->
      </ul>
    </div>
  </NuxtLayout>
</template>
