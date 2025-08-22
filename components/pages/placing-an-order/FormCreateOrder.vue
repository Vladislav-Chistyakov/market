<script setup lang="ts">
import type { Reactive } from 'vue'

const pending = ref(false)

type Form = {
  name: string
}

const form: Reactive<Form> = reactive({
  name: 'Turtleneck',
})

const emit = defineEmits(['submit-form'])

const resetForm = function () {
  form.name = ''
}
</script>

<template>
  <div>
    <b class="block text-[24px] leading-[26px] font-bold text-black mb-[56px]">
      Billing Details
    </b>

    <form class="grid grid-cols-2 gap-x-[38px] gap-y-[29px]">
      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="First Name"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              First Name*
            </p>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Last Name"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Last Name*
            </p>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Country / Region"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Country / Region*
            </p>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Company (optional)"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Company Name
            </p>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="House number and street name"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Street Address*
            </p>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="apartment, suite, unit, etc. (optional)"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Apt, suite, unit
            </p>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Town / City"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              City*
            </p>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="State"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              State*
            </p>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Postal Code"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Postal Code*
            </p>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Phone"
          :value="form.name"
          style-input="gray"
          @update:value="form.name = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Phone*
            </p>
          </template>
        </UniversalBaseInput>
      </div>

    </form>

    <button @click="emit('submit-form')" class="bg-purple block w-fit p-[13px_20px] rounded-[8px] text-white text-[18px] font-causten font-light">
      Continue to delivery
    </button>
  </div>
</template>

<style scoped>

</style>