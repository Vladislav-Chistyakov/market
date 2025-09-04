<script setup lang="ts">
import { useFirebaseFunctions } from '@/composables/useFirebaseFunctions'

definePageMeta({
  middleware: 'authorization',
})

const form = reactive({
  email: 'chey69@yandex.ru',
})

const pending = ref(false)
const linkSentSuccessfully = ref(false)
const errorMessage = ref('')

const sendPasswordUserEmail = useFirebaseFunctions().updatePasswordUser

async function resetPassword() {
  pending.value = true
  await sendPasswordUserEmail(form.email)
    .then(() => {
      console.log('Выслана ссылка для сброса пароля на почту')
      errorMessage.value = ''
      linkSentSuccessfully.value = true
    })
    .catch((error) => {
      console.error(error)

      if (error.code) {
        console.error(error.code)
        errorMessage.value = error.code
      }
    })
    .finally(() => (pending.value = false))
}
</script>

<template>
  <PagesAuthorisationPageWrapper
    title="Reset Your Password"
    description="Enter your email and we'll send you a link to reset your password."
  >
    <template #default>
      <div class="pb-8 pt-[30px]">
        <form v-if="!linkSentSuccessfully">
          <UniversalBaseInput
            class="mb-[30px]"
            :disabled="pending"
            :placeholder="''"
            :type="'text'"
            :value="form.email"
            :error-style="!!errorMessage"
            @update:value="form.email = $event"
          >
            <template #label>
              <span
                class="text-black font-causten text-[18px] leading-5 mb-[10px]"
              >
                Email
              </span>
            </template>

            <template #error-message>
              <span class="text-red tw-text-[14px]">
                {{ errorMessage }}
              </span>
            </template>
          </UniversalBaseInput>

          <button
            type="button"
            :disabled="pending"
            class="mb-[10px] px-[39px] py-[13px] flex items-center gap-[12px] bg-purple rounded-[8px] border border-purple text-white disabled:opacity-60"
            @click="resetPassword"
          >
            Send
          </button>

          <p
            class="inline-block w-fit text-black font-causten text-[16px] leading-[18px]"
          >
            Back to
            <NuxtLink
              :class="{ 'pointer-events-none opacity-60': pending }"
              class="underline"
              :to="pending ? null : '/authorization/sign-in'"
            >
              Log in
            </NuxtLink>
          </p>
        </form>

        <div v-else>
          <p
            class="block w-fit text-black font-causten text-[24px] leading-[26px] mb-[12px]"
          >
            A link to reset your password has been sent to your email!
          </p>

          <p
            class="inline-block w-fit text-black font-causten text-[16px] leading-[18px]"
          >
            Back to
            <NuxtLink
              :class="{ 'pointer-events-none opacity-60': pending }"
              class="underline"
              :to="pending ? null : '/authorization/sign-in'"
            >
              Log in
            </NuxtLink>
          </p>
        </div>
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
