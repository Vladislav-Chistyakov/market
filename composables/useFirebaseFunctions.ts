import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { useFirebaseConfig } from '~/composables/useFirebaseConfig'

export const useFirebaseFunctions = () => {
  const firebaseConfig = useFirebaseConfig()
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  auth.languageCode = 'ru'

  function userRegistration(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('register success', user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
  }

  function userSignIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('userSignIn success', user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
  }

  function updatePasswordUser(email: string) {
    console.log(
      `https://vladislav-chistyakov-market-5ce2.twc1.net/?email=${email}`,
      email,
      auth,
    )
    if (auth && email) {
      sendPasswordResetEmail(auth, email, {
        url: `https://vladislav-chistyakov-market-5ce2.twc1.net/?email=${email}`,
        linkDomain: 'vladislav-chistyakov-market-5ce2.twc1.net',
        handleCodeInApp: true,
      })
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

  return { userRegistration, userSignIn, updatePasswordUser }
}
