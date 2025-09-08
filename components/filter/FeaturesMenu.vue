<script setup lang="ts">
import { useRoute } from '#vue-router'
import RangeInput from '~/components/universal/RangeInput.vue'
import AccordionContainer from '~/components/filter/AccordionContainer.vue'

type Props = {
  title: string
  list: any[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  list: () => [],
})

const route = useRoute()

const isGender = computed(() => route.params.gender)

const sizeOrder = ['xs', 's', 'm', 'l', 'xl', 'xxl']

const allSizes = computed(() => {
  // Собираем все размеры в один массив
  const sizes = props.list.flatMap((item) => item.size)

  // Приводим к верхнему регистру и убираем дубли
  const unique = [...new Set(sizes.map((s) => s.toUpperCase()))]

  // Сортируем в нужном порядке
  return unique.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
})

const allColors = computed(() => {
  // Собираем все цвета в один массив

  const colors = props.list.flatMap((item) => {
    console.log('item', item)
    return item.color
  })

  return [...new Set(colors.map((c) => c.toLowerCase()))]
})

const priceOptions = computed(() => {
  return {
    minPrice: Math.min(...props.list.map(item => Number(item.price))) || 0,
    maxPrice: Math.max(...props.list.map(item => Number(item.price))) || 0,
  }
})

const minPrice = ref(priceOptions.value.minPrice)
const maxPrice = ref(priceOptions.value.maxPrice)

onMounted(() => console.log('Компонент фильтров отрисован'))

onBeforeUnmount(() => console.log('КОМПОНЕНТ ФИЛЬТРОВ РАЗМОНТИРОВАН'))
</script>

<template>
  <div>
    <AccordionContainer title="Price">
      <template #default>
        <RangeInput @update:model-value="[minPrice, maxPrice] = $event" :min="priceOptions.minPrice" :max="priceOptions.maxPrice" :step="1" />
      </template>
    </AccordionContainer>

    <AccordionContainer title="Colors">
      <template #default>
        <ul class="grid grid-cols-4 gap-5 items-center">
          <li v-for="(color, indexColor) in allColors" :key="indexColor">
            <button class="w-full flex flex-col gap-2 items-center">
          <span
            class="h-[37px] w-full border rounded-xl"
            :style="{
              backgroundColor: color,
              borderColor: color === 'white' ? '#F4F1F1' : color,
            }"
          ></span>
              <span>
            {{ color }}
          </span>
            </button>
          </li>
        </ul>
      </template>
    </AccordionContainer>

    <AccordionContainer title="Size">
      <template #default>
        <ul class="grid grid-cols-3 gap-5 items-center">
          <li v-for="size in allSizes" :key="size">
            <button
              class="w-full bg-transparent border border-[#CBC9CA] rounded-lg pt-[6px] pb-[7px] px-1 text-center"
            >
          <span
            class="font-causten text-[14px] leading-4 text-[#3C4242] font-semibold"
          >{{ size }}</span
          >
            </button>
          </li>
        </ul>

      </template>
    </AccordionContainer>
  </div>
</template>

<style scoped></style>
