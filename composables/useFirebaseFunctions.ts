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

  function updatePasswordUser(email: string) {
    console.log(
      `https://vlad-chistyakov-market-project.ru/?email=${email}`,
      email,
      auth,
    )

    const actionCodeSetting = {
      url: `https://vlad-chistyakov-market-project.ru/authorization/create-new-password?email=${email}`,
      linkDomain: 'vlad-chistyakov-market-project.ru',
      handleCodeInApp: false,
    }
    // {
    //   url: `https://vlad-chistyakov-market-project.ru/authorization/create-new-password?email=${email}`,
    //       ,
    //     handleCodeInApp: false,
    // }
    if (auth && email) {
      sendPasswordResetEmail(auth, email, actionCodeSetting)
        .then(() => {
          console.log('Отправлено сообщение на почту для сброса пароля')
        })
        .catch((error) => {
          console.log(
            'Не удалось отправить сообщение на почту для сброса пароля',
            error,
          )
        })
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
