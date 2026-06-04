import PackageDetailView from "@/components/PackageDetailView"
import { usePackageDetail } from "@/hooks/usePackageDetail"
import { useLocalSearchParams } from "expo-router"

const PackageDetail = () => {
  const { payloadId } = useLocalSearchParams<{ payloadId: string }>()
  const { packageDetail, notFound, handleBack } = usePackageDetail(payloadId)

  return (
    <PackageDetailView
      packageDetail={packageDetail}
      notFound={notFound}
      onBack={handleBack}
    />
  )
}

export default PackageDetail
