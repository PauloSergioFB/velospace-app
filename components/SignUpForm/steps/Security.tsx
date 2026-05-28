import CustomTextInput from "@/components/ui/CustomTextInput"
import { View } from "react-native"
import { SignUpData } from ".."

interface SecurityProps {
  data: SignUpData
  setData: React.Dispatch<React.SetStateAction<SignUpData>>
  errors: any
}

const Security = ({ data, setData, errors }: SecurityProps) => {
  return (
    <View>
      <CustomTextInput
        label="Senha"
        placeholder="Senha"
        value={data["password"]}
        error={errors["password"]}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, password: value }))
        }
      />
      <CustomTextInput
        label="Confirmar senha"
        placeholder="Confirmar senha"
        value={data["confirmPassword"]}
        error={""}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, confirmPassword: value }))
        }
      />
    </View>
  )
}

export default Security
