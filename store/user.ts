export const useUserStore = defineStore('userStore', () => {
  const user: Ref<null | unknown> = ref(null)

  const userData = computed({
    get() {
      return { email: user.value?.email || null, uid: user.value?.uid || null }
    },
    set(value) {
      console.log('test')
      user.value = value
    },
  })

  return {
    user,
    userData,
  }
})
