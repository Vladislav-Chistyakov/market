<script setup lang="ts">
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import { useRouter } from '#vue-router'

definePageMeta({
  layout: 'authorization',
})

const router = useRouter()

const statusHidePassword = ref(false)

const form = reactive({
  email: 'chey69@yandex.ru',
  password: 'qweqwe',
})

const pending = ref(false)

const errorMessage = ref('')

const userRegistration = useFirebaseFunctions().userRegistration

async function createAccount() {
  pending.value = true
  await userRegistration(form.email, form.password)
    .then((result) => {
      console.log(result)
      console.log('Успешное создание юзера')
      errorMessage.value = ''
      router.push('/')
    })
    .catch((error) => {
      console.error(error)

      if (error.code) {
        console.error('Ошибка создание юзера', error.code)
        errorMessage.value = 'Ошибка создание юзера ' + error.code
      }

      if (error.code === 'auth/invalid-email') {
        console.error('Ошибка - неверный email')
        errorMessage.value = 'Ошибка - неверный email'
      }

      if (error.code === 'auth/email-already-in-use') {
        console.error('Ошибка - email уже используется')
        errorMessage.value = 'Ошибка - email уже используется'
      }

      if (error.code === 'auth / weak - password') {
        console.error('Ошибка - пароль короткий')
        errorMessage.value = 'Ошибка - пароль короткий'
      }
    })
    .finally(() => (pending.value = false))
}
</script>

<template>
  <PagesAuthorisationPageWrapper
    title="Sign Up"
    description="Sign up for free to access to in any of our products"
  >
    <template #image>
      <div class="background" />
    </template>

    <template #default>
      <div class="pt-4 pb-12 xl:pb-8 xl:pt-[50px]">
        <button
          disabled
          class="mb-3 xl:mb-5 flex items-center justify-center gap-3 w-full p-[15px] border border-text-black rounded-lg"
        >
          <img
            src="@/assets/images/pages/authorization/icon/google.svg"
            alt="Google"
          />

          <span
            class="font-causten font-medium text-[16px] leading-[18px] xl:text-[22px] xl:leading-[24px] text-purple"
          >
            Continue With Google
          </span>
        </button>

        <button
          disabled
          class="mb-5 xl:mb-[50px] flex items-center justify-center gap-3 w-full p-[15px] border border-text-black rounded-lg"
        >
          <img
            src="@/assets/images/pages/authorization/icon/twitter.svg"
            alt="Google"
          />

          <span
            class="font-causten font-medium text-[16px] leading-[18px] xl:text-[22px] xl:leading-[24px] text-purple"
          >
            Continue With Twitter
          </span>
        </button>

        <form>
          <UniversalBaseInput
            class="mb-4 xl:mb-[30px]"
            :disabled="pending"
            :placeholder="'designer@gmail.com'"
            :type="'email'"
            :error-style="!!errorMessage"
            :value="form.email"
            @update:value="form.email = $event"
          >
            <template #label>
              <span
                class="text-black font-causten text-[18px] leading-5 mb-[10px]"
              >
                Email Address
              </span>
            </template>
          </UniversalBaseInput>

          <UniversalBaseInput
            class="mb-4 xl:mb-[10px]"
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

            <template #error-message>
              <span class="text-red tw-text-[14px]">
                {{ errorMessage }}
              </span>
            </template>
          </UniversalBaseInput>

          <button
            class="w-full flex items-center justify-center xl:w-fit mb-[10px] px-[39px] py-[13px] gap-[12px] bg-purple rounded-[8px] border border-purple text-white disabled:opacity-60"
            type="button"
            :disabled="pending"
            @click="createAccount"
          >
            Sign Up
          </button>

          <p
            class="inline-block w-fit text-black font-causten text-[16px] leading-[18px]"
          >
            Already have an account?
            <NuxtLink
              :class="{ 'pointer-events-none opacity-60': pending }"
              class="underline"
              :to="
                pending ? '/authorization/sign-up' : '/authorization/sign-in'
              "
            >
              Log in
            </NuxtLink>
          </p>
        </form>
      </div>
    </template>
  </PagesAuthorisationPageWrapper>
</template>

<style scoped>
.background {
  @apply bg-[url(@/assets/images/pages/authorization/background/bg-two.jpg)] bg-no-repeat;
  @apply w-full min-h-[342px];
  background-size: 100% auto;
  background-position: center top -24px;
}

@media screen and (min-width: 576px) {
  .background {
    @apply w-full min-h-[456px];
    background-size: 695px auto;
    background-position: center top -40px;
  }
}

@media screen and (min-width: 768px) {
  .background {
    background-size: 100% auto;
  }
}

@media screen and (min-width: 1024px) {
  .background {
    @apply w-auto min-h-[686px];
    background-size: 695px auto;
    background-position: center top -20px;
  }
}

@media screen and (min-width: 1440px) {
  .background {
    @apply w-auto min-h-[956px];
    background-size: 695px auto;
    background-position: left top 0;
  }
}
</style>
