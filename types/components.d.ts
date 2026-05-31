import { KeyboardTypeOptions } from "react-native"

export interface CustomTextInputProps {
  label: string
  placeholder: string
  value: string
  error?: string
  onChangeText: (value) => void
  keyboardType?: KeyboardTypeOptions
  dataMask?: (value: string) => string
}
