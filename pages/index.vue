<script setup>
const fetchServer = async function () {
  await $fetch('/api/hello', { method: 'POST', body: { text: 'Text' } }).then(res => {
    console.log(res)
  })
}

</script>

<template>
  <div>
    <PagesMainHero />

    <PagesMainPromotions class="mb-[72px]" />

    <PagesMainCompanyGoal class="mb-[80px]" />

    <PagesMainProducts class="mb-[94px]" />

    <PagesMainBrands class="mb-[134px]" />

    <PagesMainReviews class="mb-[68px]" />
  </div>
</template>
