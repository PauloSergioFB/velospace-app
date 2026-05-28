import { Dispatch, SetStateAction } from "react"

export interface AuthContextType {
  user: User | null
  loading: boolean
  setUser: Dispatch<SetStateAction<User?>>
}
