<script setup>
const fetchServer = async function () {
  await $fetch('/api/hello', { method: 'POST', body: { text: 'Text' } }).then(res => {
    console.log(res)
  })
}

</script>

<template>
  <div class="container xl:max-w-[1440px]">
    <h1 class="text-2xl font-bold mb-4 font-causten font-bold">🗨️ WebSocket Чат</h1>
    <h1 class="text-2xl font-bold mb-4 font-montserrat font-bold">🗨️ WebSocket Чат</h1>

    <div class="border p-3 rounded mb-3 h-60 overflow-y-auto bg-gray-100">
    </div>

    <div class="flex gap-2 flex-col-reverse">
      <button @click="fetchServer" class="font-causten bg-test">Server Api</button>
      <img src="@/assets/images/img.png">
    </div>
  </div>
</template>
