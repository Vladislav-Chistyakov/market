<script setup lang="ts">
type Props = {
  title: string
  description?: string
}
defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col xl:grid xl:grid-cols-[695px_1fr] xl:pl-0 gap-[78px] container px-0 xl:max-w-[1440px]"
  >
    <section>
      <slot name="image" />
    </section>

    <section class="pt-[60px]">
      <div class="group">
        <h2
          v-if="title"
          class="font-core-sans-c font-semibold text-[34px] leading-[36px] mb-[50px] group-has-[p]:mb-[10px]"
        >
          {{ title }}
        </h2>

        <p
          v-if="description"
          class="font-roboto text-[16px] leading-5 font-normal text-gray-300-opacity-80"
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