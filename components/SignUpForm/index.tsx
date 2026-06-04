import { useMultiStepForm } from "@/hooks/useMultiStepForm"
import { isValidEmail } from "@/lib/auth"
import { useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import ContactData from "./steps/ContactData"
import PersonalData from "./steps/PersonalData"
import Security from "./steps/Security"
import SignUpType from "./steps/SignUpType"

export interface SignUpData {
  signUpType: string
  company?: string
  name: string
  document: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const SIGN_UP_TYPE_LABELS: Record<string, string> = {
  SHIPPER: "Expedidor",
  LAUNCHER_PROVIDER: "Provedora de Lançamento",
  PAYLOAD_HANDLER: "Operador de Lançamento",
}

const SignUpForm = () => {
  const [data, setData] = useState<SignUpData>({
    signUpType: "",
    company: undefined,
    name: "",
    document: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [dataErrors, setDataErrors] = useState({
    signUpType: "",
    company: "",
    name: "",
    document: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = () => {
    const trimmedEmail = data.email.trim()

    const nextErrors = {
      ...dataErrors,
      email: "",
    }

    if (!trimmedEmail) {
      nextErrors.email = "O email é obrigatório"
    } else if (!isValidEmail(trimmedEmail)) {
      nextErrors.email = "Digite um email válido"
    }

    if (nextErrors.email) {
      setDataErrors(nextErrors)
      return
    }

    setData((prev) => ({ ...prev, email: trimmedEmail }))
    setDataErrors(nextErrors)

    console.log({ ...data, email: trimmedEmail })
  }

  const selectedSignUpTypeLabel = data.signUpType
    ? SIGN_UP_TYPE_LABELS[data.signUpType] ?? data.signUpType
    : "Tipo de cadastro"

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <SignUpType key={1} data={data} setData={setData} errors={dataErrors} />,
      <PersonalData
        key={2}
        data={data}
        setData={setData}
        errors={dataErrors}
      />,
      <ContactData key={3} data={data} setData={setData} errors={dataErrors} />,
      <Security key={4} data={data} setData={setData} errors={dataErrors} />,
    ])

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View
        style={{
          marginBottom: 18,
          alignItems: "center",
          gap: 4,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
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
            color: "#475569",
            textAlign: "center",
          }}
        >
          {selectedSignUpTypeLabel}
        </Text>
      </View>

      <ScrollView
        style={{ width: "100%", flex: 1 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {step}
      </ScrollView>

      <View
        style={{
          marginTop: 26,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        {!isFirstStep ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => back()}
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
                fontSize: 15,
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
              fontSize: 15,
              fontWeight: "600",
              color: "#FFFFFF",
            }}
          >
            {isLastStep ? "Finalizar" : "Avançar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpForm
