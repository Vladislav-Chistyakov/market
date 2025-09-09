<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 1000 },
  minValue: { type: Number, default: 0 },
  maxValue: { type: Number, default: 1000 },
  step: { type: Number, default: 10 },
})

const emit = defineEmits(['update:modelValue'])

// значения ползунков
const minValue = ref(props.minValue || props.min)
const maxValue = ref(props.maxValue || props.max)

const minValueProps = computed(() => props.minValue)
const maxValueProps = computed(() => props.maxValue)

function mouseupInputRange() {
  if (Number(minValue.value) > maxValue.value) {
    // чтобы не пересекались
    const tmp = minValue.value
    minValue.value = maxValue.value
    maxValue.value = tmp
  }
  emit('update:modelValue', [minValue.value, maxValue.value])
}

watch(minValueProps, (newValue) => {
  minValue.value = newValue
})

watch(maxValueProps, (newValue) => {
  maxValue.value = newValue
})
</script>

<template>
  <div class="w-full flex flex-col gap-[26px]">
    <!-- Слайдер -->
    <div class="relative h-[3px] bg-[#B3B1B2] rounded">
      <!-- Полоска между ползунками -->
      <div
        class="absolute h-[3px] bg-purple rounded"
        :style="{
          left: ((minValue - props.min) / (props.max - props.min)) * 100 + '%',
          right:
            100
            - ((maxValue - props.min) / (props.max - props.min)) * 100
            + '%',
        }"
      ></div>

      <!-- Левый ползунок -->
      <input
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        v-model.number="minValue"
        @mouseup="mouseupInputRange"
        class="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
      />

      <!-- Правый ползунок -->
      <input
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        v-model.number="maxValue"
        @mouseup="mouseupInputRange"
        class="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
      />
    </div>

    <!-- Вывод значений -->
    <div class="flex justify-between text-sm gap-[30px]">
      <div
        class="w-full bg-transparent border border-[#CBC9CA] rounded-lg pt-[6px] pb-[7px] px-1 text-center"
      >
        <span
          class="font-causten text-[14px] leading-5 text-[#3C4242] font-semibold"
        >
          ${{ minValue }}
        </span>
      </div>

      <div
        class="w-full bg-transparent border border-[#CBC9CA] rounded-lg pt-[6px] pb-[7px] px-1 text-center"
      >
        <span
          class="font-causten text-[14px] leading-5 text-[#3C4242] font-semibold"
        >
          ${{ maxValue }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Стилизация бегунков */
input[type='range']::-webkit-slider-thumb {
  position: relative;
  top: -3px;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #8a33fd;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}

input[type='range']::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #8a33fd;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}
</style>
