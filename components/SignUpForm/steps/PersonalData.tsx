import CustomTextInput from "@/components/ui/CustomTextInput"
import { View } from "react-native"
import { SignUpData } from ".."

interface PersonalDataProps {
  data: SignUpData
  setData: React.Dispatch<React.SetStateAction<SignUpData>>
  errors: any
}

const PersonalData = ({ data, setData, errors }: PersonalDataProps) => {
  return (
    <View>
      {data.signUpType === "PAYLOAD_HANDLER" && (
        <CustomTextInput
          label="Empresa"
          placeholder="Empresa"
          value={data["company"] ?? ""}
          error={errors["company"]}
          onChangeText={(value) =>
            setData((prev) => ({ ...prev, company: value }))
          }
        />
      )}
      <CustomTextInput
        label="Nome"
        placeholder="Nome"
        value={data["name"]}
        error={""}
        onChangeText={(value) => setData((prev) => ({ ...prev, name: value }))}
      />
      {/* TO-DO CPF se type for expedidos ou operador e CPF ou CNPJ se for provedora */}
      <CustomTextInput
        label={
          data.signUpType === "LAUNCHER_PROVIDER"
            ? "CNPJ"
            : data.signUpType === "PAYLOAD_HANDLER"
              ? "CPF"
              : "CPF/CNPJ"
        }
        placeholder={
          data.signUpType === "LAUNCHER_PROVIDER"
            ? "Insira seu CNPJ"
            : data.signUpType === "PAYLOAD_HANDLER"
              ? "Insira seu CPF"
              : "Insira seu CPF/CNPJ"
        }
        value={data["document"]}
        error={""}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, document: value }))
        }
      />
    </View>
  )
}

export default PersonalData
