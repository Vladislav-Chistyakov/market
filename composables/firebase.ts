import { initializeApp } from 'firebase/app'
import { getAuth } from '@firebase/auth'

export const useFirebase = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyCg3uYHhvNCEMAD97VPMRj2a3dNbRFaej8',
    authDomain: 'market-kzn.firebaseapp.com',
    projectId: 'market-kzn',
    storageBucket: 'market-kzn.firebasestorage.app',
    messagingSenderId: '1007506127732',
    appId: '1:1007506127732:web:e5ec0919628b39fa120a21',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  return app
}
