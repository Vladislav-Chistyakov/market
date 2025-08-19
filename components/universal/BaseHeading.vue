<script setup lang="ts">
type Props = {
  title?: string
  decoration?: boolean,
  small?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Title',
  decoration: true,
  small: false,
})
</script>

<template>
  <h2
    class="flex"
    :class="[small ? 'gap-[15px]' : 'gap-[20px]']"
  >
    <span
      v-if="decoration"
      class="relative block bg-purple w-[6px] rounded-[10px] "
      :class="[small ? 'bottom-[2px] h-[28px]' : 'h-[30px] mb-[2px]']"
    />

    <span
      class="block font-core-sans-c font-semibold  text-black"
      :class="[small ? 'text-[28px] leading-[28px]' : 'text-[34px] leading-[34px]']"
    >
      {{ title }}
    </span>
  </h2>
</template>

<style scoped></style>