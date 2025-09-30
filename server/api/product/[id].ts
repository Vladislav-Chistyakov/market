// import { type H3Event } from 'h3'
// import { doc, getDoc } from 'firebase/firestore'
//
// export default defineCachedEventHandler(
//   async (event: H3Event) => {
//     try {
//       const { $firebase } = useNuxtApp()
//       const id = getRouterParam(event, 'id')
//       console.log('UIDIDIIDID', id)
//
//       const productRef = doc($firebase.db, 'products', id)
//       const productSnap = await getDoc(productRef)
//
//       if (productSnap.exists()) {
//         return {
//           id: productSnap.id,
//           ...productSnap.data(),
//         }
//       }
//     } catch (err) {
//       console.error(`ERROR Fetch server: `, err)
//       throw err
//     }
//   },
//   {
//     maxAge: 60,
//     swr: false,
//     getKey: (event: H3Event) => {
//       const id = getRouterParam(event, 'id')
//       return `Product-${id}`
//     },
//   },
// )
