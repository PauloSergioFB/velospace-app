import ModalSelect, { Option } from "@/components/ui/ModalSelect"
import { SIGN_IN_OPTIONS } from "@/lib/auth"
import React, { useState } from "react"
import { SafeAreaView, Text } from "react-native"

interface SignInTypeProps {
  data: any
  setData: any
  errors: any
}

const SignInType = ({ data, setData, errors }: SignInTypeProps) => {
  const [openModal, setOpenModal] = useState(false)

  const option: Option[] = SIGN_IN_OPTIONS as unknown as Option[]

  const optionSelected =
    option.find((currentOption) => currentOption.id === data.signInType) || null

  function handleOptionSelected(selectedOption: Option) {
    setData((prev: any) => ({
      ...prev,
      signInType: selectedOption.id,
    }))

    setOpenModal(false)
  }

  return (
    <SafeAreaView className="gap-4">

      <ModalSelect
        title="Tipo de login"
        visible={openModal}
        value={optionSelected}
        options={option}
        openModal={() => setOpenModal(true)}
        closeModal={() => setOpenModal(false)}
        optionSelected={handleOptionSelected}
      />

      {errors?.signInType ? (
        <Text className="text-sm text-red-500">{errors.signInType}</Text>
      ) : null}
    </SafeAreaView>
  )
}

export default SignInType