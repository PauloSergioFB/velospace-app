import { useRouter } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import CustomTextInput from "@/components/ui/CustomTextInput"
import ModalSelect from "@/components/ui/ModalSelect"
import PageButton from "@/components/ui/PageButton"
import { AuthContext } from "@/contexts/AuthContext"
import { SIGN_IN_OPTIONS } from "@/lib/auth"

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
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)

  useEffect(() => {
    if (user) {
      setRole(user.type as unknown as string)
      setName(user.name ?? "")
      setEmail(user.email ?? "")
    }
  }, [user])

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  function handleSave() {
    let isValid = true

    setRoleError("")
    setNameError("")
    setEmailError("")
    setPasswordError("")

    if (!role.trim()) {
      setRoleError("O cargo é obrigatório")
      isValid = false
    }

    if (!name.trim()) {
      setNameError("O nome é obrigatório")
      isValid = false
    }

    if (!email.trim()) {
      setEmailError("O email é obrigatório")
      isValid = false
    } else if (!validateEmail(email)) {
      setEmailError("Digite um email válido")
      isValid = false
    }

    if (!password.trim()) {
      setPasswordError("A senha é obrigatória")
      isValid = false
    } else if (password.length < 6) {
      setPasswordError("A senha precisa ter ao menos 6 caracteres")
      isValid = false
    }

    if (!isValid) {
      return
    }

    if (setUser) {
      setUser({
        id: user?.id ?? 1,
        name,
        email,
        type: (role as unknown) as any,
      })
    }

    console.log("Saved profile", { role, name, email })
    router.back()
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1 px-5 py-8">
        <View className="mb-8 gap-2">
          <Text className="text-4xl font-black tracking-tight text-slate-950">
            Perfil do Usuário
          </Text>
          <Text className="text-slate-500">Atualize seus dados abaixo.</Text>
        </View>

        <View className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <ModalSelect
            title="Cargo"
            visible={isRoleModalOpen}
            value={SIGN_IN_OPTIONS.find((o) => o.id === role) ?? null}
            options={SIGN_IN_OPTIONS as any}
            openModal={() => setIsRoleModalOpen(true)}
            closeModal={() => setIsRoleModalOpen(false)}
            optionSelected={(opt: any) => setRole(String(opt.id))}
          />
          {roleError ? <Text className="text-sm text-red-500">{roleError}</Text> : null}

          <CustomTextInput
            label="Nome"
            placeholder="Nome"
            value={name}
            error={nameError}
            onChangeText={setName}
          />

          <CustomTextInput
            label="Email"
            placeholder="Email"
            value={email}
            error={emailError}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomTextInput
            label="Senha"
            placeholder="Senha"
            value={password}
            error={passwordError}
            onChangeText={setPassword}
          />

          <View className="mt-4">
            <PageButton title="Salvar" onPress={handleSave} variant="primary" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile
