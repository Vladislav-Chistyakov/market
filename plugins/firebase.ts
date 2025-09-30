import { defineNuxtPlugin } from '#app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCg3uYHhvNCEMAD97VPMRj2a3dNbRFaej8',
    authDomain: 'market-kzn.firebaseapp.com',
    projectId: 'market-kzn',
    storageBucket: 'market-kzn.firebasestorage.app',
    messagingSenderId: '1007506127732',
    appId: '1:1007506127732:web:e5ec0919628b39fa120a21',
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  auth.languageCode = 'ru'

  return {
    provide: {
      firebase: { app, auth, db },
    },
  }
})
