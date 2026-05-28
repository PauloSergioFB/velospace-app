import AsyncStorage from "@react-native-async-storage/async-storage"
import { Slot, useRouter } from "expo-router"
import { useEffect } from "react"

const TabsLayout = () => {
  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("jwt_token")
      if (token) router.push("/(tabs)")
    }

    checkToken()
  }, [router])

  return <Slot /> // <Redirect href="/(tabs)" />
}

export default TabsLayout
