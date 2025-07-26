import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
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

      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      return products
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error)
      throw error
    }
  }

  async function getProductId(productId: string): Promise<null | unknown> {
    try {
      console.log('получение продукта по id ', productId)
      const productRef = doc(db, 'products', productId)
      const productSnap = await getDoc(productRef)

      if (productSnap.exists()) {
        return {
          id: productSnap.id,
          ...productSnap.data(),
        }
      }

      return null
    } catch (error) {
      throw error
    }
  }

  const addToCart = async (
    productId: string,
    productColor: string,
    productSize: string,
    productPrice: number,
  ) => {
    const uid = useUserStore()?.user?.uid

    const cartRef = doc(db, 'carts', uid)
    const cartSnap = await getDoc(cartRef)
    if (cartSnap.exists()) {
      const dataProducts = cartSnap.data()
      const infoProductCart = { ...dataProducts }

      // Ну и отправляем все данные на серв
      const keyProductCart = `${productId}-${productColor}-${productSize}`
      try {
        // добавление данных в стор
        if (infoProductCart[keyProductCart]) {
          infoProductCart[keyProductCart].countProductCart += 1
        } else {
          // Инача создаем новый по id продукта
          infoProductCart[keyProductCart] = {
            productId: productId,
            countProductCart: 1,
            color: productColor,
            size: productSize,
            price: productPrice,
          }
        }

        await setDoc(doc(db, 'carts', uid), infoProductCart)
      } catch (error) {
        throw error
      }
    }
  }

  return {
    db,
    auth,
    addProduct,
    addToCart,
    getAllProducts,
    getProductId,
    onAuthUser,
    userRegistration,
    userSignIn,
    updatePasswordUser,
    createNewPasswordForUser,
  }
}
