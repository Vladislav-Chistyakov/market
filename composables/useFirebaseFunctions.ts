import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { useFirebaseConfig } from '@/composables/useFirebaseConfig'
import { confirmPasswordReset } from '@firebase/auth'

export const useFirebaseFunctions = () => {
  const firebaseConfig = useFirebaseConfig()
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  auth.languageCode = 'ru'

  async function userRegistration(email: string, password: string) {
    let user = null
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user
      })
      .catch((error) => {
        throw error
      })

    return user
  }

  async function userSignIn(email: string, password: string) {
    let user = null
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user
      })
      .catch((error) => {
        throw error
      })

    return user
  }

  async function updatePasswordUser(email: string) {
    const actionCodeSetting = {
      url: `https://vlad-chistyakov-market-project.ru/authorization/create-new-password?email=${email}`,
      linkDomain: 'vlad-chistyakov-market-project.ru',
      handleCodeInApp: false,
    }

    if (auth && email) {
      await sendPasswordResetEmail(auth, email, actionCodeSetting).catch(
        (error) => {
          throw error
        },
      )
    }
  }

  function createNewPasswordForUser(oobCode: string, newPassword: string) {
    confirmPasswordReset(auth, oobCode, newPassword)
      .then(() => {
        console.log('Пароль успешно изменён на ', newPassword)
      })
      .catch((err) => {
        console.error('Не удалось изменить пароль пользователя: ', err)
      })
  }

  return {
    userRegistration,
    userSignIn,
    updatePasswordUser,
    createNewPasswordForUser,
  }
}
