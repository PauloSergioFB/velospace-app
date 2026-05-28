import CustomTextInput from "@/components/ui/CustomTextInput"
import { View } from "react-native"
import { SignUpData } from ".."

interface ContactDataProps {
  data: SignUpData
  setData: React.Dispatch<React.SetStateAction<SignUpData>>
  errors: any
}

const ContactData = ({ data, setData, errors }: ContactDataProps) => {
  return (
    <View>
      <CustomTextInput
        label="Email"
        placeholder="Email"
        value={data["email"]}
        error={errors["email"]}
        onChangeText={(value) => setData((prev) => ({ ...prev, email: value }))}
      />
      <CustomTextInput
        label="Telefone"
        placeholder="Telefone"
        value={data["phone"]}
        error={""}
        onChangeText={(value) => setData((prev) => ({ ...prev, phone: value }))}
      />
    </View>
  )
}

export default ContactData
