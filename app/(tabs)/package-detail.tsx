import { useLocalSearchParams, useRouter } from "expo-router"
import { Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const PackageDetail = () => {
  const router = useRouter()

  const { payloadId } = useLocalSearchParams<{ payloadId: string }>()

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
      <Text>{payloadId}</Text>
    </SafeAreaView>
  )
}

export default PackageDetail
