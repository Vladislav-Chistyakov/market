// composables/useRegister.ts
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getAuth } from '@firebase/auth'

export const useRegister = () => {
  const auth = getAuth(app)
  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      return userCredential.user
    } catch (error) {
      // Можно добавить user-friendly обработку ошибок
      throw new Error(error.message)
    }
  }

  return { register }
}
