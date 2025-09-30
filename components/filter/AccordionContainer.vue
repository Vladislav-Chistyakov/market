<script setup lang="ts">
type Props = {
  title: string
  borderBottomActive?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  borderBottomActive: true,
})

const openAccordion = ref(true)
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between gap-[14px] p-[20px_30px_30px_30px] border-b border-gray font-semibold"
    >
      <b class="text-[22px] leading-[26px] text-gray-200">{{ title }}</b>

      <button
        @click="openAccordion = !openAccordion"
        class="flex h-full w-fit transition-transform"
        :class="[openAccordion ? 'rotate-0' : 'rotate-180']"
        aria-label="arrow"
      >
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1079 6L7.42391 1.26218C7.07831 0.912608 6.51798 0.912608 6.17239 1.26218L1.4884 6"
            stroke="#807D7E"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <div
      class="px-[16px] xl:px-[36px]"
      :class="{ 'border-b border-gray': openAccordion && borderBottomActive }"
    >
      <Transition>
        <div v-if="openAccordion" class="py-10">
          <slot />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped></style>
