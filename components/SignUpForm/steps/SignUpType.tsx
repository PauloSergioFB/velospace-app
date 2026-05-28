import { Text, TouchableOpacity, View } from "react-native"

interface SignUpTypeProps {
  data: any
  setData: any
  errors: any
}

const SignUpType = ({ data, setData, errors }: SignUpTypeProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={(prev) => setData({ ...prev, signUpType: "SHIPPER" })}
      >
        <Text>Expedidor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(prev) =>
          setData({ ...prev, signUpType: "LAUNCHER_PROVIDER" })
        }
      >
        <Text>Provedora de Lançamento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(prev) => setData({ ...prev, signUpType: "PAYLOAD_HANDLER" })}
      >
        <Text>Operador de Lançamento</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUpType
