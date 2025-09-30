<script setup lang="ts">
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import { useCartStore } from '~/store/cart'
import type { Ref } from 'vue'

const { getProductId } = useFirebaseFunctions()
const cartStore = useCartStore()
const route = useRoute()

const product: any = ref(null)
const pending = ref(false)

try {
  pending.value = true
  product.value = await getProductId(String(route.params.id))
} catch (err) {
  console.error(err)
} finally {
  pending.value = false
}

type Form = {
  size: null | string
  color: null | string
}
const form: Ref<Form> = ref({
  size: null,
  color: null,
})

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

function activeSizeButton(size: string) {
  form.value.size === size ? (form.value.size = null) : (form.value.size = size)
}

function activeColorButton(color: string) {
  form.value.color === color ?
    (form.value.color = null)
  : (form.value.color = color)
}

async function addProductToCart() {
  pending.value = true
  if (userAuthorizationCheck()) {
    if (form.value.size && form.value.color) {
      await cartStore
        .addProductToCart(
          product.value.id,
          form.value.color,
          form.value.size,
          Number(product.value.price),
        )
        .catch((err: any) => {
          console.error('Error adding product to cart: ', err)
        })
        .finally(() => {
          form.value.size = null
          form.value.color = null
        })
    } else {
      alert('Заполните данные для выбора товара')
    }
  }

  pending.value = false
}

const productInformation = computed(() => {
  if (product.value.information && product.value.information.length) {
    const chunkSize = 3
    const result: { label: string; value: string }[][] = []

    for (let i = 0; i < product.value.information.length; i += chunkSize) {
      result.push(product.value.information.slice(i, i + chunkSize))
    }

    return result
  }
  return []
})
</script>

<template>
  <div class="pb-8 lg:pb-20">
    <div
      class="grid lg:grid-cols-2 lg:max-w-[1024px] xl:max-w-[1440px] lg:mx-auto mb-[100px]"
    >
      <div
        class="container bg-gray-50 pr-0 grid grid-cols-[auto_1fr] items-center"
      >
        <PagesProductSlider :images="images" />
      </div>

      <div class="container pt-10 xl:pl-[74px] xl:pt-[87px]">
        <p class="text-[12px] font-semibold mb-[12px]">
          This website is a non-commercial student project. All product images
          belong to Lamoda or their respective brands. Used for educational and
          demonstration purposes only.
        </p>

        <h2
          v-if="product && product.name"
          class="font-core-sans-c font-semibold text-[34px] leading-[40px] text-black mb-6"
        >
          {{ product.name }}
        </h2>

        <div class="mb-[34px]">
          <p
            class="font-causten font-semibold text-[18px] leading-[18px] text-black mb-6"
          >
            Select size
          </p>

          <ul v-if="sizes.length" class="flex items-center gap-6">
            <li v-for="(size, indexSize) in sizes" :key="indexSize">
              <button
                @click="activeSizeButton(size)"
                :disabled="pending"
                :class="{
                  'shadow-[0_0_21px_-1px_rgba(34,60,80,0.6)]':
                    form.size === size,
                }"
                class="flex justify-center items-center h-[38px] w-[38px] rounded-[12px] border-gray-border border text-black font-causten font-medium text-[14px] leading-[14px]"
              >
                {{ size }}
              </button>
            </li>
          </ul>
        </div>

        <div v-if="colors.length" class="mb-[34px]">
          <p
            class="font-causten font-semibold text-[18px] leading-[18px] text-black mb-6"
          >
            Colours Available
          </p>

          <ul class="flex gap-[16px] items-center">
            <li v-for="(color, indexColor) in colors" :key="indexColor">
              <button
                v-if="color === 'white'"
                @click="activeColorButton(color)"
                :disabled="pending"
                :class="{
                  'shadow-[0_0_21px_-1px_rgba(34,60,80,0.6)]':
                    form.color === color,
                }"
                class="flex w-fit p-[3px] border border-black rounded-full shadow-md"
              >
                <span
                  class="block h-[22px] w-[22px] border border-black rounded-full"
                />
              </button>

              <button
                v-else
                @click="activeColorButton(color)"
                :disabled="pending"
                class="flex w-fit p-[3px] border rounded-full"
                :class="{
                  'shadow-[0_0_21px_-1px_rgba(34,60,80,0.6)]':
                    form.color === color,
                }"
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

        <div class="flex items-center gap-4 lg:gap-6 mb-[35px]">
          <client-only>
            <button
              @click.prevent="addProductToCart"
              :disabled="
                !form.size || !form.color || cartStore.pendingCart || pending
              "
              class="px-6 lg:px-10 py-[13px] flex items-center gap-[12px] bg-purple rounded border border-purple disabled:opacity-40"
            >
              <img
                src="@/assets/images/pages/product/basket.svg"
                alt="basket"
              />

              <span
                class="block font-causten font-semibold text-white text-[18px] leading-[18px]"
              >
                {{ cartStore.pendingCart ? 'Loading...' : 'Add to cart' }}
              </span>
            </button>

            <div
              v-if="product && product.price"
              class="px-[39px] py-[13px] text-black font-causten font-bold text-[18px] leading-[18px] rounded border border-black"
            >
              ${{ product.price }}
            </div>
          </client-only>
        </div>

        <hr class="border-gray-border mb-[35px]" />

        <ul
          class="grid grid-rows-1 sm:grid-cols-2 sm:gap-x-5 lg:gap-x-[68px] gap-y-5"
        >
          <li class="flex items-center gap-[15px]">
            <div
              class="flex justify-center items-center h-11 w-11 rounded-full bg-gray-50"
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
              class="flex justify-center items-center h-11 w-11 rounded-full bg-gray-50"
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
              class="flex justify-center items-center h-11 w-11 rounded-full bg-gray-50"
            >
              <img src="@/assets/images/pages/product/truck.svg" alt="basket" />
            </div>

            <p class="font-causten font-medium text-[18px] leading-[18px]">
              Free shipping
            </p>
          </li>

          <li class="flex items-center gap-[15px]">
            <div
              class="flex justify-center items-center h-11 w-11 rounded-full bg-gray-50"
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
        <div class="md:max-w-[620px]">
          <p
            v-if="product && product.description"
            class="font-causten text-[16px] leading-6 text-gray-600 font-normal mb-8"
          >
            {{ product.description }}
          </p>

          <div
            class="w-full md:w-fit bg-[#FAFAFA] py-1 rounded-lg overflow-hidden"
          >
            <table v-if="productInformation.length" class="w-full md:w-fit">
              <thead>
                <tr>
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(row, rowIndex) in productInformation"
                  :key="rowIndex"
                  :class="{
                    'border-b border-gray-250':
                      rowIndex !== productInformation.length - 1,
                  }"
                >
                  <td
                    v-for="(item, colIndex) in row"
                    :key="colIndex"
                    class="px-[14px] md:px-[50px]"
                    :class="[
                      colIndex !== row.length - 1 ?
                        'border-r border-gray-250'
                      : '',
                      rowIndex === 0 ? 'pt-2 md:pt-[17px]' : 'pt-3 md:pt-6',
                      rowIndex === productInformation.length - 1 ?
                        'pb-2 md:pb-[17px]'
                      : 'pb-3 md:pb-6',
                    ]"
                  >
                    <span
                      class="block text-gray-200 font-causten font-normal text-4 leading-4 mb-[12px]"
                    >
                      {{ item.label }}
                    </span>
                    <p
                      class="text-black font-causten font-medium text-4 leading-4"
                    >
                      {{ item.value }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
