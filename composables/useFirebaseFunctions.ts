import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore'
import { confirmPasswordReset, onAuthStateChanged } from '@firebase/auth'
import { useUserStore } from '~/store/user'

export const useFirebaseFunctions = () => {
  const { $firebase } = useNuxtApp()
  const auth = $firebase.auth
  const db = $firebase.db

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
      // TODO Заняться!
      // const test = await $fetch(`/api/product/${productId}`, {
      //   params: { id: productId },
      // }).catch((e) => console.error('@@@ ', e))
      // console.log('test', test)
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
      const data = cartSnap.data()
      return data?.items || []
    }

    return []
  }

  async function removeProductFromCart(productKey: string) {
    try {
      const uid = useUserStore()?.user?.uid
      if (!uid) throw new Error('UID is not defined')

      const userCartRef = doc(db, 'carts', uid)
      const cartSnap = await getDoc(userCartRef)

      if (!cartSnap.exists()) return

      const cartData = cartSnap.data()
      let cartItems = cartData?.items || []

      // фильтруем массив и удаляем товар по ключу
      cartItems = cartItems.filter((item: any) => item.key !== productKey)

      await updateDoc(userCartRef, { items: cartItems })

      console.log(`Товар ${productKey} удалён из корзины пользователя ${uid}`)
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error)
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

    // данные продукта
    const keyProductCart = `${productId}-${productColor}-${productSize}`
    const productData = {
      key: keyProductCart, // уникальный ключ внутри массива
      productId,
      countProductCart: 1,
      color: productColor,
      size: productSize,
      price: productPrice,
    }

    try {
      if (cartSnap.exists()) {
        const cartData = cartSnap.data()
        let cartItems = cartData?.items || []

        // ищем, есть ли уже такой продукт в корзине
        const index = cartItems.findIndex(
          (item: any) => item.key === keyProductCart,
        )

        if (index !== -1) {
          if (actionOnProduct === 'add') {
            cartItems[index].countProductCart += 1
          } else if (actionOnProduct === 'remove') {
            cartItems[index].countProductCart -= 1

            // удаляем, если количество стало 0
            if (cartItems[index].countProductCart <= 0) {
              cartItems.splice(index, 1)
            }
          }
        } else {
          // если товара нет — добавляем
          cartItems.push(productData)
        }

        await updateDoc(cartRef, { items: cartItems })
      } else {
        // создаём корзину с первым товаром
        await setDoc(cartRef, { items: [productData] })
      }
    } catch (error) {
      throw error
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
  const getOrders = async () => {
    const uid = useUserStore()?.user?.uid
    if (!uid) throw new Error('UID is not defined')

    try {
      const userOrdersRef = doc(db, 'orders', uid)
      const snapshot = await getDoc(userOrdersRef)

      if (!snapshot.exists()) {
        return [] // если заказов ещё нет
      }

      const data = snapshot.data()
      const orders = data?.orderList || []

      return orders
    } catch (error) {
      console.error('Ошибка при получении заказов:', error)
      throw error
    }
  }

  const createOrder = async (dataOrder: any) => {
    const uid = useUserStore()?.user?.uid

    if (!uid) throw new Error('UID is not defined')

    try {
      const userOrdersRef = doc(db, 'orders', uid)
      const snapshot = await getDoc(userOrdersRef)

      const generateId = () => {
        return doc(collection(db, '_')).id
      }

      dataOrder.id = generateId()

      if (snapshot.exists()) {
        // Если документ уже есть — добавляем в массив
        await updateDoc(userOrdersRef, {
          orderList: arrayUnion(dataOrder),
        })
      } else {
        // Если документа ещё нет — создаём и кладём массив
        await setDoc(userOrdersRef, {
          orderList: [dataOrder],
        })
      }

      await removeAllProductFromCart()

      return true // можно вернуть, например, флаг успешности
    } catch (error) {
      throw error
    }
  }

  // const createOrder = async (dataOrder: any) => {
  //   // Получение uid юзера
  //   const uid = useUserStore()?.user?.uid
  //
  //   // Если юзера нет, выкидываем ошибку
  //   if (!uid) throw new Error('UID is not defined')
  //
  //   try {
  //     const docRef = await addDoc(
  //       collection(db, 'orders', uid, 'orderList'),
  //       dataOrder,
  //     )
  //     await removeAllProductFromCart()
  //     return docRef.id
  //   } catch (error) {
  //     throw error
  //   }
  // }
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
