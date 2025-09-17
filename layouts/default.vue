<script setup lang="ts"></script>

<template>
  <div>
    <Header />

    <main>
      <slot name="main">
        <NuxtPage />
      </slot>
    </main>

    <Footer />
  </div>
</template>

<style scoped></style>
