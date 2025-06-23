export const useUserStore = defineStore('userStore', () => {
  const user: Ref<null | unknown> = ref(null)

  const userData = computed({
    get() {
      return user.value
    },
    set(value) {
      user.value = value
    },
  })

  return {
    user,
    userData,
  }
})
