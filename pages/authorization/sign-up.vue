<script setup lang="ts">
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

definePageMeta({
  middleware: 'authorization',
})

const statusHidePassword = ref(false)

const form = reactive({
  email: 'chey69@yandex.ru',
  password: 'qweqwe',
})

const userRegistration = useFirebaseFunctions().userRegistration
</script>

<template>
  <PagesAuthorisationPageWrapper
    title="Sign Up"
    description="Sign up for free to access to in any of our products"
  >
    <template #default>
      <div class="pb-8 pt-[50px]">
        <button
          class="mb-5 flex items-center justify-center gap-3 w-full p-[15px] border border-text-black rounded-lg"
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

        <form>
          <UniversalBaseInput
            class="mb-[30px]"
            :disabled="false"
            :placeholder="'designer@gmail.com'"
            :type="'email'"
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
            class="mb-[10px]"
            :disabled="false"
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

          <button
            class="mb-[10px] px-[39px] py-[13px] flex items-center gap-[12px] bg-purple rounded-[8px] border border-purple text-white"
            type="button"
            @click="userRegistration(form.email, form.password)"
          >
            Sign Up
          </button>

          <p
            class="inline-block w-fit text-black font-causten text-[16px] leading-[18px]"
          >
            Already have an account?
            <NuxtLink class="underline" to="/authorization/sign-in">
              Log in
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
  @apply bg-[url(@/assets/images/pages/authorization/background/bg-two.jpg)] bg-no-repeat;
  @apply w-full min-h-[956px];
  background-size: 695px auto;
  background-position: left top 0;
}
</style>