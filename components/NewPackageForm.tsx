import { formatDecimal } from "@/utils/masks"
import {
  validateForm,
  validateNumber,
  validatePositive,
  validateRequired,
} from "@/utils/validations"
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
    company: [validateRequired], // Validar empresa existente ...
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
      console.log("Dados inválidos!", dataErrors)
      return
    }

    // TO-DO Chamar api para criar nova carga
    console.log("Dados válidos!", validatedData)
  }

  return (
    <View>
      {/* TO-DO incluir unidade de medida para campos de medidas (kg, cm) */}
      {/* TO-DO campo empresa de empresa deve ser um dropdown */}
      <CustomTextInput
        label="Nome"
        placeholder="Defina um nome para seu satélite"
        value={data["name"]}
        error={dataErrors["name"]}
        onChangeText={(value) => setData((prev) => ({ ...prev, name: value }))}
      />
      <CustomTextInput
        label="Empresa"
        placeholder="Informe o nome da empresa"
        value={data["company"]}
        error={dataErrors["company"]}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, company: value }))
        }
      />
      <CustomTextInput
        label="Altura"
        placeholder="Insira a altura do satélite"
        value={data["height"]}
        error={dataErrors["height"]}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, height: value }))
        }
        dataMask={formatDecimal}
        keyboardType="decimal-pad"
      />
      <CustomTextInput
        label="Largura"
        placeholder="Insira a largura do satélite"
        value={data["width"]}
        error={dataErrors["width"]}
        onChangeText={(value) => setData((prev) => ({ ...prev, width: value }))}
        dataMask={formatDecimal}
        keyboardType="decimal-pad"
      />
      <CustomTextInput
        label="Comprimento" // Nao tem termo melhor?
        placeholder="Insira do comprimento do satélite"
        value={data["length"]}
        error={dataErrors["length"]}
        onChangeText={(value) => setData((prev) => ({ ...prev, depth: value }))}
        dataMask={formatDecimal}
        keyboardType="decimal-pad"
      />
      <CustomTextInput
        label="Peso"
        placeholder="Insira o peso do satélite"
        value={data["weight"]}
        error={dataErrors["weight"]}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, weight: value }))
        }
        dataMask={formatDecimal}
        keyboardType="decimal-pad"
      />
      <CustomTextInput
        label="Justificativa"
        placeholder="Porque seu satélite deve ser selecionado?"
        value={data["justify"]}
        error={dataErrors["justify"]}
        onChangeText={(value) =>
          setData((prev) => ({ ...prev, justify: value }))
        }
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Enviar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NewPackageForm
