import NewPackageForm from "@/components/NewPackageForm"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const NewPackage = () => {
  return (
    <SafeAreaView>
      <Text>Novo Satélite</Text>
      <NewPackageForm />
    </SafeAreaView>
  )
}

export default NewPackage
