// Payload
enum PayloadStatusCode {
  PENDING_APPROVAL = "PENDING_APPROVAL",
  REJECTED = "REJECTED",

  AWAITING_SHIPMENT = "AWAITING_SHIPMENT",
  AWAITING_DISPATCH = "AWAITING_DISPATCH",
  IN_TRANSIT = "IN_TRANSIT",

  RECEIVED_AT_BASE = "RECEIVED_AT_BASE",
  PENDING_SCREENING = "PENDING_SCREENING",
  SCREENING_REJECTED = "SCREENING_REJECTED",

  READY_FOR_LAUNCH = "READY_FOR_LAUNCH",
  AWAITING_LAUNCH = "AWAITING_LAUNCH",
  LAUNCHED = "LAUNCHED",
}

interface PayloadListItemResponse {
  payload_id: number
  name: string
  tracking_code: string | null
  status: PayloadStatusResponse
}

interface PayloadStatusResponse {
  payload_status_id: number
  code: PayloadStatusCode
  description: string
}
