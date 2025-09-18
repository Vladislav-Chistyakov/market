<script setup lang="ts">
type Props = {
  title: string
  description?: string
}
defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col gap-5 lg:grid lg:grid-cols-[480px_1fr] xl:grid-cols-[695px_1fr] xl:pl-0 xl:gap-[78px] container px-0 xl:max-w-[1440px]"
  >
    <section>
      <slot name="image" />
    </section>

    <section class="px-4 lg:pt-10 lg:pb-0 xl:pt-[60px]">
      <div class="group">
        <h2
          v-if="title"
          class="font-core-sans-c font-semibold text-[24px] leading-[26px] xl:text-[34px] xl:leading-[36px] xl:mb-[50px] group-has-[p]:mb-[10px]"
        >
          {{ title }}
        </h2>

        <p
          v-if="description"
          class="font-roboto text-[14px] xl:text-[16px] leading-5 font-normal text-gray-300-opacity-80"
        >
          {{ description }}
        </p>
      </div>

      <div>
        <slot />
      </div>
    </section>
  </div>
</template>

<style scoped></style>