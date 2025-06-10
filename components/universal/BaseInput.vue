<script setup lang="ts">
defineEmits(['update:value'])

type Props = {
  disabled: boolean
  value: string | number | null | undefined
  placeholder: string
  type: 'email' | 'password' | 'text' | 'tel' | 'number'
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  value: undefined,
  placeholder: 'placeholder',
  type: 'text',
})
</script>

<template>
  <div class="relative">
    <label class="">
      <span class="block">
        <slot name="label" />
      </span>

      <input
        class="w-full block focus-visible:outline-0 border border-black rounded-[8px] text-[14px] leading-[16px] text-black placeholder:placeholder-text-gray-200 px-[19px] py-[20px]"
        :disabled="disabled"
        :value="value"
        :placeholder="placeholder"
        :type="type"
        @input.prevent="$emit('update:value', $event.target.value)"
      />

      <span class="block">
        <slot name="error-message" />
      </span>
    </label>

    <slot name="suffix" />
  </div>
</template>

<style scoped></style>