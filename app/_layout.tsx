import "../global.css"

import AuthProvider from "@/contexts/AuthContext"
import LaunchProviderProvider from "@/contexts/LaunchProviderContext"
import OperatorProvider from "@/contexts/OperatorContext"
import UserProvider from "@/contexts/UserContext"
import "@/lib/nativewind"
import { Slot } from "expo-router"

const RootLayout = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <OperatorProvider>
          <LaunchProviderProvider>
            <Slot />
          </LaunchProviderProvider>
        </OperatorProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default RootLayout
