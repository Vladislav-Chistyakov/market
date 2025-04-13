<script setup>
const fetchServer = async function () {
  await $fetch('/api/hello', { method: 'POST', body: { text: 'Text' } }).then(res => {
    console.log(res)
  })
}

</script>

<template>
  <div class="container xl:max-w-[1440px]" />
</template>
