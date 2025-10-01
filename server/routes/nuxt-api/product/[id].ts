import { type H3Event } from 'h3'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '~/utils/firebase'

export default defineCachedEventHandler(
  async (event: H3Event) => {
    try {
      // TODO Разобраться, почему не работает в прод версии
      const id = getRouterParam(event, 'id')
      const productRef = doc(db, 'products', id as string)
      const productSnap = await getDoc(productRef)

      if (productSnap.exists()) {
        return {
          id: productSnap.id,
          ...productSnap.data(),
        }
      }

      return null
    } catch (err) {
      console.error(`ERROR Fetch server: `, err)
      throw err
    }
  },
  {
    maxAge: 60 * 15,
    swr: false,
    getKey: (event: H3Event) => {
      const id = getRouterParam(event, 'id')
      return `Product-${id}`
    },
  },
)
