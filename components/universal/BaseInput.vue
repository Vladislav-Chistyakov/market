<script setup lang="ts">
defineEmits(['update:value'])

type Props = {
  disabled: boolean
  value: string | number | null | undefined
  placeholder: string
  type: 'email' | 'password' | 'text' | 'tel' | 'number',
  styleInput?: 'white' | 'gray'
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  value: undefined,
  placeholder: 'placeholder',
  type: 'text',
  styleInput: 'white'
})
</script>

<template>
  <div class="relative">
    <label class="">
      <span class="block">
        <slot name="label" />
      </span>

      <input
        class="
          font-causten w-full block focus-visible:outline-0 border rounded-[8px]
          text-[14px] leading-[16px] text-black
        "
        :class="{
          'border-[#F6F6F6] bg-[#F6F6F6] p-[16px_20px] placeholder:placeholder-[#807D7E]' : styleInput === 'gray',
          'border-black px-[19px] py-[20px] placeholder:placeholder-text-gray-200' : styleInput === 'white',
          }"
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