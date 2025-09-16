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
  updateDoc,
  deleteField,
} from 'firebase/firestore'
import { useFirebaseConfig } from '@/composables/useFirebaseConfig'
import { confirmPasswordReset, onAuthStateChanged } from '@firebase/auth'
import { useUserStore } from '~/store/user'
import { runTransaction } from '@firebase/database'
import { useCartStore } from '~/store/cart'

export const useFirebaseFunctions = () => {
  const firebaseConfig = useFirebaseConfig()
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  auth.languageCode = 'ru'

  // Функции работа с юзером
  // ****************************   ************************************
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

  async function onAuthUser(callBackIfThereIsNoUser: CallBack = () => null) {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            useUserStore().user = user
            resolve(user)
          } else {
            resolve(callBackIfThereIsNoUser())
          }
        },
        (error) => reject(error),
      )
    })
  }
  // *******************************************************************

  // Работа с продуктами
  // ****************************   ************************************
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
      // TODO Решить вопрос с запросами на повторяющиеся id продукиа (кэш или useLazyAsyncData)
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
  // *******************************************************************

  // Работа с CART (Корзина)
  // ****************************   ************************************
  const getCart = async (uid: string) => {
    if (!uid) throw new Error('UID is not defined')
    const cartRef = doc(db, 'carts', uid)
    const cartSnap = await getDoc(cartRef)
    if (cartSnap.exists()) {
      return cartSnap.data()
    }
    return {}
  }

  async function removeProductFromCart(productId: string) {
    try {
      const uid = useUserStore()?.user?.uid
      if (!uid) throw new Error('UID is not defined')
      const userCartRef = doc(db, 'carts', uid)
      await updateDoc(userCartRef, {
        [productId]: deleteField(),
      })
      console.log(
        `Поле ${productId} удалено из документа корзины пользователя ${uid}`,
      )
    } catch (error) {
      console.error('Ошибка при удалении товара из поля:', error)
    }
  }

  const convertItemInCart = async (
    productId: string,
    productColor: string,
    productSize: string,
    productPrice: number,
    actionOnProduct: 'add' | 'remove' = 'add',
  ) => {
    const uid = useUserStore()?.user?.uid
    if (!uid) throw new Error('UID is not defined')
    const cartRef = doc(db, 'carts', uid)
    const cartSnap = await getDoc(cartRef)
    if (cartSnap.exists()) {
      const dataProducts = cartSnap.data()
      const infoProductCart = { ...dataProducts }
      // Ну и отправляем все данные в базу
      const keyProductCart = `${productId}-${productColor}-${productSize}`

      try {
        // добавление данных в стор
        if (infoProductCart[keyProductCart] && actionOnProduct === 'add') {
          infoProductCart[keyProductCart].countProductCart += 1
        } else if (
          infoProductCart[keyProductCart]
          && actionOnProduct === 'remove'
        ) {
          infoProductCart[keyProductCart].countProductCart -= 1
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

  async function removeAllProductFromCart() {
    try {
      const uid = useUserStore()?.user?.uid
      if (!uid) throw new Error('UID is not defined')

      const userCartRef = doc(db, 'carts', uid)
      await setDoc(userCartRef, {}) // записываем пустой объект

      console.log(`Корзина пользователя ${uid} очищена (документ остался)`)
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error)
    }
  }
  // *******************************************************************

  // Работа с wishlist (список желаемого)
  // ****************************   ************************************
  const changeStatusProductInWishlist = async (productId: string) => {
    // Получение uid юзера
    const uid = useUserStore()?.user?.uid

    // Если юзера нет, выкидываем ошибку
    if (!uid) throw new Error('UID is not defined')

    // Получение данных из базы
    const wishlistRef = doc(db, 'wishlist', uid)
    const wishlistSnap = await getDoc(wishlistRef)

    let products: string[] = []

    // Проверка, есть ли данные в базе вообще
    if (wishlistSnap.exists()) {
      const data = wishlistSnap.data()
      products = data.products || []
    }

    // Проверяем, есть ли продукт в wishlist
    if (products.includes(productId)) {
      // если есть, то убираем его от туда
      products = products.filter((item) => item !== productId)
    } else {
      // Добавляем новый productId в wishlist, так как его там нет
      products.push(productId)
    }

    // Перезаписываем весь массив
    await setDoc(wishlistRef, { products })
      .then((res) => {
        console.log('успех setDoc res', res)
      })
      .catch((error) => console.error('error setDoc', error))
      .finally(() => console.log('set doc'))
  }

  const getWishlist = async (uid: string) => {
    // Проверяем на наличии id юзера
    if (!uid) throw new Error('UID is not defined')

    // Получение данных для работы с БД
    const wishlistRef = doc(db, 'wishlist', uid)
    const wishlistSnap = await getDoc(wishlistRef)

    // Извлечение списка продуктов вишлиста из БД
    if (wishlistSnap.exists()) {
      const dataWishlistProducts = wishlistSnap.data()
      return dataWishlistProducts.products || []
    }
    // Если
    return []
  }
  // *******************************************************************

  // Работа с orders (Заказы)
  // ****************************   ************************************
  const getOrders = async (uid: string) => {
    if (!uid) throw new Error('UID is not defined')
    const ordersRef = doc(db, 'orders', uid)
    const ordersSnap = await getDoc(ordersRef)
    if (ordersSnap.exists()) {
      return ordersSnap.data()
    }
    return {}
  }

  const createOrder = async (dataOrder: any) => {
    // Получение uid юзера
    const uid = useUserStore()?.user?.uid
    const arrayProducts = useCartStore()?.arrayCartProduct

    // Если юзера нет, выкидываем ошибку
    if (!uid) throw new Error('UID is not defined')

    console.log('test', dataOrder)

    try {
      const docRef = await addDoc(
        collection(db, 'orders', uid, 'orderList'),
        dataOrder,
      )
      await removeAllProductFromCart()
      return docRef.id
    } catch (error) {
      console.log('err', error)
      throw error
    }
  }

  // *******************************************************************

  return {
    db,
    auth,
    getOrders,
    createOrder,
    addProduct,
    convertItemInCart,
    changeStatusProductInWishlist,
    getCart,
    getWishlist,
    getAllProducts,
    getProductId,
    removeProductFromCart,
    onAuthUser,
    userRegistration,
    userSignIn,
    updatePasswordUser,
    createNewPasswordForUser,
  }
}
