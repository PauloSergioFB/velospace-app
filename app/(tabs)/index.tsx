import { payloads } from "@/constants/mockData"
import { useRouter } from "expo-router"
import { FlatList, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Home = () => {
  const router = useRouter()

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Text>Ir para Perfil do Usuário</Text>
      </TouchableOpacity>

      <Text>Meus Envios</Text>
      <FlatList
        data={payloads}
        keyExtractor={(item) => String(item["payload_id"])}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/package-detail",
                params: { payloadId: item["payload_id"] },
              })
            }
          >
            <Text>{item["name"]}</Text>
            <Text>{item["tracking_code"] ?? "Não Enviado"}</Text>
            <Text>{item["status"]["description"]}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

export default Home
