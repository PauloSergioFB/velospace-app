import CustomTextInput from "@/components/ui/CustomTextInput"
import { Text, View } from "react-native"
import { SignUpData } from ".."

interface ContactDataProps {
  data: SignUpData
  setData: React.Dispatch<React.SetStateAction<SignUpData>>
  errors: any
}

const ContactData = ({ data, setData, errors }: ContactDataProps) => {
  return (
    <View className="gap-2">
      <View className="gap-1">
        <Text className="text-2xl font-semibold text-slate-900">Contato</Text>

      </View>

      <CustomTextInput
        label="Email"
        placeholder="Email"
        value={data.email}
        error={errors.email}
        onChangeText={(value) => setData((prev) => ({ ...prev, email: value }))}
      />
      <CustomTextInput
        label="Telefone"
        placeholder="Telefone"
        value={data.phone}
        error={errors.phone}
        onChangeText={(value) => setData((prev) => ({ ...prev, phone: value }))}
      />
    </View>
  )
}

export default ContactData
