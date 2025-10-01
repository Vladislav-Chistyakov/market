<script setup lang="ts">
import { useFirebaseFunctions } from '@/composables/useFirebaseFunctions'
import { useRouter } from '#vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

definePageMeta({
  layout: 'authorization',
})

const statusHidePassword = ref(false)

const form = reactive({
  nameOrEmail: '',
  password: '',
})

const pending = ref(false)

const userSignIn = useFirebaseFunctions().userSignIn

const errorMessage = ref('')

async function loginYourAccount() {
  pending.value = true
  await userSignIn(form.nameOrEmail, form.password)
    .then((result) => {
      errorMessage.value = ''
      userStore.userData = result
      router.push('/')
    })
    .catch((error) => {
      console.error(error)

      if (error.code === 'auth/invalid-credential') {
        console.error('Введите верные данные для авторизации')
        errorMessage.value = 'Введите верные данные для авторизации'
      }
    })
    .finally(() => (pending.value = false))
}
</script>

<template>
  <PagesAuthorisationPageWrapper title="Sign In Page">
    <template #image>
      <div class="background" />
    </template>

    <template #default>
      <div class="pt-4 pb-12 xl:pb-8 xl:pt-[50px]">
        <button
          class="mb-3 xl:mb-5 flex items-center justify-center gap-3 w-full p-[15px] border border-black rounded-lg"
          disabled
          type="button"
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
          class="mb-5 xl:mb-[50px] flex items-center justify-center gap-3 w-full p-[15px] border border-black rounded-lg"
          disabled
          type="button"
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

        <div class="flex gap-[24px] items-center mb-4 xl:mb-[50px]">
          <div class="w-full bg-gray-300-opacity-25 h-[1px]" />

          <p
            class="font-core-sans-c text-[18px] font-normal leading-[20px] text-gray-300"
          >
            OR
          </p>

          <div class="w-full bg-gray-300-opacity-25 h-[1px]" />
        </div>

        <form>
          <UniversalBaseInput
            class="mb-4 xl:mb-[30px]"
            :disabled="pending"
            :placeholder="''"
            :type="'text'"
            :value="form.nameOrEmail"
            :error-style="!!errorMessage"
            @update:value="form.nameOrEmail = $event"
          >
            <template #label>
              <span
                class="text-black font-causten text-[18px] leading-5 mb-[10px]"
              >
                User name or email address
              </span>
            </template>
          </UniversalBaseInput>

          <UniversalBaseInput
            class="mb-4 xl:mb-[10px]"
            :disabled="pending"
            :placeholder="''"
            :type="statusHidePassword ? 'text' : 'password'"
            :value="form.password"
            :error-style="!!errorMessage"
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

          <NuxtLink
            to="/authorization/reset-password"
            class="block mb-4 xl:mb-0 ml-auto w-fit text-black underline font-causten text-[16px] leading-[18px]"
          >
            Forget your password
          </NuxtLink>

          <button
            class="w-full flex items-center justify-center xl:w-fit mb-[10px] px-[39px] py-[13px] gap-[12px] bg-purple rounded-[8px] border border-purple text-white disabled:opacity-60"
            type="button"
            :disabled="pending"
            @click="loginYourAccount"
          >
            Sign In
          </button>

          <p
            class="inline-block w-fit text-black font-causten text-[16px] leading-[18px]"
          >
            Don’t have an account?
            <NuxtLink
              :class="{ 'pointer-events-none opacity-60': pending }"
              class="underline"
              :to="
                pending ? '/authorization/sign-in' : '/authorization/sign-up'
              "
            >
              Sign up
            </NuxtLink>
          </p>
        </form>
      </div>
    </template>
  </PagesAuthorisationPageWrapper>
</template>

<style scoped>
.background {
  @apply bg-[url(@/assets/images/pages/authorization/background/bg-one.jpg)] bg-no-repeat;
  @apply w-full min-h-[238px];
  background-size: 100% auto;
  background-position: center top 0;
}

@media screen and (min-width: 576px) {
  .background {
    @apply w-full min-h-[456px];
    background-size: 695px auto;
    background-position: left top 0;
  }
}

@media screen and (min-width: 768px) {
  .background {
    background-size: 930px auto;
    background-position: left -30px top 0;
  }
}

@media screen and (min-width: 1024px) {
  .background {
    @apply w-auto min-h-[686px];
    background-size: 1050px auto;
    background-position: left -234px top -20px;
  }
}

@media screen and (min-width: 1440px) {
  .background {
    @apply w-full min-h-[956px];
    background-size: auto 956px;
    background-position: right -331px top 0;
  }
}
</style>
