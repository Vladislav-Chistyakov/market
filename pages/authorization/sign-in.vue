<script setup lang="ts">
import { useFirebaseFunctions } from '@/composables/useFirebaseFunctions'
import { useRouter } from '#vue-router'

const router = useRouter()

definePageMeta({
  middleware: 'authorization',
})

const statusHidePassword = ref(false)

const form = reactive({
  nameOrEmail: 'chey69@yandex.ru',
  password: 'qweqwe',
})

const pending = ref(false)

const userSignIn = useFirebaseFunctions().userSignIn

async function loginYourAccount() {
  pending.value = true
  await userSignIn(form.nameOrEmail, form.password)
    .then((result) => {
      console.log(result)
      console.log('Прошла успешная авторизация юзера')
      // TODO Тут осуществялется переход на главную страницу после успешной авторизации
      router.push('/')
    })
    .catch((error) => {
      console.error(error)

      if (error.code === 'auth/invalid-credential') {
        // TODO от сюда надо вывести ошибку, что юзер не прошел проверку
        // отметить ошибку в поле ввода
        console.error('Ошибка авторизации пользователя')
      }
    })
    .finally(() => (pending.value = false))
}
</script>

<template>
  <PagesAuthorisationPageWrapper title="Sign In Page">
    <template #default>
      <div class="pb-8">
        <button
          class="mb-5 flex items-center justify-center gap-3 w-full p-[15px] border border-text-black rounded-lg"
          type="button"
        >
          <img
            src="@/assets/images/pages/authorization/icon/google.svg"
            alt="Google"
          />

          <span
            class="font-causten font-medium text-[22px] leading-[24px] text-purple"
          >
            Continue With Google
          </span>
        </button>

        <button
          class="mb-[50px] flex items-center justify-center gap-3 w-full p-[15px] border border-text-black rounded-lg"
          type="button"
        >
          <img
            src="@/assets/images/pages/authorization/icon/twitter.svg"
            alt="Google"
          />

          <span
            class="font-causten font-medium text-[22px] leading-[24px] text-purple"
          >
            Continue With Twitter
          </span>
        </button>

        <div class="flex gap-[24px] items-center mb-[50px]">
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
            class="mb-[30px]"
            :disabled="pending"
            :placeholder="''"
            :type="'text'"
            :value="form.nameOrEmail"
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
            class="mb-[10px]"
            :disabled="pending"
            :placeholder="''"
            :type="statusHidePassword ? 'text' : 'password'"
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

          <NuxtLink
            to="/authorization/reset-password"
            target="_blank"
            class="block ml-auto w-fit text-black underline font-causten text-[16px] leading-[18px]"
          >
            Forget your password
          </NuxtLink>

          <button
            class="mb-[10px] px-[39px] py-[13px] flex items-center gap-[12px] bg-purple rounded-[8px] border border-purple text-white disabled:opacity-60"
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
            <NuxtLink class="underline" to="/authorization/sign-up">
              Sign up
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
  @apply bg-[url(@/assets/images/pages/authorization/background/bg-one.jpg)] bg-no-repeat;
  @apply w-full min-h-[956px];
  background-size: auto 956px;
  background-position: right -331px top 0;
}
</style>
