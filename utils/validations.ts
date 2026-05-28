export const validateForm = <T extends Record<string, any>>(
  data: T,
  validations: Validations<T>,
): [T, FormErrors<T>] => {
  const newErrors = {} as FormErrors<T>
  const validatedData = { ...data }

  for (const field in validations) {
    const typedField = field as keyof T
    const fieldValidations = validations[typedField]

    if (!fieldValidations) continue

    let value = validatedData[typedField]

    newErrors[typedField] = ""

    for (const validate of fieldValidations) {
      try {
        value = validate(value)
      } catch (error) {
        newErrors[typedField] =
          error instanceof Error ? error.message : "Erro desconhecido"

        break
      }
    }

    validatedData[typedField] = value
  }

  return [validatedData, newErrors]
}

export const validateRequired = (value: string) => {
  if (!value.trim()) throw new Error("Este campo é obrigatório")

  return value
}

export const validateNumber = (value: string) => {
  const numberValue = parseInt(value)

  if (isNaN(numberValue))
    throw new Error("Este campo deve ser um valor numérico")

  return numberValue
}

export const validatePositive = (value: number) => {
  if (value < 0) throw new Error("Este campo deve ser um valor positivo")

  return value
}
