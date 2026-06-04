import { payloads } from "@/constants/mockData"
import { useRouter } from "expo-router"

const payloadStatusCodes = {
  PENDING_APPROVAL: "PENDING_APPROVAL" as PayloadStatusCode,
  REJECTED: "REJECTED" as PayloadStatusCode,
  AWAITING_SHIPMENT: "AWAITING_SHIPMENT" as PayloadStatusCode,
  AWAITING_DISPATCH: "AWAITING_DISPATCH" as PayloadStatusCode,
  IN_TRANSIT: "IN_TRANSIT" as PayloadStatusCode,
  RECEIVED_AT_BASE: "RECEIVED_AT_BASE" as PayloadStatusCode,
  PENDING_SCREENING: "PENDING_SCREENING" as PayloadStatusCode,
  SCREENING_REJECTED: "SCREENING_REJECTED" as PayloadStatusCode,
  READY_FOR_LAUNCH: "READY_FOR_LAUNCH" as PayloadStatusCode,
  AWAITING_LAUNCH: "AWAITING_LAUNCH" as PayloadStatusCode,
  LAUNCHED: "LAUNCHED" as PayloadStatusCode,
}

const PACKAGE_DETAIL_ACCENT_COLOR = "#078C4B"
const PACKAGE_DETAIL_ACCENT_SOFT_COLOR = "#DCFCE7"

interface PackageMeta {
  company: string
  requestedAt: string
  expectedLaunch: string | null
  dimensions: {
    heightCm: number
    widthCm: number
    lengthCm: number
    weightKg: number
  }
  objective: string
}

interface PackageTimelineStep {
  key: string
  title: string
  description: string
  dateLabel: string | null
  completed: boolean
  current: boolean
}

interface PackageDetailViewModel extends PayloadListItemResponse {
  company: string
  requestedAt: string
  expectedLaunch: string | null
  dimensions: {
    heightCm: number
    widthCm: number
    lengthCm: number
    weightKg: number
  }
  objective: string
  timeline: PackageTimelineStep[]
  progressPercent: number
  accentColor: string
  accentSoftColor: string
}

const payloadMetaById: Record<number, PackageMeta> = {
  1: {
    company: "Orbital Labs",
    requestedAt: "01/06/2026",
    expectedLaunch: null,
    dimensions: { heightCm: 24, widthCm: 12, lengthCm: 16, weightKg: 4.8 },
    objective: "Validar sensores termicos para missoes de baixa orbita.",
  },
  2: {
    company: "Nova Dynamics",
    requestedAt: "28/05/2026",
    expectedLaunch: "22/06/2026",
    dimensions: { heightCm: 32, widthCm: 22, lengthCm: 20, weightKg: 7.1 },
    objective: "Coletar dados ambientais para agricultura de precisao.",
  },
  3: {
    company: "Cube Frontier",
    requestedAt: "25/05/2026",
    expectedLaunch: "20/06/2026",
    dimensions: { heightCm: 18, widthCm: 18, lengthCm: 18, weightKg: 5.2 },
    objective: "Monitorar comunicacao entre modulos cubesat em bancada orbital.",
  },
  4: {
    company: "Astra Mobility",
    requestedAt: "19/05/2026",
    expectedLaunch: "18/06/2026",
    dimensions: { heightCm: 40, widthCm: 28, lengthCm: 24, weightKg: 8.3 },
    objective: "Levar prototipo de controle autonomo para validacao remota.",
  },
  5: {
    company: "Helios Space",
    requestedAt: "14/05/2026",
    expectedLaunch: "12/06/2026",
    dimensions: { heightCm: 26, widthCm: 16, lengthCm: 14, weightKg: 4.1 },
    objective: "Integrar carga util a base de recebimento para testes finais.",
  },
  6: {
    company: "Pulsar Systems",
    requestedAt: "12/05/2026",
    expectedLaunch: "10/06/2026",
    dimensions: { heightCm: 30, widthCm: 18, lengthCm: 15, weightKg: 5.9 },
    objective: "Executar triagem tecnica e validar requisitos de seguranca.",
  },
  7: {
    company: "Argo Aerospace",
    requestedAt: "09/05/2026",
    expectedLaunch: "08/06/2026",
    dimensions: { heightCm: 34, widthCm: 19, lengthCm: 18, weightKg: 6.4 },
    objective: "Concluir checklist final para autorizacao de lancamento.",
  },
  8: {
    company: "Titan Labs",
    requestedAt: "06/05/2026",
    expectedLaunch: "06/06/2026",
    dimensions: { heightCm: 36, widthCm: 24, lengthCm: 20, weightKg: 7.9 },
    objective: "Aguardar janela orbital confirmada pela operacao.",
  },
  9: {
    company: "Vega Cube",
    requestedAt: "28/04/2026",
    expectedLaunch: "02/06/2026",
    dimensions: { heightCm: 22, widthCm: 14, lengthCm: 14, weightKg: 3.7 },
    objective: "Missao concluida com carga posicionada em orbita de teste.",
  },
  10: {
    company: "Ion Spark",
    requestedAt: "27/04/2026",
    expectedLaunch: null,
    dimensions: { heightCm: 29, widthCm: 17, lengthCm: 17, weightKg: 5.4 },
    objective: "Solicitacao recusada por nao atender criterios tecnicos minimos.",
  },
}

const timelineTemplate = [
  {
    key: "PENDING_APPROVAL",
    title: "Solicitacao recebida",
    description: "O pedido entrou na fila inicial de avaliacao.",
  },
  {
    key: "AWAITING_SHIPMENT",
    title: "Aguardando postagem",
    description: "A equipe aprovou o envio e aguarda a remessa fisica.",
  },
  {
    key: "AWAITING_DISPATCH",
    title: "Aguardando despacho",
    description: "A carga ja foi postada e aguarda liberacao logistca.",
  },
  {
    key: "IN_TRANSIT",
    title: "Em transito",
    description: "O satelite esta em deslocamento para a base.",
  },
  {
    key: "RECEIVED_AT_BASE",
    title: "Recebido na base",
    description: "A base confirmou o recebimento da carga.",
  },
  {
    key: "PENDING_SCREENING",
    title: "Triagem tecnica",
    description: "O item esta passando por conferencia tecnica e de seguranca.",
  },
  {
    key: "READY_FOR_LAUNCH",
    title: "Pronto para lancamento",
    description: "Tudo aprovado para entrar na fila de lancamento.",
  },
  {
    key: "AWAITING_LAUNCH",
    title: "Aguardando janela",
    description: "A operacao aguarda a janela orbital disponivel.",
  },
  {
    key: "LAUNCHED",
    title: "Lancado",
    description: "Carga enviada com sucesso para a etapa orbital.",
  },
]

const blockedStatuses = new Set<PayloadStatusCode>([
  payloadStatusCodes.REJECTED,
  payloadStatusCodes.SCREENING_REJECTED,
])

const progressOrder: PayloadStatusCode[] = [
  payloadStatusCodes.PENDING_APPROVAL,
  payloadStatusCodes.AWAITING_SHIPMENT,
  payloadStatusCodes.AWAITING_DISPATCH,
  payloadStatusCodes.IN_TRANSIT,
  payloadStatusCodes.RECEIVED_AT_BASE,
  payloadStatusCodes.PENDING_SCREENING,
  payloadStatusCodes.READY_FOR_LAUNCH,
  payloadStatusCodes.AWAITING_LAUNCH,
  payloadStatusCodes.LAUNCHED,
]

const stepDatesByStatus: Partial<Record<PayloadStatusCode, string[]>> = {
  PENDING_APPROVAL: ["01/06/2026"],
  AWAITING_SHIPMENT: ["28/05/2026", "29/05/2026"],
  AWAITING_DISPATCH: ["25/05/2026", "26/05/2026", "27/05/2026"],
  IN_TRANSIT: ["19/05/2026", "20/05/2026", "21/05/2026", "23/05/2026"],
  RECEIVED_AT_BASE: [
    "14/05/2026",
    "15/05/2026",
    "16/05/2026",
    "17/05/2026",
    "18/05/2026",
  ],
  PENDING_SCREENING: [
    "12/05/2026",
    "13/05/2026",
    "14/05/2026",
    "15/05/2026",
    "16/05/2026",
    "18/05/2026",
  ],
  READY_FOR_LAUNCH: [
    "09/05/2026",
    "10/05/2026",
    "11/05/2026",
    "12/05/2026",
    "13/05/2026",
    "14/05/2026",
    "15/05/2026",
  ],
  AWAITING_LAUNCH: [
    "06/05/2026",
    "07/05/2026",
    "08/05/2026",
    "09/05/2026",
    "10/05/2026",
    "11/05/2026",
    "12/05/2026",
    "13/05/2026",
  ],
  LAUNCHED: [
    "28/04/2026",
    "29/04/2026",
    "30/04/2026",
    "02/05/2026",
    "06/05/2026",
    "12/05/2026",
    "18/05/2026",
    "25/05/2026",
    "02/06/2026",
  ],
  REJECTED: ["27/04/2026"],
  SCREENING_REJECTED: [
    "27/04/2026",
    "28/04/2026",
    "29/04/2026",
    "30/04/2026",
    "02/05/2026",
    "04/05/2026",
  ],
}

const buildTimeline = (statusCode: PayloadStatusCode): PackageTimelineStep[] => {
  if (blockedStatuses.has(statusCode)) {
    const dates = stepDatesByStatus[statusCode] ?? []

    return [
      ...timelineTemplate.slice(0, 1).map((step, index) => ({
        ...step,
        dateLabel: dates[index] ?? null,
        completed: true,
        current: false,
      })),
      {
        key: statusCode,
        title:
          statusCode === payloadStatusCodes.REJECTED
            ? "Solicitacao rejeitada"
            : "Triagem rejeitada",
        description:
          statusCode === payloadStatusCodes.REJECTED
            ? "A solicitacao foi encerrada ainda na etapa inicial."
            : "A triagem tecnica encontrou impedimentos para prosseguir.",
        dateLabel: dates[dates.length - 1] ?? null,
        completed: false,
        current: true,
      },
    ]
  }

  const currentIndex = progressOrder.indexOf(statusCode)
  const dates = stepDatesByStatus[statusCode] ?? []

  return timelineTemplate.map((step, index) => ({
    ...step,
    dateLabel: index <= currentIndex ? dates[index] ?? null : null,
    completed: index < currentIndex,
    current: index === currentIndex,
  }))
}

export const usePackageDetail = (payloadId?: string) => {
  const router = useRouter()
  const parsedId = Number(payloadId)

  const payload =
    Number.isFinite(parsedId) && parsedId > 0
      ? payloads.find((item) => item.payload_id === parsedId)
      : undefined

  const handleBack = () => {
    router.back()
  }

  if (!payload) {
    return {
      packageDetail: null,
      notFound: true,
      handleBack,
    }
  }

  const meta = payloadMetaById[payload.payload_id]
  const timeline = buildTimeline(payload.status.code)
  const progressBase = blockedStatuses.has(payload.status.code)
    ? 15
    : ((progressOrder.indexOf(payload.status.code) + 1) / progressOrder.length) * 100

  const packageDetail: PackageDetailViewModel = {
    ...payload,
    ...meta,
    timeline,
    progressPercent: Math.round(progressBase),
    accentColor: PACKAGE_DETAIL_ACCENT_COLOR,
    accentSoftColor: PACKAGE_DETAIL_ACCENT_SOFT_COLOR,
  }

  return {
    packageDetail,
    notFound: false,
    handleBack,
  }
}

export type { PackageDetailViewModel, PackageTimelineStep }
