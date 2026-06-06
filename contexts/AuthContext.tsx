import AsyncStorage from "@react-native-async-storage/async-storage"
import { ReactNode, createContext, useEffect, useState } from "react"

import { getUser } from "@/lib/api"
import { AuthContextType, User } from "@/types"

export const AuthContext = createContext({} as AuthContextType)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token")
        const storedUser = await AsyncStorage.getItem("auth_user")

        if (token) {
          if (storedUser) {
            setUser(JSON.parse(storedUser) as User)
            return
          }

          const data = await getUser(token)

          if (!data) throw new Error()

          setUser(data)
        }
      } catch {
        await AsyncStorage.removeItem("auth_user")
        await AsyncStorage.removeItem("jwt_token")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
