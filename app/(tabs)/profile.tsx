import { useRouter } from "expo-router"
import { Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Profile = () => {
  const router = useRouter()

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
      <Text>Perfil do Usuário</Text>
    </SafeAreaView>
  )
}

export default Profile
