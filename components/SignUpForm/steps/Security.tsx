import CustomTextInput from "@/components/ui/CustomTextInput"
import { Text, View } from "react-native"
import { SignUpData } from ".."

interface SecurityProps {
  data: SignUpData
  setData: React.Dispatch<React.SetStateAction<SignUpData>>
  errors: any
}

const Security = ({ data, setData, errors }: SecurityProps) => {
  return (
    <View className="gap-2">
      <View className="gap-1">
        <Text className="text-2xl font-semibold text-slate-900">
          Seguranca
        </Text>
        <Text className="text-sm leading-6 text-slate-500">
          Defina uma senha forte para concluir o cadastro.
        </Text>
      </View>

      <CustomTextInput
        label="Senha"
        placeholder="Senha"
        value={data.password}
        error={errors.password}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, password: value }))
        }
      />
      <CustomTextInput
        label="Confirmar senha"
        placeholder="Confirmar senha"
        value={data.confirmPassword}
        error={errors.confirmPassword}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, confirmPassword: value }))
        }
      />
    </View>
  )
}

export default Security