import { useMultiStepForm } from "@/hooks/useMultiStepForm"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
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
  LAUNCHER_PROVIDER: "Provedora de Lancamento",
  PAYLOAD_HANDLER: "Operador de Lancamento",
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

  const validations = {
    signUpType: [],
    name: [],
    document: [],
    email: [],
    phone: [],
    password: [],
    confirmPassword: [],
  }

  const handleSubmit = () => {
    console.log(data)
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
    <View className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <View className="mb-6 gap-4">


        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-medium text-slate-500">
              Etapa {currentStepIndex + 1} de {steps.length}
            </Text>
         
          </View>
        </View>
      </View>

      {step}

      <View className="mt-8 flex-row items-center gap-3">
        {!isFirstStep ? (
          <TouchableOpacity
            onPress={() => back()}
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
            {isLastStep ? "Finalizar" : "Avancar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpForm
