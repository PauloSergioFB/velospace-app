import SignUpForm from "@/components/SignUpForm"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1 px-5 py-8">
        <View className="mb-8 gap-2">
          <Text className="text-4xl font-black tracking-tight text-slate-950">
            Cadastro
          </Text>
        </View>

        <SignUpForm />
      </View>
    </SafeAreaView>
  )
}

export default SignUp
