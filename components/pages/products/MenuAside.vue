<script setup lang="ts"></script>

<template>
  <aside class="border-x border-gray-border max-h-fit">
    <div
      class="flex items-center justify-between gap-[14px] p-[20px_30px_30px_30px] border-b border-gray-border font-semibold"
    >
      <h2 class="text-[22px] leading-[26px] text-text-gray-200">Filter</h2>

      <img src="@/assets/images/pages/product/filter.svg" alt="filter icon" />
    </div>

    <client-only>
      <slot name="filter" />
    </client-only>

    <div class="border-b border-gray-border pb-[30px]">списко фильтров</div>
  </aside>
</template>

<style scoped></style>
