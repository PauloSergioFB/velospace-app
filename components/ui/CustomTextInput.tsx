import { CustomTextInputProps } from "@/types"
import { Text, TextInput, View } from "react-native"

const CustomTextInput = ({
  label,
  placeholder,
  value,
  error,
  onChangeText,
  keyboardType,
  dataMask = (value: string) => value,
}: CustomTextInputProps) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={(value) => onChangeText(dataMask(value))}
        keyboardType={keyboardType}
      />
      {error && <Text>{error}</Text>}
    </View>
  )
}

export default CustomTextInput
