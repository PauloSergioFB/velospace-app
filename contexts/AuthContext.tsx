import AsyncStorage from "@react-native-async-storage/async-storage"
import { ReactNode, createContext, useEffect, useState } from "react"

import { getUser } from "@/lib/api"
import { AuthContextType, User, UserType } from "@/types"

export const AuthContext = createContext({} as AuthContextType)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = "INVALID_SHIPPER_TOKEN" // await AsyncStorage.getItem("jwt_token")

        if (token) {
          const data = await getUser(token)

          if (!data) throw new Error()

          setUser({
            id: data["user_id"],
            name: data["name"],
            email: data["email"],
            type: data["type"] as unknown as UserType,
          })
        }
      } catch {
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
