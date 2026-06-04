import {
  approvalRequests as initialApprovalRequests,
  employeeApprovalRequests as initialEmployeeApprovalRequests,
  payloads,
  type ApprovalRequest,
  type EmployeeApprovalRequest,
} from "@/constants/mockData"
import { AuthContext } from "@/contexts/AuthContext"
import type { UserType } from "@/lib/auth"
import { useRouter } from "expo-router"
import { useContext, useState } from "react"

export type ShipperHomeFilter = "ALL" | "PENDING" | "SHIPPED"
export type OperatorHomeFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED"
export type LauncherProviderHomeFilter =
  | "ALL"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"

const isShippedPayload = (item: PayloadListItemResponse) =>
  Boolean(item.tracking_code)

export const useHome = () => {
  const router = useRouter()
  const { user } = useContext(AuthContext)

  const [shipperFilter, setShipperFilter] = useState<ShipperHomeFilter>("ALL")
  const [operatorFilter, setOperatorFilter] =
    useState<OperatorHomeFilter>("PENDING")
  const [launcherProviderFilter, setLauncherProviderFilter] =
    useState<LauncherProviderHomeFilter>("PENDING")
  const [operatorRequests, setOperatorRequests] =
    useState<ApprovalRequest[]>(initialApprovalRequests)
  const [employeeRequests, setEmployeeRequests] = useState<
    EmployeeApprovalRequest[]
  >(initialEmployeeApprovalRequests)

  const currentUserType =
    (user?.type as unknown as UserType | undefined) ?? "SHIPPER"
  const isPayloadHandlerHome = currentUserType === "PAYLOAD_HANDLER"
  const isLauncherProviderHome = currentUserType === "LAUNCHER_PROVIDER"

  const shipperItems = payloads.filter((item) => {
    if (shipperFilter === "PENDING") return !isShippedPayload(item)
    if (shipperFilter === "SHIPPED") return isShippedPayload(item)
    return true
  })

  const filteredOperatorRequests = operatorRequests.filter((item) => {
    if (operatorFilter === "ALL") return true
    return item.status === operatorFilter
  })

  const filteredEmployeeRequests = employeeRequests.filter((item) => {
    if (launcherProviderFilter === "ALL") return true
    return item.status === launcherProviderFilter
  })

  const operatorSummary = {
    pending: operatorRequests.filter((item) => item.status === "PENDING").length,
    approved: operatorRequests.filter((item) => item.status === "APPROVED")
      .length,
    rejected: operatorRequests.filter((item) => item.status === "REJECTED")
      .length,
  }

  const employeeSummary = {
    pending: employeeRequests.filter((item) => item.status === "PENDING").length,
    approved: employeeRequests.filter((item) => item.status === "APPROVED")
      .length,
    rejected: employeeRequests.filter((item) => item.status === "REJECTED")
      .length,
  }

  const handleOpenPayloadDetail = (payloadId: number) => {
    router.push({
      pathname: "/package-detail",
      params: { payloadId },
    })
  }

  const handleApproveRequest = (requestId: number) => {
    setOperatorRequests((prev) =>
      prev.map((item) =>
        item.request_id === requestId ? { ...item, status: "APPROVED" } : item,
      ),
    )
  }

  const handleRejectRequest = (requestId: number) => {
    setOperatorRequests((prev) =>
      prev.map((item) =>
        item.request_id === requestId ? { ...item, status: "REJECTED" } : item,
      ),
    )
  }

  const handleApproveEmployeeRequest = (requestId: number) => {
    setEmployeeRequests((prev) =>
      prev.map((item) =>
        item.request_id === requestId ? { ...item, status: "APPROVED" } : item,
      ),
    )
  }

  const handleRejectEmployeeRequest = (requestId: number) => {
    setEmployeeRequests((prev) =>
      prev.map((item) =>
        item.request_id === requestId ? { ...item, status: "REJECTED" } : item,
      ),
    )
  }

  return {
    userName: user?.name ?? "Usuario",
    isPayloadHandlerHome,
    isLauncherProviderHome,
    shipperFilter,
    setShipperFilter,
    shipperItems,
    operatorFilter,
    setOperatorFilter,
    operatorRequests: filteredOperatorRequests,
    operatorSummary,
    launcherProviderFilter,
    setLauncherProviderFilter,
    employeeRequests: filteredEmployeeRequests,
    employeeSummary,
    handleOpenPayloadDetail,
    handleApproveRequest,
    handleRejectRequest,
    handleApproveEmployeeRequest,
    handleRejectEmployeeRequest,
  }
}
