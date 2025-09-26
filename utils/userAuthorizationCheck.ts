import { useUserStore } from '~/store/user'

export default function () {
  const userStore = useUserStore()
  if (userStore.isAuthorization) {
    return true
  } else {
    navigateTo('/authorization/sign-in')
    return false
  }
}
