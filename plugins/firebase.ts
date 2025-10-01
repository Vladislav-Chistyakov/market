import { defineNuxtPlugin } from '#app'
import { db, auth } from '@/utils/firebase'

export default defineNuxtPlugin(() => {
  auth.languageCode = 'ru'

  return {
    provide: {
      firebase: { auth, db },
    },
  }
})
