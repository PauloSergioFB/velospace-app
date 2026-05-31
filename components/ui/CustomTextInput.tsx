import { CustomTextInputProps } from "@/types"
import { Text, TextInput, View } from "react-native"



const CustomTextInput = ({
  label,
  placeholder,
  value,
  error,
  onChangeText,
  keyboardType,
  dataMask = (inputValue: string) => inputValue,
}: CustomTextInputProps) => {
  return (
    <View className="mb-4 gap-2">
      <Text className="text-sm font-medium text-slate-700">{label}</Text>
      <TextInput
        className="min-h-14 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900"
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={(inputValue) => onChangeText(dataMask(inputValue))}
        keyboardType={keyboardType}
      />
      {error ? <Text className="text-sm text-red-500">{error}</Text> : null}
    </View>
  )
}

export default CustomTextInput
