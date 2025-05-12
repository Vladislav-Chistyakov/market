<script setup lang="ts">
const layoutCustomProps = useAttrs()

console.log(layoutCustomProps.title)
</script>

<template>
  <div
    class="grid grid-cols-[695px_1fr] gap-[78px] container pl-0 xl:max-w-[1440px]"
  >
    <section>
      <slot name="image" />
    </section>

    <section>
      <h2 v-if="layoutCustomProps.title">
        {{ layoutCustomProps.title }}
      </h2>

      <p v-if="layoutCustomProps.description">
        {{ layoutCustomProps.description }}
      </p>

      <div>
        <slot />
      </div>
    </section>
  </div>
</template>

<style scoped></style>
