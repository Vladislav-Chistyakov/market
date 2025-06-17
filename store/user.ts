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

  const saveUserDataToLocalStorage = function (user: unknown) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  return {
    user,
    userData,
    saveUserDataToLocalStorage,
  }
})
