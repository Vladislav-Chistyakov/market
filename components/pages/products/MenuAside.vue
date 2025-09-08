<script setup lang="ts"></script>

<template>
  <aside class="border-x border-b border-menu-gray max-h-[1700px] ">
    <div
      class="flex items-center justify-between gap-[14px] p-[20px_30px_30px_30px] border-b border-menu-gray font-semibold"
    >
      <h2 class="text-[22px] leading-[26px] text-text-gray-200">Filter</h2>

      <img src="@/assets/images/pages/product/filter.svg" alt="filter icon" />
    </div>

    <client-only>
      <slot name="filters" />
    </client-only>
  </aside>
</template>

<style scoped></style>
