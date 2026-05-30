import AuthProvider from "@/contexts/AuthContext"
import { Stack } from "expo-router"

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
<<<<<<< Updated upstream
}

export default RootLayout
=======

}

export default RootLayout


>>>>>>> Stashed changes
