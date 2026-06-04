import "../global.css"

import AuthProvider from "@/contexts/AuthContext"
import "@/lib/nativewind"
import { Slot } from "expo-router"

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}

export default RootLayout
