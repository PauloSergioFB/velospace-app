import { useRouter } from "expo-router"
import { useContext, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import CustomTextInput from "@/components/ui/CustomTextInput"
import { AuthContext } from "@/contexts/AuthContext"
import { useMultiStepForm } from "@/hooks/useMultiStepForm"
import { createUser, SIGN_IN_TYPE_LABELS, UserType } from "@/lib/auth"
import { validateEmail, validateForm, validateRequired } from "@/utils/masks"
import Loader from "../ui/Loader"
import SignInType from "./steps/SignInType"

interface SignInData {
  signInType: UserType | ""
  email: string
  password: string
}

const SignInForm = () => {
  const router = useRouter()
  const { setUser } = useContext(AuthContext)
  const [isNavigatingToSignUp, setIsNavigatingToSignUp] = useState(false)

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
    const [validatedData, nextErrors] = validateForm(data, {
      signInType: [
        (value) => validateRequired(value, "O tipo de login é obrigatório"),
      ],
      email: [
        (value) => validateRequired(value, "O email é obrigatório"),
        validateEmail,
      ],
      password: [
        (value) => validateRequired(value, "A senha é obrigatória"),
      ],
    })

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) return null

    setData(validatedData)
    return validatedData
  }

  const validateCurrentStep = () => {
    if (currentStepIndex !== 0) return true

    const [, nextErrors] = validateForm(
      { signInType: data.signInType },
      {
        signInType: [
          (value) => validateRequired(value, "O tipo de login é obrigatório"),
        ],
      },
    )

    setErrors((prev) => ({ ...prev, signInType: nextErrors.signInType }))

    return !nextErrors.signInType
  }

  const handleSubmit = () => {
    const validatedData = validate()

    if (!validatedData) return

    setUser(createUser(validatedData.email, validatedData.signInType as UserType))
    router.replace("/(tabs)")
  }

  async function loader() {
    setIsNavigatingToSignUp(true)

    await new Promise((resolve) => setTimeout(resolve, 300))
    await router.push("/(auth)/sign-up")

    setIsNavigatingToSignUp(false)
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <SignInType
        key={1}
        data={data}
        setData={setData}
        errors={errors}
        setErrors={setErrors}
      />,

      <View key={2} style={{ width: "100%" }}>
        <View style={{ marginBottom: 8, alignItems: "center", gap: 8 }}>
          <Text
            style={{
              maxWidth: 280,
              textAlign: "center",
              fontSize: 14,
              lineHeight: 20,
              color: "#0F172A",
            }}
          >
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

  if (isNavigatingToSignUp) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Loader />
        <Text
          style={{
            fontSize: 14,
            color: "#475569",
          }}
        >
          Carregando cadastro...
        </Text>
      </View>
    )
  }

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          marginBottom: 20,
          alignItems: "center",
          gap: 4,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#059669",
          }}
        >
          Etapa {currentStepIndex + 1} de {steps.length}
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: "#64748B",
          }}
        >
          {selectedSignInTypeLabel}
        </Text>
      </View>

      {step}

      <View
        style={{
          marginTop: 32,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        {!isFirstStep ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={back}
            style={{
              minHeight: 56,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              borderWidth: 1,
              borderColor: "#E2E8F0",
              backgroundColor: "#FFFFFF",
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Voltar
            </Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (isLastStep) {
              handleSubmit()
              return
            }

            if (!validateCurrentStep()) return

            next()
          }}
          style={{
            minHeight: 56,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            backgroundColor: "#059669",
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: "#FFFFFF",
            }}
          >
            {isLastStep ? "Entrar" : "Avançar"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 24, alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={loader}>
          <Text style={{ color: "#F97316", fontWeight: "600" }}>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignInForm
