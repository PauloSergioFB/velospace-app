import { useRouter } from "expo-router"
import { Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SignIn = () => {
  const router = useRouter()

  return (
    <SafeAreaView>
      <Text>SignIn</Text>
      <TouchableOpacity onPress={() => router.push("/sign-up")}>
        <Text>Ir para cadastro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SignIn
