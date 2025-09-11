<script setup lang="ts">
import type { Reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const emit = defineEmits(['submit-form'])

const pending = ref(false)

type Form = {
  name: string | null,
  lastName: string | null,
  countryAndRegion: string | null,
  companyName?: string | null,
  streetAddress: string | null,
  aptSuiteUnit?: string | null,
  city: string | null,
  state: string | null,
  postalCode: string | null,
  phone: string | null,
}

const form: Reactive<Form> = reactive({
  name: null,
  lastName: null,
  countryAndRegion: null,
  companyName: null,
  streetAddress: null,
  aptSuiteUnit: null,
  city: null,
  state: null,
  postalCode: null,
  phone: null,
})

const rules = {
  name: {
    required: helpers.withMessage('Fill in the name field', required)
  },
  lastName: {
    required: helpers.withMessage('Fill in the lastname field', required)
  },
  countryAndRegion: {
    required: helpers.withMessage('Fill in the country and region field', required)
  },
  streetAddress: {
    required: helpers.withMessage('Fill in the street address field', required)
  },
  city: {
    required: helpers.withMessage('Fill in the city field', required)
  },
  state: {
    required: helpers.withMessage('Fill in the state field', required)
  },
  postalCode: {
    required: helpers.withMessage('Fill in the postal code field', required)
  },
  phone: {
    required: helpers.withMessage('Fill in the phone field', required)
  },
}

const v$ = useVuelidate(rules, form)

const resetForm = function () {
  form.name = null
  form.lastName = null
  form.countryAndRegion = null
  form.companyName = null
  form.streetAddress = null
  form.aptSuiteUnit = null
  form.city = null
  form.state = null
  form.postalCode = null
  form.phone = null
}

async function submitForm () {
  pending.value = true
  if (await v$.value.$validate()) {
    console.log('submitForm', form)
    emit('submit-form', form)
  } else {
    return
  }
  pending.value = false

}
</script>

<template>
  <div>
    <b class="block text-[24px] leading-[26px] font-bold text-black mb-[56px]">
      Billing Details
    </b>

    <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-x-[38px] gap-y-[29px]">
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

          <template #error-message>
            <div class="absolute bottom-[-14px] right-0 text-red text-[11px] leading-3">
              <p
                v-for="error of v$.name.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Last Name"
          :value="form.lastName"
          style-input="gray"
          @update:value="form.lastName = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Last Name*
            </p>
          </template>

          <template #error-message>
            <div class="absolute bottom-[-14px] right-0 text-red text-[11px] leading-3">
              <p
                v-for="error of v$.lastName.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Country / Region"
          :value="form.countryAndRegion"
          style-input="gray"
          @update:value="form.countryAndRegion = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Country / Region*
            </p>
          </template>

          <template #error-message>
            <div class="absolute bottom-[-14px] right-0 text-red text-[11px] leading-3">
              <p
                v-for="error of v$.countryAndRegion.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Company (optional)"
          :value="form.companyName"
          style-input="gray"
          @update:value="form.companyName = $event"
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
          :value="form.streetAddress"
          style-input="gray"
          @update:value="form.streetAddress = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Street Address*
            </p>
          </template>

          <template #error-message>
            <div class="absolute bottom-[-14px] right-0 text-red text-[11px] leading-3">
              <p
                v-for="error of v$.streetAddress.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="apartment, suite, unit, etc. (optional)"
          :value="form.aptSuiteUnit"
          style-input="gray"
          @update:value="form.aptSuiteUnit = $event"
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
          :value="form.city"
          style-input="gray"
          @update:value="form.city = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              City*
            </p>
          </template>

          <template #error-message>
            <div class="absolute bottom-[-14px] right-0 text-red text-[11px] leading-3">
              <p
                v-for="error of v$.city.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="State"
          :value="form.state"
          style-input="gray"
          @update:value="form.state = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              State*
            </p>
          </template>

          <template #error-message>
            <div class="absolute bottom-[-14px] right-0 text-red text-[11px] leading-3">
              <p
                v-for="error of v$.state.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Postal Code"
          :value="form.postalCode"
          style-input="gray"
          @update:value="form.postalCode = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Postal Code*
            </p>
          </template>

          <template #error-message>
            <div class="absolute bottom-[-14px] right-0 text-red text-[11px] leading-3">
              <p
                v-for="error of v$.postalCode.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </template>
        </UniversalBaseInput>
      </div>

      <div>
        <UniversalBaseInput
          :disabled="pending"
          type="text"
          placeholder="Phone"
          :value="form.phone"
          style-input="gray"
          @update:value="form.phone = $event"
        >
          <template #label>
            <p class="font-causten mb-[9px] text-[16px] leading-[18px] text-black font-semibold">
              Phone*
            </p>
          </template>

          <template #error-message>
            <div class="absolute bottom-[-14px] right-0 text-red text-[11px] leading-3">
              <p
                v-for="error of v$.phone.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </template>
        </UniversalBaseInput>
      </div>

      <button class="bg-purple block w-fit p-[13px_20px] rounded-[8px] text-white text-[18px] font-causten font-light">
        Continue to delivery
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>