import { useRouter } from "expo-router"
import { useContext, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import CustomTextInput from "@/components/ui/CustomTextInput"
import { AuthContext } from "@/contexts/AuthContext"
import { useMultiStepForm } from "@/hooks/useMultiStepForm"
import { createUser, isValidEmail, SIGN_IN_TYPE_LABELS, UserType } from "@/lib/auth"
import SignInType from "./steps/SignInType"

interface SignInData {
  signInType: UserType | ""
  email: string
  password: string
}

const SignInForm = () => {
  const router = useRouter()
  const { setUser } = useContext(AuthContext)

  const [data, setData] = useState<SignInData>({
    signInType: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    signInType: "",
    email: "",
    password: "",
  })

  const validate = () => {
    const nextErrors = {
      signInType: "",
      email: "",
      password: "",
    }

    const trimmedEmail = data.email.trim()

    if (!data.signInType.trim()) {
      nextErrors.signInType = "O tipo de login é obrigatório"
    }

    if (!trimmedEmail) {
      nextErrors.email = "O email é obrigatório"
    } else if (!isValidEmail(trimmedEmail)) {
      nextErrors.email = "Digite um email válido"
    }

    if (!data.password.trim()) {
      nextErrors.password = "A senha é obrigatória"
    }

    setErrors(nextErrors)

    if (!nextErrors.email) {
      setData((prev) => ({ ...prev, email: trimmedEmail }))
    }

    return !nextErrors.signInType && !nextErrors.email && !nextErrors.password
  }

  const handleSubmit = () => {
    if (!validate()) return

    setUser(createUser(data.email, data.signInType as UserType))

    router.replace("/(tabs)")
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <SignInType key={1} data={data} setData={setData} errors={errors} />,
      <View key={2} className="gap-2">
        <View className="gap-1">
          <Text className="text-2xl font-semibold text-slate-900">Login</Text>
          <Text className="text-sm leading-6 text-slate-500">
            Entre com seu email e senha para continuar.
          </Text>
        </View>

        <CustomTextInput
          label="Email"
          placeholder="Digite seu email"
          value={data.email}
          error={errors.email}
          onChangeText={(value) =>
            setData((prev) => ({ ...prev, email: value }))
          }
          keyboardType="email-address"
        />

        <CustomTextInput
          label="Senha"
          placeholder="Digite sua senha"
          value={data.password}
          error={errors.password}
          onChangeText={(value) =>
            setData((prev) => ({ ...prev, password: value }))
          }
        />
      </View>,
    ])

  const selectedSignInTypeLabel = data.signInType
    ? SIGN_IN_TYPE_LABELS[data.signInType] ?? data.signInType
    : "Tipo de login"

  return (
    <View className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <View className="mb-6 gap-4">
        <View className="gap-2">
          <Text className="text-sm font-medium text-slate-500">
            Etapa {currentStepIndex + 1} de {steps.length}
          </Text>
          <Text className="text-sm text-slate-500">
            {selectedSignInTypeLabel}
          </Text>
        </View>
      </View>

      {step}

      <View className="mt-8 flex-row items-center gap-3">
        {!isFirstStep ? (
          <TouchableOpacity
            onPress={back}
            className="min-h-14 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4"
          >
            <Text className="font-semibold text-slate-700">Voltar</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            if (isLastStep) {
              handleSubmit()
              return
            }
            next()
          }}
          className="min-h-14 flex-1 items-center justify-center rounded-xl bg-red-500 px-4"
        >
          <Text className="font-semibold text-white">
            {isLastStep ? "Entrar" : "Avancar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignInForm
