import CustomTextInput from "@/components/ui/CustomTextInput"
import { Text, View, ScrollView } from "react-native"
import { SignUpData } from ".."

interface PersonalDataProps {
  data: SignUpData
  setData: React.Dispatch<React.SetStateAction<SignUpData>>
  errors: any
}

const DEFAULT_PERSONAL_DATA_CONFIG = {
  roleLabel: "Usuário",
  showCompanyField: false,
  documentLabel: "CPF/CNPJ",
  documentPlaceholder: "Insira seu CPF/CNPJ",
}

const PERSONAL_DATA_CONFIG: Record<
  string,
  typeof DEFAULT_PERSONAL_DATA_CONFIG
> = {
  SHIPPER: {
    roleLabel: "Expedidor",
    showCompanyField: false,
    documentLabel: "CPF/CNPJ",
    documentPlaceholder: "Insira seu CPF/CNPJ",
  },
  LAUNCHER_PROVIDER: {
    roleLabel: "Provedora de Lançamento",
    showCompanyField: false,
    documentLabel: "CNPJ",
    documentPlaceholder: "Insira seu CNPJ",
  },
  PAYLOAD_HANDLER: {
    roleLabel: "Operador de Lançamento",
    showCompanyField: true,
    documentLabel: "CPF",
    documentPlaceholder: "Insira seu CPF",
  },
}

const PersonalData = ({ data, setData, errors }: PersonalDataProps) => {
  const personalDataConfig =
    PERSONAL_DATA_CONFIG[data.signUpType] ?? DEFAULT_PERSONAL_DATA_CONFIG

  return (
    <View style={{ width: "100%", gap: 12 }}>
      <View
        style={{
          alignItems: "center",
          gap: 6,
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#0F172A",
          }}
        >
          Dados pessoais
        </Text>

        <Text
          style={{
            maxWidth: 280,
            textAlign: "center",
            fontSize: 14,
            lineHeight: 20,
            color: "#64748B",
          }}
        >
          Preencha as informações básicas do cadastro.
        </Text>
      </View>

      {personalDataConfig.showCompanyField ? (
        <CustomTextInput
          label="Empresa"
          placeholder="Digite o nome da empresa"
          value={data.company ?? ""}
          error={errors.company}
          onChangeText={(value) =>
            setData((prev) => ({ ...prev, company: value }))
          }
        />
      ) : null}

      <CustomTextInput
        label={`Nome do ${personalDataConfig.roleLabel}`}
        placeholder={`Digite o nome do ${personalDataConfig.roleLabel}`}
        value={data.name}
        error={errors.name}
        onChangeText={(value) => setData((prev) => ({ ...prev, name: value }))}
      />

      <CustomTextInput
        label={personalDataConfig.documentLabel}
        placeholder={personalDataConfig.documentPlaceholder}
        value={data.document}
        error={errors.document}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, document: value }))
        }
      />
    </View>
  )
}

export default PersonalData