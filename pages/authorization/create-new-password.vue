<script setup lang="ts">
import { useRoute, useRouter } from '#vue-router'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'

definePageMeta({
  middleware: 'authorization',
})

const oobCode = ref('')

const router = useRouter()

onBeforeMount(() => {
  const route = useRoute()
  if (route?.query?.oobCode) {
    oobCode.value = route.query.oobCode as string

    if (!oobCode.value) {
      router.push('/')
    } else {
      console.log('oobCode', oobCode.value)
    }
  } else {
    router.push('/')
  }
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
      passwordChangedSuccessfully.value = true
    })
    .catch((error) => {
      console.error(error)

      if (error.code) {
        console.error(error.code)
        if (error.code === 'auth/invalid-action-code') {
          console.error('Неверный код для сброса пароля')
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
      <div class="pb-8 pt-[30px]">
        <form v-if="!passwordChangedSuccessfully">
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

          <UniversalBaseInput
            class="mb-[10px]"
            :disabled="pending"
            :placeholder="''"
            :type="statusHidePassword ? 'text' : 'password'"
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
          </UniversalBaseInput>

          <button
            type="button"
            :disabled="pending"
            class="mb-[10px] px-[39px] py-[13px] flex items-center gap-[12px] bg-purple rounded-[8px] border border-purple text-white disabled:opacity-60"
            @click="createPassword"
          >
            Reset Password
          </button>
        </form>

        <div v-else>
          <p
            class="block w-fit text-black font-causten text-[24px] leading-[26px] mb-[12px]"
          >
            Password successfully changed. You can go to the
            <NuxtLink
              :class="{ 'pointer-events-none opacity-60': pending }"
              class="underline text-purple"
              :to="pending ? null : '/authorization/sign-in'"
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
  @apply w-full min-h-[956px];
  background-size: 695px auto;
  background-position: left top 0;
}
</style>
