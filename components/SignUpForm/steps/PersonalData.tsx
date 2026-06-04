import CustomTextInput from "@/components/ui/CustomTextInput"
import { Text, View } from "react-native"
import { SignUpData } from ".."

interface PersonalDataProps {
  data: SignUpData
  setData: React.Dispatch<React.SetStateAction<SignUpData>>
  errors: any
}

const DEFAULT_PERSONAL_DATA_CONFIG = {
  showCompanyField: false,
  documentLabel: "CPF/CNPJ",
  documentPlaceholder: "Insira seu CPF/CNPJ",
  nameLabel: "Nome",
  namePlaceholder: "Digite seu nome",
}

const PERSONAL_DATA_CONFIG: Record<
  string,
  typeof DEFAULT_PERSONAL_DATA_CONFIG
> = {
  SHIPPER: {
    showCompanyField: false,
    documentLabel: "CPF/CNPJ",
    documentPlaceholder: "Insira seu CPF/CNPJ",
    nameLabel: "Nome do Expedidor",
    namePlaceholder: "Digite o nome do Expedidor",
  },
  LAUNCHER_PROVIDER: {
    showCompanyField: false,
    documentLabel: "CNPJ",
    documentPlaceholder: "Insira seu CNPJ",
    nameLabel: "Razao social",
    namePlaceholder: "Digite a razao social",
  },
  PAYLOAD_HANDLER: {
    showCompanyField: true,
    documentLabel: "CPF",
    documentPlaceholder: "Insira seu CPF",
    nameLabel: "Nome do Operador de Lancamento",
    namePlaceholder: "Digite o nome do Operador de Lancamento",
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
          Preencha as informacoes basicas do cadastro.
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
        label={personalDataConfig.nameLabel}
        placeholder={personalDataConfig.namePlaceholder}
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
