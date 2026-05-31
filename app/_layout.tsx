import AuthProvider from "@/contexts/AuthContext"
import { Slot } from "expo-router"

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}

export default RootLayout
