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

  // TO-DO
  // Validação parcial a cada passo
  // Validação com contexto dos valores anteriores
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
      <Security key={3} data={data} setData={setData} errors={dataErrors} />,
    ])

  return (
    <View>
      <Text>
        Etapa: {currentStepIndex + 1} / {steps.length}
      </Text>
      {step}
      {!isFirstStep && (
        <TouchableOpacity onPress={() => back()}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          if (isLastStep) {
            handleSubmit()
            return
          }
          next()
        }}
      >
        <Text>{isLastStep ? "Finalizar" : "Avançar"}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUpForm
