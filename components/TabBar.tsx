import { Tabs } from "expo-router"

const CustomButton = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="new-package"
        options={{
          title: "Novo Envio",
        }}
      />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="package-detail" options={{ href: null }} />
    </Tabs>
  )
}

export default CustomButton
