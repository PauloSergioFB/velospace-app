export type UserType = "SHIPPER" | "LAUNCHER_PROVIDER" | "PAYLOAD_HANDLER"

export interface User {
  id: number
  name: string
  email: string
  type: UserType
}

export const SIGN_IN_TYPE_LABELS: Record<UserType, string> = {
  SHIPPER: "Expedidor",
  LAUNCHER_PROVIDER: "Provedora de Lancamento",
  PAYLOAD_HANDLER: "Operador de Lancamento",
}

export const SIGN_IN_OPTIONS = [
  { id: "SHIPPER", label: "Expedidor" },
  { id: "LAUNCHER_PROVIDER", label: "Provedora de Lancamento" },
  { id: "PAYLOAD_HANDLER", label: "Operador de Lancamento" },
] as const

export { isValidEmail } from "@/utils/masks"

export const createUser = (email: string, type: UserType): User => ({
  id: 1,
  name: "Usuário",
  email,
  type,
})
