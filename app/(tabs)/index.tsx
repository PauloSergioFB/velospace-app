import HomeContent from "@/components/HomeContent"
import Header from "@/components/ui/Header"
import { useHome } from "@/hooks/useHome"
import { SafeAreaView } from "react-native-safe-area-context"

const Home = () => {
  const home = useHome()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <Header userName={home.userName} />
      <HomeContent {...home} />
    </SafeAreaView>
  )
}

export default Home
