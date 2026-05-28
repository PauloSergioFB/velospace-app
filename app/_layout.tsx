import AuthProvider from "@/contexts/AuthContext"
import "@/global.css"
import { Stack } from "expo-router"

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
}

export default RootLayout

export default RootLayout
