import type { User } from "@/lib/auth"

const API_BASE_URL = "https://velospace-rm559914.azurewebsites.net"

type LoginPayload = {
  email: string
  password: string
  signInType?: User["type"] | ""
}

type LoginResult = {
  token: string
  user: User
}

const parseResponsePayload = async (response: Response) => {
  const responseText = await response.text()

  if (!responseText) return null

  try {
    return JSON.parse(responseText) as unknown
  } catch {
    return responseText
  }
}

const extractErrorMessage = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return null

  const candidate = payload as Record<string, unknown>

  if (typeof candidate.message === "string") return candidate.message
  if (typeof candidate.error === "string") return candidate.error

  for (const value of Object.values(candidate)) {
    if (typeof value === "string" && value.trim()) return value
  }

  return null
}

const normalizeUserType = (value: unknown): User["type"] | null => {
  if (value === "SHIPPER") return "SHIPPER"
  if (value === "LAUNCHER_PROVIDER") return "LAUNCHER_PROVIDER"
  if (value === "PAYLOAD_HANDLER") return "PAYLOAD_HANDLER"
  return null
}

const decodeJwtPayload = (token: string) => {
  const [, payload] = token.split(".")

  if (!payload) return null

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
    const decoded = atob(padded)
    return JSON.parse(decoded) as Record<string, unknown>
  } catch {
    return null
  }
}

const buildUserFromPayload = (
  payload: unknown,
  fallback: Pick<LoginPayload, "email" | "signInType">,
): User => {
  const candidate =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : null

  const nestedUser =
    candidate?.user && typeof candidate.user === "object"
      ? (candidate.user as Record<string, unknown>)
      : null

  const idCandidate =
    nestedUser?.id ??
    nestedUser?.user_id ??
    candidate?.id ??
    candidate?.user_id

  const nameCandidate =
    nestedUser?.name ??
    nestedUser?.corporate_name ??
    candidate?.name ??
    candidate?.corporate_name

  const emailCandidate =
    nestedUser?.email ?? candidate?.email ?? fallback.email

  const typeCandidate = normalizeUserType(
    nestedUser?.type ?? candidate?.type ?? fallback.signInType,
  )

  return {
    id: typeof idCandidate === "number" ? idCandidate : 1,
    name:
      typeof nameCandidate === "string" && nameCandidate.trim()
        ? nameCandidate
        : fallback.email,
    email:
      typeof emailCandidate === "string" && emailCandidate.trim()
        ? emailCandidate
        : fallback.email,
    type: typeCandidate ?? "SHIPPER",
  }
}

const extractToken = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return null

  const candidate = payload as Record<string, unknown>

  const tokenCandidate =
    candidate.token ??
    candidate.access_token ??
    candidate.jwt_token ??
    candidate.jwt

  return typeof tokenCandidate === "string" && tokenCandidate.trim()
    ? tokenCandidate
    : null
}

export const login = async ({
  email,
  password,
  signInType,
}: LoginPayload): Promise<LoginResult> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const payload = await parseResponsePayload(response)

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(payload) ||
        (typeof payload === "string" && payload) ||
        "Nao foi possivel fazer login.",
    )
  }

  const token = extractToken(payload)

  if (!token) {
    throw new Error("Resposta de autenticacao sem token.")
  }

  const jwtPayload = decodeJwtPayload(token)
  const mergedPayload =
    payload && typeof payload === "object"
      ? { ...(payload as Record<string, unknown>), ...(jwtPayload ?? {}) }
      : jwtPayload

  return {
    token,
    user: buildUserFromPayload(mergedPayload, { email, signInType }),
  }
}

export const getUser = async (jwtToken: string) => {
  const payload = decodeJwtPayload(jwtToken)

  if (!payload) return null

  return buildUserFromPayload(payload, {
    email: typeof payload.email === "string" ? payload.email : "",
    signInType: normalizeUserType(payload.type) ?? undefined,
  })
}

