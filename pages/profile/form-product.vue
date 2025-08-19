<script setup lang="ts">
import { useFirebaseFunctions } from '@/composables/useFirebaseFunctions'
import type { Reactive } from 'vue'

const { addProduct } = useFirebaseFunctions()

const pending = ref(false)

const add = async () => {
  try {
    pending.value = true
    const id = await addProduct(form)
    console.log('Товар добавлен, ID:', id)
    resetForm()
  } catch (err) {
    console.error('Ошибка:', err)
  } finally {
    pending.value = false
  }
}

// 'Shirts'       // Рубашки / Футболки
// 'Pants'        // Брюки / Штаны
// 'Jackets'      // Куртки
// 'Shoes'        // Обувь
// 'Accessories'  // Аксессуары
type CategoryProducts =
  | 'T-shirts'
  | 'Jeans'
  | 'Hoodies'
  | 'Turtlenecks'
  | 'Printed-T-Shirts'
  | 'Shirts'
  | 'Pants'
  | 'Jackets'
  | 'Shoes'
  | 'Accessories'
  | ''
type Gender = 'male' | 'female' | 'unisex' | ''
type Color =
  | 'black'
  | 'white'
  | 'gray'
  | 'red'
  | 'blue'
  | 'green'
  | 'beige'
  | 'brown'
  | 'yellow'
  | 'navy'
  | ''

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | ''
type Information = { label: string; value: string }

type Form = {
  category: CategoryProducts
  createdAt: string
  images: string[]
  name: string
  brand: string
  description: string
  price: number
  gender: Gender
  color: Color[]
  size: Size[]
  information: Information[]
}

const form: Reactive<Form> = reactive({
  category: 'Turtlenecks' as CategoryProducts,
  createdAt: '',
  images: ['', '', ''] as string[],
  name: 'Turtleneck',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  price: 0,
  brand: 'Gubaha Team T.',
  gender: 'male' as Gender,
  color: [] as Color[],
  size: [] as Size[],
  information: [
    { label: 'Fabric', value: 'Bio-washed Cotton' },
    { label: 'Pattern', value: 'Printed' },
    { label: 'Fit', value: 'Regular-fit' },
    { label: 'Neck', value: 'Round Neck' },
    { label: 'Sleeve', value: 'Half-sleeves' },
    { label: 'Style', value: 'Casual Wear' },
  ],
})

const resetForm = function () {
  form.createdAt = ''
  form.images = ['', '', '']
  form.price = 0
  form.color = []
  form.size = []
}
</script>

<template>
  <div>
    <div class="px-[40px] py-[100px]">
      <button @click="add">Добавить товар</button>
      <form @submit.prevent="add">
        <div class="mb-[20px]">
          <UniversalBaseInput
            :disabled="pending"
            type="text"
            placeholder="name"
            :value="form.name"
            @update:value="form.name = $event"
          />
        </div>

        <!--        <div class="mb-[20px]">-->
        <!--          <UniversalBaseInput-->
        <!--            :disabled="pending"-->
        <!--            type="text"-->
        <!--            placeholder="description"-->
        <!--            :value="form.description"-->
        <!--            @update:value="form.description = $event"-->
        <!--          />-->
        <!--        </div>-->

        <div class="mb-[20px]">
          <UniversalBaseInput
            :disabled="pending"
            type="text"
            placeholder="description"
            :value="form.brand"
            @update:value="form.brand = $event"
          />
        </div>

        <div class="mb-[20px]">
          <UniversalBaseInput
            :disabled="pending"
            type="number"
            placeholder="price"
            :value="form.price"
            @update:value="form.price = $event"
          />
        </div>

        <div class="mb-[20px]">
          <UniversalBaseInput
            :disabled="pending"
            type="text"
            placeholder="images[0]"
            :value="form.images[0]"
            @update:value="form.images[0] = $event"
          />
        </div>

        <div class="mb-[20px]">
          <UniversalBaseInput
            :disabled="pending"
            type="text"
            placeholder="images[1]"
            :value="form.images[1]"
            @update:value="form.images[1] = $event"
          />
        </div>

        <div class="mb-[20px]">
          <UniversalBaseInput
            :disabled="pending"
            type="text"
            placeholder="images[2]"
            :value="form.images[2]"
            @update:value="form.images[2] = $event"
          />
        </div>

        <!-- Категория -->
        <label class="mb-[20px] block">
          Category:
          <select v-model="form.category">
            <option value="">Выбери категорию</option>
            <option value="T-shirts">T-shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Hoodies">Hoodies</option>
            <option value="Turtlenecks">Turtlenecks</option>
            <option value="Printed-T-Shirts">Printed-T-Shirts</option>
            <!--            <option value="Shirts">Shirts</option>-->
            <!--            <option value="Pants">Pants</option>-->
            <!--            <option value="Jackets">Jackets</option>-->
          </select>
        </label>

        <!-- Пол -->
        <label class="mb-[20px] block">
          Gender:
          <select v-model="form.gender">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </label>

        <!-- Цвет -->
        <label class="mb-[20px] block">
          Color:
          <select
            v-model="form.color"
            multiple
            class="h-[100px] border p-2 rounded min-w-[200px]"
          >
            <option value="">Select color</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="gray">Gray</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="beige">Beige</option>
            <option value="brown">Brown</option>
            <option value="yellow">Yellow</option>
            <option value="navy">Navy</option>
          </select>
        </label>

        <!-- Размер -->
        <label class="mb-[20px] block">
          Size:
          <select
            v-model="form.size"
            multiple
            class="h-[100px] border p-2 rounded min-w-[200px]"
          >
            <option value="">Select size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </label>

        <div>
          <button class="px-2 py-1 bg-purple text-white">Добавить товар</button>
        </div>
      </form>
    </div>

    <div>
      <div class="grid grid-cols-3">
        <img :src="form.images[0]" :alt="form.name" height="100" />
        <img :src="form.images[1]" :alt="form.name" height="100" />
        <img :src="form.images[2]" :alt="form.name" height="100" />
      </div>

      <pre>
        {{ form }}
      </pre>
    </div>
  </div>
</template>

<style scoped></style>
