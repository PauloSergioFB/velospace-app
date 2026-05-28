import { SafeAreaView } from "react-native-safe-area-context"
import Loader from "./Loader"

const LoadScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Loader />
    </SafeAreaView>
  )
}

export default LoadScreen
