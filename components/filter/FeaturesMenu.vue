<script setup lang="ts">
import { useRoute, useRouter } from '#vue-router'
import RangeInput from '~/components/universal/RangeInput.vue'
import AccordionContainer from '~/components/filter/AccordionContainer.vue'
import type { Ref } from 'vue'

type Props = {
  title?: string
  list: any[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  list: () => [],
})

const emit = defineEmits(['change-filters'])

const router = useRouter()
const route = useRoute()
const isFiltersActive = ref(false)

const listFilters = ref(props.list)

const isGender = computed(() => route.params.gender)

const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

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
    return item.color
  })

  return [...new Set(colors.map((c) => c.toLowerCase()))]
})

// Вывод первоначальной минимальной и максимальной цены из списка товаров

const minPrice = ref(
  Math.min(...props.list.map((item) => Number(item.price))) || 0,
)
const maxPrice = ref(
  Math.max(...props.list.map((item) => Number(item.price))) || 0,
)
const sizes: Ref<string[]> = ref([])
const colors: Ref<string[]> = ref([])

// Смена цвета в фильтрах
function changeColorFilters(color: string) {
  colors.value =
    colors.value.includes(color) ?
      colors.value.filter((c) => c !== color)
    : [...colors.value, color]
  runFilters()
}

// Смена размера в фильтрах
function changeSizesFilters(size: string) {
  sizes.value =
    sizes.value.includes(size) ?
      sizes.value.filter((c) => c !== size)
    : [...sizes.value, size]
  runFilters()
}

// Смена фильтра цены
function changeMinMaxPriceFilters(event: [number, number]) {
  minPrice.value = event[0]
  maxPrice.value = event[1]
  runFilters()
}

// Запись фильтров из query params
function writeFiltersFromQueryParams() {
  // из цветов
  if (route.query.colors?.length) {
    if (Array.isArray(route.query.colors)) {
      colors.value = [...route.query.colors] as string[]
    } else {
      colors.value.push(route.query.colors)
    }
  }

  // из размеров
  if (route.query.sizes?.length) {
    if (Array.isArray(route.query.sizes)) {
      sizes.value = [...route.query.sizes] as string[]
    } else {
      sizes.value.push(route.query.sizes)
    }
  }

  // Запись минимальной цены
  if (Number(route.query.minPrice) >= 0) {
    minPrice.value = Number(route.query.minPrice)
  }

  // Запись максимальной цены
  if (Number(route.query.maxPrice) >= 0) {
    maxPrice.value = Number(route.query.maxPrice)
  }
}

const runFilters = function () {
  console.log('runFilters Запуск фильтров !!!!!')

  let list = [...props.list]
  list = list.filter(
    (item) => item.price >= minPrice.value && item.price <= maxPrice.value,
  )
  //
  // if (colors.value.length) {
  //   list = list.filter((item) => {
  //     if (Array.isArray(item.colors)) {
  //       for (const color of item.colors) {
  //         if (colors.value.includes(color)) {
  //           return true
  //         }
  //       }
  //       return false
  //     }
  //   })
  // }
  //
  // if (sizes.value.length) {
  //   list = list.filter((item) => {
  //     if (Array.isArray(item.sizes)) {
  //       for (const size of item.sizes) {
  //         if (sizes.value.includes(size)) {
  //           return true
  //         }
  //       }
  //       return false
  //     }
  //   })
  // }
  emit('change-filters', list)
}

const minPriceFilters = ref(
  Math.min(...props.list.map((item) => Number(item.price))) || 0,
)
const maxPriceFilters = ref(
  Math.max(...props.list.map((item) => Number(item.price))) || 0,
)

onMounted(() => {
  console.log('Компонент фильтров отрисован')
  if (route.query.filers) {
    console.log('Filters активны и есть в пути')
  } else {
    router.replace({
      query: {
        ...route.query,
        filters: 'active',
        sizes: ['S'],
        colors: ['blue'],
        minPrice: 0,
        maxPrice: 100,
      },
    })
    console.log('Фильтров нет, давай поставим фильтры')

    writeFiltersFromQueryParams()
    runFilters()
  }
})

onBeforeUnmount(() => console.log('КОМПОНЕНТ ФИЛЬТРОВ РАЗМОНТИРОВАН'))
</script>

<template>
  <div>
    <pre>
      minPrice - {{ minPrice }}
      maxPrice - {{ maxPrice }}
      {{ colors }}
      {{ sizes }}
    </pre>

    <!-- Цена   -->
    <AccordionContainer title="Price">
      <template #default>
        <RangeInput
          @update:model-value="changeMinMaxPriceFilters"
          :min="minPriceFilters"
          :max="maxPriceFilters"
          :step="1"
        />
      </template>
    </AccordionContainer>

    <!-- Цвета  -->
    <AccordionContainer title="Colors">
      <template #default>
        <ul class="grid grid-cols-4 gap-5 items-center">
          <li v-for="(color, indexColor) in allColors" :key="indexColor">
            <button
              @click="changeColorFilters(color)"
              class="w-full flex flex-col gap-2 items-center"
            >
              <span
                class="h-[37px] w-full border rounded-xl"
                :class="{ 'ring-2': colors.includes(color) }"
                :style="{
                  backgroundColor: color,
                  borderColor: color === 'white' ? '#F4F1F1' : color,
                }"
              />
              <span>
                {{ color }}
              </span>
            </button>
          </li>
        </ul>
      </template>
    </AccordionContainer>

    <!-- Размеры  -->
    <AccordionContainer title="Size" :border-bottom-active="false">
      <template #default>
        <ul class="grid grid-cols-3 gap-5 items-center">
          <li v-for="size in allSizes" :key="size">
            <button
              @click="changeSizesFilters(size)"
              class="w-full bg-transparent border border-[#CBC9CA] rounded-lg pt-[6px] pb-[7px] px-1 text-center"
              :class="{ 'ring-2': sizes.includes(size) }"
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
