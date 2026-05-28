import SignUpForm from "@/components/SignUpForm"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SignUp = () => {
  return (
    <SafeAreaView>
      <Text>Cadastro</Text>
      <SignUpForm />
    </SafeAreaView>
  )
}

export default SignUp
