import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import CustomTextInput from "@/components/ui/CustomTextInput"
import { AuthContext } from "@/contexts/AuthContext"
import {
  validateEmail,
  validateForm,
  validateMinLength,
  validateRequired,
} from "@/utils/masks"

const Profile = () => {
  const router = useRouter()
  const { user, setUser } = useContext(AuthContext)

  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [roleError, setRoleError] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    if (user) {
      setRole(user.type as unknown as string)
      setName(user.name ?? "")
      setEmail(user.email ?? "")
    }
  }, [user])

  function handleSave() {
    const [validatedData, newErrors] = validateForm(
      { role, name, email, password },
      {
        role: [(value) => validateRequired(value, "O cargo é obrigatório")],
        name: [(value) => validateRequired(value, "O nome é obrigatório")],
        email: [
          (value) => validateRequired(value, "O email é obrigatório"),
          validateEmail,
        ],
        password: [
          (value) => validateRequired(value, "A senha é obrigatória"),
          validateMinLength(6, "A senha precisa ter ao menos 6 caracteres"),
        ],
      },
    )

    setRoleError(newErrors.role)
    setNameError(newErrors.name)
    setEmailError(newErrors.email)
    setPasswordError(newErrors.password)

    if (Object.values(newErrors).some(Boolean)) return

    if (setUser) {
      setUser({
        id: user?.id ?? 1,
        name: validatedData.name,
        email: validatedData.email,
        type: validatedData.role as any,
      })
    }

    setRole(validatedData.role)
    setName(validatedData.name)
    setEmail(validatedData.email)
    setPassword(validatedData.password)

    console.log("Saved profile", {
      role: validatedData.role,
      name: validatedData.name,
      email: validatedData.email,
    })

    router.back()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#059669",
            borderRadius: 24,
            paddingHorizontal: 20,
            paddingVertical: 24,
            marginBottom: 24,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.18)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 86,
                height: 86,
                borderRadius: 999,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <Ionicons name="person" size={42} color="#059669" />
            </View>

            <Text
              style={{
                fontSize: 26,
                fontWeight: "800",
                color: "#FFFFFF",
                marginBottom: 4,
              }}
            >
              Perfil do Usuário
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: "#D1FAE5",
                textAlign: "center",
              }}
            >
              Atualize seus dados e mantenha sua conta em dia.
            </Text>
          </View>

          <View
            style={{
              position: "absolute",
              right: -35,
              top: -35,
              width: 120,
              height: 120,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.10)",
            }}
          />

          <View
            style={{
              position: "absolute",
              left: -30,
              bottom: -40,
              width: 100,
              height: 100,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 20,
            paddingVertical: 24,
            borderWidth: 1,
            borderColor: "#E2E8F0",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.08,
            shadowRadius: 14,
            elevation: 4,
          }}
        >
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: "#0F172A",
                marginBottom: 6,
              }}
            >
              Dados da conta
            </Text>

            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                color: "#64748B",
              }}
            >
              Edite suas informações de acesso e identificação.
            </Text>
          </View>

          <View style={{ marginBottom: 14 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "#334155",
                marginBottom: 8,
              }}
            >
              Cargo
            </Text>

            <View
              style={{
                minHeight: 54,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: roleError ? "#F87171" : "#E2E8F0",
                backgroundColor: "#F8FAFC",
                paddingHorizontal: 16,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: role ? "#0F172A" : "#94A3B8",
                }}
              >
                {role || "Cargo do usuário"}
              </Text>
            </View>

            {roleError ? (
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#EF4444",
                }}
              >
                {roleError}
              </Text>
            ) : null}
          </View>

          <CustomTextInput
            label="Nome"
            placeholder="Digite seu nome"
            value={name}
            error={nameError}
            onChangeText={setName}
          />

          <CustomTextInput
            label="Email"
            placeholder="Digite seu email"
            value={email}
            error={emailError}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomTextInput
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            error={passwordError}
            onChangeText={setPassword}
          />

          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSave}
              style={{
                minHeight: 56,
                borderRadius: 999,
                backgroundColor: "#059669",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#FFFFFF",
                }}
              >
                Salvar alterações
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
