<script setup lang="ts">
import { useFirebaseFunctions } from '@/composables/useFirebaseFunctions'

definePageMeta({
  middleware: 'authorization',
})

const form = reactive({
  email: 'chey69@yandex.ru',
})

const sendPasswordUserEmail = useFirebaseFunctions().updatePasswordUser
</script>

<template>
  <PagesAuthorisationPageWrapper
    title="Reset Your Password"
    description="Enter your email and we'll send you a link to reset your password."
  >
    <template #default>
      <div class="pb-8 pt-[30px]">
        <form>
          <UniversalBaseInput
            class="mb-[30px]"
            :disabled="false"
            :placeholder="''"
            :type="'text'"
            :value="form.email"
            @update:value="form.email = $event"
          >
            <template #label>
              <span
                class="text-black font-causten text-[18px] leading-5 mb-[10px]"
              >
                Email
              </span>
            </template>
          </UniversalBaseInput>

          <button
            type="button"
            class="mb-[10px] px-[39px] py-[13px] flex items-center gap-[12px] bg-purple rounded-[8px] border border-purple text-white"
            @click="sendPasswordUserEmail(form.email)"
          >
            Send
          </button>

          <p
            class="inline-block w-fit text-black font-causten text-[16px] leading-[18px]"
          >
            Back to
            <NuxtLink class="underline" to="/authorization/sign-in">
              Login
            </NuxtLink>
          </p>
        </form>
      </div>
    </template>

    <template #image>
      <div class="background" />
    </template>
  </PagesAuthorisationPageWrapper>
</template>

<style scoped>
.background {
  @apply bg-[url(@/assets/images/pages/authorization/background/bg-three.jpg)] bg-no-repeat;
  @apply w-full min-h-[956px];
  background-size: auto 956px;
  background-position: right -331px top 0;
}
</style>
