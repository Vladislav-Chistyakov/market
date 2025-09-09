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

// Создание первоначальных значений для фильтра цены
const minPriceFilters = ref(
  Math.min(...props.list.map((item) => Number(item.price))) || 0,
)
const maxPriceFilters = ref(
  Math.max(...props.list.map((item) => Number(item.price))) || 0,
)

// Создаем фильтр по размеру
const allSizes = computed(() => {
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  // Собираем все размеры в один массив
  const sizes = props.list.flatMap((item) => item.size)

  // Приводим к верхнему регистру и убираем дубли
  const unique = [...new Set(sizes.map((s) => s.toUpperCase()))]

  // Сортируем в нужном порядке
  return unique.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
})

// Создаем фильтр по цвету
const allColors = computed(() => {
  // Собираем все цвета в один массив
  const colors = props.list.flatMap((item) => {
    return item.color
  })

  return [...new Set(colors.map((c) => c.toLowerCase()))]
})

// Создание фильтра по цене мин и макс
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

  router.replace({
    query: {
      ...route.query,
      colors: colors.value,
    },
  })

  runFilters()
}

// Смена размера в фильтрах
function changeSizesFilters(size: string) {
  sizes.value =
    sizes.value.includes(size) ?
      sizes.value.filter((c) => c !== size)
    : [...sizes.value, size]

  router.replace({
    query: {
      ...route.query,
      sizes: sizes.value,
    },
  })
  runFilters()
}

// Смена фильтра цены
function changeMinMaxPriceFilters(event: [number, number]) {
  minPrice.value = event[0]
  maxPrice.value = event[1]

  router.replace({
    query: {
      ...route.query,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
    },
  })
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

// фильтр по цене
function priceFilters(list: any[]) {
  return list.filter(
    (item) => item.price >= minPrice.value && item.price <= maxPrice.value,
  )
}

// фильтр по размеру
function sizeFilters(list: any[]) {
  return list.filter((item) => {
    if (Array.isArray(item.size)) {
      for (const sizeItem of item.size) {
        if (sizes.value.includes(sizeItem)) {
          return true
        }
      }
      return false
    }
  })
}

// фильтр по цвету
function colorFilters(list: any[]) {
  return list.filter((item) => {
    if (Array.isArray(item.color)) {
      for (const colorItem of item.color) {
        if (colors.value.includes(colorItem)) {
          return true
        }
      }
      return false
    }
  })
}

// Запуск фильтров
const runFilters = function () {
  // берем весь список продуктов
  let list = [...props.list]

  // фильтруем по цене
  list = priceFilters(list)

  // по цвету
  if (colors.value.length) {
    list = colorFilters(list)
  }

  // по размеру
  if (sizes.value.length) {
    list = sizeFilters(list)
  }

  // отправляем отфильтрованный массив родителю
  emit('change-filters', list)
}

onMounted(() => {
  if (props.list.length) {
    // Изначально смотрим есть ли уже фильтры в пути query
    writeFiltersFromQueryParams()
    // После этого запускаем фильтры (если есть в пути)
    if (
      route.query.colors
      || route.query.sizes
      || route.query.minPrice
      || route.query.maxPrice
    ) {
      runFilters()
    }
  }
})
</script>

<template>
  <div>
    <!-- Цена   -->
    <AccordionContainer title="Price">
      <template #default>
        <RangeInput
          @update:model-value="changeMinMaxPriceFilters"
          :min="minPriceFilters"
          :max="maxPriceFilters"
          :min-value="minPrice"
          :max-value="maxPrice"
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
