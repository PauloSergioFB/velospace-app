export * from "./components"
export * from "./contexts"
export * from "./responses"
export * from "./utils"

export enum UserType {
  "LAUNCHER_PROVIDER",
  "PAYLOAD_HANDLER",
  "SHIPPER",
}

export interface User {
  id: number
  name: string
  email: string
  type: UserType
}
