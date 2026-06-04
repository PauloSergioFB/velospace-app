import NewPackageForm from "@/components/NewPackageForm"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const NewPackage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "800",
              color: "#0F172A",
              marginBottom: 8,
            }}
          >
            Novo Satélite
          </Text>

          <Text
            style={{
              maxWidth: 300,
              textAlign: "center",
              fontSize: 14,
              lineHeight: 20,
              color: "#64748B",
            }}
          >
            Cadastre as informações do seu satélite para solicitar um novo envio.
          </Text>
        </View>

        <NewPackageForm />
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewPackage