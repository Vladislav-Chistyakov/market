<script setup lang="ts">
import { useRoute } from '#vue-router'

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

onMounted(() => console.log('Компонент фильтров отрисован'))

onBeforeUnmount(() => console.log('КОМПОНЕНТ ФИЛЬТРОВ РАЗМОНТИРОВАН'))
</script>

<template>
  <div>
    <ul class="grid grid-cols-4 gap-5 items-center px-[35px]">
      <li v-for="(color, indexColor) in allColors" :key="indexColor">
        <button class="w-full flex flex-col gap-2 items-center">
          <div
            class="h-[37px] w-full border rounded-xl"
            :style="{
              backgroundColor: color,
              borderColor: color === 'white' ? '#F4F1F1' : color,
            }"
          ></div>
          <span>
            {{ color }}
          </span>
        </button>
      </li>
    </ul>

    <ul class="grid grid-cols-3 gap-5 items-center px-[35px]">
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
  </div>
</template>

<style scoped></style>
