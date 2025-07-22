<script setup lang="ts">
import { useProductsStore } from '~/store/products'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

const productsStore = useProductsStore()
const { getProductId, addToCart } = useFirebaseFunctions()

const route = useRoute()

const product: any = ref(null)
const pending = ref(false)
const pendingAddToCart = ref(false)

try {
  pending.value = true
  product.value = await getProductId(String(route.params.id))
} catch (err) {
  console.error(err)
} finally {
  pending.value = false
}

const images = computed((): string[] => {
  if (product.value?.images && product.value?.images.length) {
    return product.value.images as string[]
  } else {
    return []
  }
})

const sizes = computed((): string[] => {
  if (product.value?.size && product.value?.size.length) {
    return product.value.size as string[]
  } else {
    return []
  }
})

const colors = computed((): string[] => {
  if (product.value?.color && product.value?.color.length) {
    return product.value.color as string[]
  } else {
    return []
  }
})

async function addCarts() {
  pendingAddToCart.value = true
  await addToCart(product.value.id, 'green')
    .catch((err) => {
      console.error('Error adding product to cart: ', err)
    })
    .finally(() => {
      pendingAddToCart.value = false
    })
}
</script>

<template>
  <div>
    <div
      class="grid grid-cols-2 lg:max-w-[1024px] xl:max-w-[1440px] lg:mx-auto mb-[100px]"
    >
      <div
        class="container bg-[#F6F6F6] pr-0 grid grid-cols-[auto_1fr] items-center"
      >
        <PagesProductSlider :images="images" />
      </div>

      <div class="container pl-[74px] pt-[87px]">
        <p class="text-[12px] font-semibold mb-[12px]">
          This website is a non-commercial student project. All product images
          belong to Lamoda or their respective brands. Used for educational and
          demonstration purposes only.
        </p>

        <h2
          v-if="product && product.name"
          class="font-core-sans-c font-semibold text-[34px] leading-[40px] text-black mb-[24px]"
        >
          {{ product.name }}
        </h2>

        <div class="mb-[34px]">
          <p
            class="font-causten font-semibold text-[18px] leading-[18px] text-black mb-[24px]"
          >
            Select size
          </p>

          <ul v-if="sizes.length" class="flex items-center gap-6">
            <li v-for="(size, indexSize) in sizes" :key="indexSize">
              <button
                class="flex justify-center items-center h-[38px] w-[38px] rounded-[12px] border-gray-border border text-black font-causten font-medium text-[14px] leading-[14px]"
              >
                {{ size }}
              </button>
            </li>
          </ul>
        </div>

        <div v-if="colors.length" class="mb-[34px]">
          <p
            class="font-causten font-semibold text-[18px] leading-[18px] text-black mb-[24px]"
          >
            Colours Available
          </p>

          <ul class="flex gap-[16px] items-center">
            <li v-for="(color, indexColor) in colors" :key="indexColor">
              <button
                v-if="color === 'white'"
                class="flex w-fit p-[3px] border border-black rounded-full"
              >
                <span
                  class="block h-[22px] w-[22px] border border-black rounded-full"
                />
              </button>

              <button
                v-else
                class="flex w-fit p-[3px] border rounded-full"
                :style="{ borderColor: color }"
              >
                <span
                  class="block h-[22px] w-[22px] rounded-full"
                  :style="{ backgroundColor: color }"
                />
              </button>
            </li>
          </ul>
        </div>

        <div class="flex items-center gap-[25px] mb-[35px]">
          <button
            @click.prevent="addCarts"
            :disabled="pendingAddToCart"
            class="px-[39px] py-[13px] flex items-center gap-[12px] bg-purple rounded border border-purple"
          >
            <img src="@/assets/images/pages/product/basket.svg" alt="basket" />

            <span
              v-show="!pendingAddToCart"
              class="block font-causten font-semibold text-white text-[18px] leading-[18px]"
            >
              Add to cart
            </span>

            <div v-show="pendingAddToCart">Loading...</div>
          </button>

          <button
            v-if="product && product.price"
            class="px-[39px] py-[13px] text-black font-causten font-bold text-[18px] leading-[18px] rounded border border-black"
          >
            ${{ product.price }}
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
          <p v-if="product && product.description">
            {{ product.description }}
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
