import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import {getFirestore, collection, addDoc, getDocs} from 'firebase/firestore'
import { useFirebaseConfig } from '@/composables/useFirebaseConfig'
import { confirmPasswordReset, onAuthStateChanged } from '@firebase/auth'
import { useUserStore } from '~/store/user'

export const useFirebaseFunctions = () => {
  const firebaseConfig = useFirebaseConfig()
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

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

  async function createNewPasswordForUser(
    oobCode: string,
    newPassword: string,
  ) {
    await confirmPasswordReset(auth, oobCode, newPassword).catch((err) => {
      throw err
    })
  }

  type CallBack = () => void

  function onAuthUser(callBackIfThereIsNoUser: CallBack) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        useUserStore().user = user
      } else {
        callBackIfThereIsNoUser()
      }
    })
  }

  async function addProduct(product: Record<string, unknown>) {
    const productWithDate = {
      ...product,
      createdAt: new Date().toISOString(),
    }

    try {
      const docRef = await addDoc(collection(db, 'products'), productWithDate)
      return docRef.id
    } catch (error) {
      console.log('err', error)
      throw error
    }
  }

  async function getAllProducts(): Promise<Record<string, unknown>[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'))

      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return products
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error)
      throw error
    }
  }

  return {
    auth,
    addProduct,
    getAllProducts,
    onAuthUser,
    userRegistration,
    userSignIn,
    updatePasswordUser,
    createNewPasswordForUser,
  }
}
