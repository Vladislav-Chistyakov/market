<script setup lang="ts">
import { useProductsStore } from '~/store/products'

const { getProduct } = useProductsStore()
const route = useRoute()
console.log('загружена страница')
const product = getProduct(route.params.id)
</script>

<template>
  <div>
    <div
      class="grid grid-cols-2 lg:max-w-[1024px] xl:max-w-[1440px] lg:mx-auto mb-[100px]"
    >
      <div
        class="container bg-[#F6F6F6] pr-0 grid grid-cols-[auto_1fr] items-center"
      >
        <!--        <div class="block flex justify-center">-->
        <!--          <PagesProductSlider />-->
        <!--        </div>-->

        <!--        <img-->
        <!--            class="flex"-->
        <!--            src="@/assets/images/pages/product/product-one.jpeg"-->
        <!--            alt="product"-->
        <!--        >-->
        <PagesProductSlider />
      </div>

      <div class="container pl-[74px] pt-[87px]">
        <div>#{{ product }}@</div>
        <p class="text-[12px] font-semibold mb-[12px]">
          This website is a non-commercial student project. All product images
          belong to Lamoda or their respective brands. Used for educational and
          demonstration purposes only.
        </p>

        <h2
          class="font-core-sans-c font-semibold text-[34px] leading-[40px] text-black mb-[24px]"
        >
          Raven Hoodie With Black colored Design
        </h2>

        <div class="mb-[34px]">
          <p
            class="font-causten font-semibold text-[18px] leading-[18px] text-black mb-[24px]"
          >
            Select size
          </p>

          <ul class="flex items-center gap-6">
            <li
              class="flex justify-center items-center h-[38px] w-[38px] rounded-[12px] border-gray-border border text-black font-causten font-medium text-[14px] leading-[14px]"
            >
              xs
            </li>

            <li
              class="flex justify-center items-center h-[38px] w-[38px] rounded-[12px] border-gray-border border text-black font-causten font-medium text-[14px] leading-[14px]"
            >
              s
            </li>

            <li
              class="flex justify-center items-center h-[38px] w-[38px] rounded-[12px] border-gray-border border text-black font-causten font-medium text-[14px] leading-[14px]"
            >
              m
            </li>
          </ul>
        </div>

        <div class="mb-[34px]">
          <p
            class="font-causten font-semibold text-[18px] leading-[18px] text-black mb-[24px]"
          >
            Colours Available
          </p>

          <ul class="flex gap-[16px] items-center">
            <li class="flex w-fit p-[3px] border border-red rounded-full">
              <span class="block h-[22px] w-[22px] bg-red rounded-full" />
            </li>

            <li class="flex w-fit p-[3px] border border-green-700 rounded-full">
              <span class="block h-[22px] w-[22px] bg-green-700 rounded-full" />
            </li>

            <li class="flex w-fit p-[3px] border border-blue-800 rounded-full">
              <span class="block h-[22px] w-[22px] bg-blue-800 rounded-full" />
            </li>
          </ul>
        </div>

        <div class="flex items-center gap-[25px] mb-[35px]">
          <button
            class="px-[39px] py-[13px] flex items-center gap-[12px] bg-purple rounded border border-purple"
          >
            <img src="@/assets/images/pages/product/basket.svg" alt="basket" />

            <span
              class="block font-causten font-semibold text-white text-[18px] leading-[18px]"
              >Add to cart</span
            >
          </button>

          <button
            class="px-[39px] py-[13px] text-black font-causten font-bold text-[18px] leading-[18px] rounded border border-black"
          >
            $63.00
          </button>
        </div>

        <hr class="border-gray-border mb-[35px]" />

        <ul class="grid grid-cols-2 gap-x-[68px] gap-y-[20px]">
          <li class="flex items-center gap-[15px]">
            <div
              class="flex justify-center items-center h-11 w-11 rounded-full bg-text-gray-50"
            >
              <img
                src="@/assets/images/pages/product/credit-card.svg"
                alt="basket"
              />
            </div>

            <p class="font-causten font-medium text-[18px] leading-[18px]">
              Secure payment
            </p>
          </li>

          <li class="flex items-center gap-[15px]">
            <div
              class="flex justify-center items-center h-11 w-11 rounded-full bg-text-gray-50"
            >
              <img
                src="@/assets/images/pages/product/Size-&-Fit.svg"
                alt="basket"
              />
            </div>

            <p class="font-causten font-medium text-[18px] leading-[18px]">
              Size & Fit
            </p>
          </li>

          <li class="flex items-center gap-[15px]">
            <div
              class="flex justify-center items-center h-11 w-11 rounded-full bg-text-gray-50"
            >
              <img src="@/assets/images/pages/product/truck.svg" alt="basket" />
            </div>

            <p class="font-causten font-medium text-[18px] leading-[18px]">
              Free shipping
            </p>
          </li>

          <li class="flex items-center gap-[15px]">
            <div
              class="flex justify-center items-center h-11 w-11 rounded-full bg-text-gray-50"
            >
              <img
                src="@/assets/images/pages/product/Free-Shipping-&-Returns.svg"
                alt="basket"
              />
            </div>

            <p class="font-causten font-medium text-[18px] leading-[18px]">
              Free Shipping & Returns
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="container">
      <UniversalBaseHeading title="Product Description" class="mb-[30px]" />

      <div>
        <div>
          <p>
            100% Bio-washed Cotton – makes the fabric extra soft & silky.
            Flexible ribbed crew neck. Precisely stitched with no pilling & no
            fading. Provide all-time comfort. Anytime, anywhere. Infinite range
            of matte-finish HD prints.
          </p>

          <table>
            <thead>
              <tr>
                <th />
                <th />
                <th />
              </tr>
            </thead>

            <tbody>
              <tr>
                <td class="">
                  <span
                    class="block text-text-gray-200 font-causten font-normal text-4 leading-4 mb-[12px]"
                  >
                    Fabric
                  </span>

                  <p
                    class="text-black font-causten font-medium text-4 leading-4"
                  >
                    Bio-washed Cotton
                  </p>
                </td>

                <td class="">
                  <span
                    class="block text-text-gray-200 font-causten font-normal text-4 leading-4 mb-[12px]"
                  >
                    Pattern
                  </span>

                  <p
                    class="text-black font-causten font-medium text-4 leading-4"
                  >
                    Printed
                  </p>
                </td>

                <td class="">
                  <span
                    class="block text-text-gray-200 font-causten font-normal text-4 leading-4 mb-[12px]"
                  >
                    Fit
                  </span>

                  <p
                    class="text-black font-causten font-medium text-4 leading-4"
                  >
                    Regular-fit
                  </p>
                </td>
              </tr>

              <tr>
                <td class="">
                  <span
                    class="block text-text-gray-200 font-causten font-normal text-4 leading-4 mb-[12px]"
                  >
                    Neck
                  </span>

                  <p
                    class="text-black font-causten font-medium text-4 leading-4"
                  >
                    Round Neck
                  </p>
                </td>

                <td class="">
                  <span
                    class="block text-text-gray-200 font-causten font-normal text-4 leading-4 mb-[12px]"
                  >
                    Sleeve
                  </span>

                  <p
                    class="text-black font-causten font-medium text-4 leading-4"
                  >
                    Half-sleeves
                  </p>
                </td>

                <td class="">
                  <span
                    class="block text-text-gray-200 font-causten font-normal text-4 leading-4 mb-[12px]"
                  >
                    Style
                  </span>

                  <p
                    class="text-black font-causten font-medium text-4 leading-4"
                  >
                    Casual Wear
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>video</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
