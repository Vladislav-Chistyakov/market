<script setup lang="ts">
definePageMeta({
  middleware: 'authorization',
})

const statusHidePassword = ref(false)

const form = reactive({
  password: null,
  duplicatePassword: null,
})
</script>

<template>
  <PagesAuthorisationPageWrapper
    title="Create New Password"
    description="Your new password must be different from previous used passwords."
  >
    <template #default>
      <div class="pb-8 pt-[30px]">
        <form>
          <UniversalBaseInput
            class="mb-[10px]"
            :disabled="false"
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
            :disabled="false"
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
            class="mb-[10px] px-[39px] py-[13px] flex items-center gap-[12px] bg-purple rounded-[8px] border border-purple text-white"
          >
            Reset Password
          </button>
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
  @apply bg-[url(@/assets/images/pages/authorization/background/bg-four.jpg)] bg-no-repeat;
  @apply w-full min-h-[956px];
  background-size: 695px auto;
  background-position: left top 0;
}
</style>
