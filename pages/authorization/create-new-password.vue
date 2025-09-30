<script setup lang="ts">
import { useRoute, useRouter } from '#vue-router'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

definePageMeta({
  layout: 'authorization',
})

const oobCode = ref('')

const router = useRouter()

const errorMessage = ref('')
const errorCode = ref('')

// TODO Настроить вход на страницу только с middleware
onBeforeMount(() => {
  const route = useRoute()
  if (route?.query?.oobCode) {
    oobCode.value = route.query.oobCode as string

    if (!oobCode.value) {
      router.push('/')
    } else {
      console.log('oobCode', oobCode.value)
    }
  }
  // else {
  //   router.push('/')
  // }
})

const statusHidePassword = ref(false)

const form = reactive({
  password: null,
  duplicatePassword: null,
})

const createNewPassword = useFirebaseFunctions().createNewPasswordForUser

const pending = ref(false)

const passwordChangedSuccessfully = ref(false)

async function createPassword() {
  pending.value = true
  await createNewPassword(oobCode.value, form.password)
    .then(() => {
      errorMessage.value = ''
      errorCode.value = ''
      passwordChangedSuccessfully.value = true
    })
    .catch((error) => {
      console.error(error)

      if (error.code) {
        errorCode.value = error.code
        console.error(error.code)
        if (error.code === 'auth/invalid-action-code') {
          console.error('Неверный код для сброса пароля')
          errorMessage.value =
            'Неверный код для сброса пароля - перейдите на страницу сброса пароля для получения нового кода'
        } else if (error.code === 'auth/weak-password') {
          console.error('Ошибка - пароль короткий')
          errorMessage.value = 'Ошибка - пароль короткий'
        } else {
          errorMessage.value = error.code
        }
      }
    })
    .finally(() => (pending.value = false))
}
</script>

<template>
  <PagesAuthorisationPageWrapper
    title="Create New Password"
    description="Your new password must be different from previous used passwords."
  >
    <template #default>
      <div class="pt-4 pb-12 xl:pb-8 xl:pt-[50px]">
        <form v-if="!passwordChangedSuccessfully">
          <UniversalBaseInput
            class="mb-4 xl:mb-[30px]"
            :disabled="pending"
            :placeholder="''"
            :type="statusHidePassword ? 'text' : 'password'"
            :error-style="!!errorMessage"
            :value="form.password"
            @update:value="form.password = $event"
          >
            <template #label>
              <div class="flex items-center justify-between gap-2">
                <span
                  class="text-black font-causten text-[18px] leading-5 mb-[10px]"
                >
                  Password
                </span>

                <button
                  type="button"
                  class="flex items-center gap-[15px]"
                  @click="statusHidePassword = !statusHidePassword"
                >
                  <img
                    v-show="statusHidePassword"
                    src="@/assets/images/pages/authorization/icon/hide-view-purple.svg"
                    alt="hide-view"
                    class="block pt-[6px]"
                  />

                  <img
                    v-show="!statusHidePassword"
                    src="@/assets/images/pages/authorization/icon/hide-view.svg"
                    alt="hide-view"
                    class="block pt-[6px]"
                  />

                  <span
                    class="text-black font-causten text-[18px] leading-5"
                    :class="[
                      statusHidePassword ? 'text-purple' : 'text-gray-300',
                    ]"
                  >
                    {{ statusHidePassword ? 'Show' : 'Hide' }}
                  </span>
                </button>
              </div>
            </template>
          </UniversalBaseInput>

          <UniversalBaseInput
            class="mb-4 xl:mb-[10px]"
            :disabled="pending"
            :placeholder="''"
            :type="statusHidePassword ? 'text' : 'password'"
            :error-style="!!errorMessage"
            :value="form.duplicatePassword"
            @update:value="form.duplicatePassword = $event"
          >
            <template #label>
              <div class="flex items-center justify-between gap-2">
                <span
                  class="text-black font-causten text-[18px] leading-5 mb-[10px]"
                >
                  Confirm Password
                </span>
              </div>
            </template>

            <template #error-message>
              <span class="text-red tw-text-[14px]">
                {{ errorMessage }}
              </span>
            </template>
          </UniversalBaseInput>

          <div class="flex items-end gap-2 justify-between">
            <button
              type="button"
              :disabled="pending"
              class="w-full flex items-center justify-center xl:w-fit mb-[10px] px-[39px] py-[13px] gap-[12px] bg-purple rounded-[8px] border border-purple text-white disabled:opacity-60"
              @click="createPassword"
            >
              Reset Password
            </button>

            <NuxtLink
              v-if="errorCode === 'auth/invalid-action-code'"
              to="/authorization/reset-password"
              class="block ml-auto w-fit text-black underline font-causten text-[16px] leading-[18px]"
            >
              Forget your password
            </NuxtLink>
          </div>
        </form>

        <div v-else>
          <p
            class="block w-fit text-black font-causten text-[24px] leading-[26px] mb-[12px]"
          >
            Password successfully changed. You can go to the
            <NuxtLink
              :class="{ 'pointer-events-none opacity-60': pending }"
              class="underline text-purple"
              :to="
                pending ?
                  '/authorization/create-new-password'
                : '/authorization/sign-in'
              "
            >
              authorization page!
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
  @apply bg-[url(@/assets/images/pages/authorization/background/bg-four.jpg)] bg-no-repeat;
  @apply w-full min-h-[458px];
  background-size: 100% auto;
  background-position: center top -20px;
}

@media screen and (min-width: 576px) {
  .background {
    @apply w-full min-h-[670px];
    background-size: 695px auto;
    background-position: left top 0;
  }
}

@media screen and (min-width: 768px) {
  .background {
    @apply w-full min-h-[770px];
    background-size: 800px auto;
    background-position: center top -40px;
  }
}

@media screen and (min-width: 1024px) {
  .background {
    @apply w-auto min-h-[686px];
    background-size: 500px auto;
    background-position: left top;
  }
}

@media screen and (min-width: 1280px) {
  .background {
    background-size: 700px auto;
    background-position: left top -20px;
  }
}

@media screen and (min-width: 1440px) {
  .background {
    @apply w-full min-h-[956px];
    background-size: 695px auto;
    background-position: left top 0;
  }
}
</style>
