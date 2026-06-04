import {
  formatDecimal,
  validateForm,
  validateNumber,
  validatePositive,
  validateRequired,
} from "@/utils/masks"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import CustomTextInput from "./ui/CustomTextInput"

const NewPackageForm = () => {
  const [data, setData] = useState({
    name: "",
    company: "",
    height: "",
    width: "",
    length: "",
    weight: "",
    justify: "",
  })

  const [dataErrors, setDataErrors] = useState({
    name: "",
    company: "",
    height: "",
    width: "",
    length: "",
    weight: "",
    justify: "",
  })

  const validations = {
    name: [validateRequired],
    company: [validateRequired],
    height: [validateRequired, validateNumber, validatePositive],
    width: [validateRequired, validateNumber, validatePositive],
    length: [validateRequired, validateNumber, validatePositive],
    weight: [validateRequired, validateNumber, validatePositive],
    justify: [validateRequired],
  }

  const handleSubmit = () => {
    const [validatedData, newErrors] = validateForm(data, validations)
    setDataErrors(newErrors)

    if (Object.values(newErrors).some((err) => err)) {
      console.log("Dados inválidos!", newErrors)
      return
    }

    console.log("Dados válidos!", validatedData)
  }

  return (
    <View
      style={{
        width: "100%",
        borderRadius: 24,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.08,
        shadowRadius: 14,
        elevation: 4,
      }}
    >
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: "#0F172A",
            marginBottom: 6,
          }}
        >
          Dados do satélite
        </Text>

        <Text
          style={{
            fontSize: 14,
            lineHeight: 20,
            color: "#64748B",
          }}
        >
          Preencha os dados técnicos para continuar com o envio.
        </Text>
      </View>

      <CustomTextInput
        label="Nome"
        placeholder="Defina um nome para seu satélite"
        value={data.name}
        error={dataErrors.name}
        onChangeText={(value) => setData((prev) => ({ ...prev, name: value }))}
      />

      <CustomTextInput
        label="Empresa"
        placeholder="Informe o nome da empresa"
        value={data.company}
        error={dataErrors.company}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, company: value }))
        }
      />

      <View
        style={{
          flexDirection: "row",
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomTextInput
            label="Altura"
            placeholder="Altura"
            value={data.height}
            error={dataErrors.height}
            onChangeText={(value) =>
              setData((prev) => ({ ...prev, height: value }))
            }
            dataMask={formatDecimal}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomTextInput
            label="Largura"
            placeholder="Largura"
            value={data.width}
            error={dataErrors.width}
            onChangeText={(value) =>
              setData((prev) => ({ ...prev, width: value }))
            }
            dataMask={formatDecimal}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomTextInput
            label="Comprimento"
            placeholder="Comprimento"
            value={data.length}
            error={dataErrors.length}
            onChangeText={(value) =>
              setData((prev) => ({ ...prev, length: value }))
            }
            dataMask={formatDecimal}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomTextInput
            label="Peso"
            placeholder="Peso"
            value={data.weight}
            error={dataErrors.weight}
            onChangeText={(value) =>
              setData((prev) => ({ ...prev, weight: value }))
            }
            dataMask={formatDecimal}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <CustomTextInput
        label="Justificativa"
        placeholder="Por que seu satélite deve ser selecionado?"
        value={data.justify}
        error={dataErrors.justify}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, justify: value }))
        }
      />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleSubmit}
        style={{
          minHeight: 56,
          marginTop: 12,
          borderRadius: 999,
          backgroundColor: "#059669",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#FFFFFF",
          }}
        >
          Enviar solicitação
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default NewPackageForm
