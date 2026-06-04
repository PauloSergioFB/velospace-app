import Banner from "@/components/Banner"
import Header from "@/components/ui/Header"
import { payloads } from "@/constants/mockData"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Home = () => {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <Header userName="Matheus" />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>


        <Banner/>
        
        <View
          style={{
            alignItems: "center",
            paddingTop: 8,
            paddingBottom: 18,
          }}
        >
          
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#059669",
            }}
          >
            Meus <Text style={{ color: "#F97316" }}>Envios</Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 9,
              borderRadius: 999,
              backgroundColor: "#059669",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              Todos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 9,
              borderRadius: 999,
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E2E8F0",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Pendente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 9,
              borderRadius: 999,
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E2E8F0",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Enviado
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={payloads}
          keyExtractor={(item) => String(item["payload_id"])}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            gap: 14,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: "/package-detail",
                  params: { payloadId: item["payload_id"] },
                })
              }
              style={{
                minHeight: 94,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: 18,
                padding: 14,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.08,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  backgroundColor: "#ECFDF5",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                }}
              >
                <Ionicons name="cube-outline" size={30} color="#059669" />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#0F172A",
                    marginBottom: 4,
                  }}
                >
                  {item["name"]}
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "600",
                    color: "#F97316",
                    marginBottom: 2,
                  }}
                >
                  {item["tracking_code"] ?? "Não enviado"}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: "#64748B",
                  }}
                >
                  ID #{item["payload_id"]}
                </Text>
              </View>

              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 999,
                  backgroundColor: "#F1F5F9",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color:  "#475569",
                  }}
                >
                  {item["status"]["description"]}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      
    </SafeAreaView>
  )
}

export default Home