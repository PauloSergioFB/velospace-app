import Banner from "@/components/Banner"
import type {
  ApprovalRequest,
  EmployeeApprovalRequest,
} from "@/constants/mockData"
import type {
  LauncherProviderHomeFilter,
  OperatorHomeFilter,
  ShipperHomeFilter,
} from "@/hooks/useHome"
import { Ionicons } from "@expo/vector-icons"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

interface HomeContentProps {
  isPayloadHandlerHome: boolean
  isLauncherProviderHome: boolean
  shipperFilter: ShipperHomeFilter
  setShipperFilter: (filter: ShipperHomeFilter) => void
  shipperItems: PayloadListItemResponse[]
  operatorFilter: OperatorHomeFilter
  setOperatorFilter: (filter: OperatorHomeFilter) => void
  operatorRequests: ApprovalRequest[]
  operatorSummary: {
    pending: number
    approved: number
    rejected: number
  }
  launcherProviderFilter: LauncherProviderHomeFilter
  setLauncherProviderFilter: (filter: LauncherProviderHomeFilter) => void
  employeeRequests: EmployeeApprovalRequest[]
  employeeSummary: {
    pending: number
    approved: number
    rejected: number
  }
  handleOpenPayloadDetail: (payloadId: number) => void
  handleApproveRequest: (requestId: number) => void
  handleRejectRequest: (requestId: number) => void
  handleApproveEmployeeRequest: (requestId: number) => void
  handleRejectEmployeeRequest: (requestId: number) => void
}

type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED"

const statusStyles: Record<
  ReviewStatus,
  {
    label: string
    backgroundColor: string
    color: string
  }
> = {
  PENDING: {
    label: "Pendente",
    backgroundColor: "#FEF3C7",
    color: "#B45309",
  },
  APPROVED: {
    label: "Aprovado",
    backgroundColor: "#DCFCE7",
    color: "#15803D",
  },
  REJECTED: {
    label: "Recusado",
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
  },
}

const priorityStyles: Record<
  ApprovalRequest["priority"],
  {
    backgroundColor: string
    color: string
  }
> = {
  Alta: {
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
  },
  Media: {
    backgroundColor: "#FEF3C7",
    color: "#B45309",
  },
  Baixa: {
    backgroundColor: "#E0F2FE",
    color: "#0369A1",
  },
}

const filterButtonStyle = (isActive: boolean) => ({
  paddingHorizontal: 18,
  paddingVertical: 9,
  borderRadius: 999,
  backgroundColor: isActive ? "#059669" : "#FFFFFF",
  borderWidth: isActive ? 0 : 1,
  borderColor: "#E2E8F0",
})

const filterButtonTextStyle = (isActive: boolean) => ({
  fontSize: 13,
  fontWeight: isActive ? ("700" as const) : ("600" as const),
  color: isActive ? "#FFFFFF" : "#475569",
})

const listContentStyle = {
  paddingBottom: 100,
  gap: 14,
}

const summaryCard = (label: string, value: number) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#FFFFFF",
      borderRadius: 18,
      padding: 14,
    }}
  >
    <Text
      style={{
        fontSize: 12,
        color: "#64748B",
        marginBottom: 4,
      }}
    >
      {label}
    </Text>
    <Text
      style={{
        fontSize: 24,
        fontWeight: "800",
        color: "#0F172A",
      }}
    >
      {value}
    </Text>
  </View>
)

const headerConfigByRole = {
  shipper: {
    title: (
      <>
        Meu <Text style={{ color: "#F97316" }}>Envio</Text>
      </>
    ),
    description:
      "Acompanhe o andamento dos satelites cadastrados e consulte cada etapa do envio.",
  },
  payloadHandler: {
    title: (
      <>
        Pedidos de <Text style={{ color: "#F97316" }}>Satelite</Text>
      </>
    ),
    description:
      "Analise as solicitacoes recebidas e aprove novos satelites para seguir o fluxo.",
  },
  launcherProvider: {
    title: (
      <>
        Aprovar <Text style={{ color: "#F97316" }}>Funcionario</Text>
      </>
    ),
    description:
      "Revise os pedidos de acesso da equipe e aceite novos funcionarios no fluxo operacional.",
  },
}

const HomeContent = ({
  isPayloadHandlerHome,
  isLauncherProviderHome,
  shipperFilter,
  setShipperFilter,
  shipperItems,
  operatorFilter,
  setOperatorFilter,
  operatorRequests,
  operatorSummary,
  launcherProviderFilter,
  setLauncherProviderFilter,
  employeeRequests,
  employeeSummary,
  handleOpenPayloadDetail,
  handleApproveRequest,
  handleRejectRequest,
  handleApproveEmployeeRequest,
  handleRejectEmployeeRequest,
}: HomeContentProps) => {
  const homeRole = isLauncherProviderHome
    ? "launcherProvider"
    : isPayloadHandlerHome
      ? "payloadHandler"
      : "shipper"

  const headerConfig = headerConfigByRole[homeRole]

  const headerBlock = (
    <>
      <Banner />

      <View
        style={{
          alignItems: "center",
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#059669",
            marginBottom: 6,
          }}
        >
          {headerConfig.title}
        </Text>

        <Text
          style={{
            fontSize: 13,
            lineHeight: 19,
            color: "#64748B",
            textAlign: "center",
            maxWidth: 300,
          }}
        >
          {headerConfig.description}
        </Text>
      </View>
    </>
  )

  if (homeRole === "shipper") {
    return (
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <FlatList
          data={shipperItems}
          keyExtractor={(item) => String(item.payload_id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={listContentStyle}
          ListHeaderComponent={
            <>
              {headerBlock}

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShipperFilter("ALL")}
                  style={filterButtonStyle(shipperFilter === "ALL")}
                >
                  <Text style={filterButtonTextStyle(shipperFilter === "ALL")}>
                    Todos
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShipperFilter("PENDING")}
                  style={filterButtonStyle(shipperFilter === "PENDING")}
                >
                  <Text
                    style={filterButtonTextStyle(shipperFilter === "PENDING")}
                  >
                    Pendente
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShipperFilter("SHIPPED")}
                  style={filterButtonStyle(shipperFilter === "SHIPPED")}
                >
                  <Text
                    style={filterButtonTextStyle(shipperFilter === "SHIPPED")}
                  >
                    Enviado
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
          ListEmptyComponent={
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 18,
                paddingVertical: 30,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#0F172A",
                  marginBottom: 6,
                }}
              >
                Nenhum envio encontrado
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  textAlign: "center",
                }}
              >
                Ajuste o filtro para visualizar outros satelites do seu historico.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => handleOpenPayloadDetail(item.payload_id)}
              style={{
                minHeight: 94,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: 18,
                padding: 14,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.08,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  backgroundColor: "#ECFDF5",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                }}
              >
                <Ionicons name="cube-outline" size={30} color="#059669" />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#0F172A",
                    marginBottom: 4,
                  }}
                >
                  {item.name}
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "600",
                    color: "#F97316",
                    marginBottom: 2,
                  }}
                >
                  {item.tracking_code ?? "Nao enviado"}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: "#64748B",
                  }}
                >
                  ID #{item.payload_id}
                </Text>
              </View>

              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 999,
                  backgroundColor: "#F1F5F9",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: "#475569",
                  }}
                >
                  {item.status.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }

  if (homeRole === "payloadHandler") {
    return (
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <FlatList
          data={operatorRequests}
          keyExtractor={(item) => String(item.request_id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={listContentStyle}
          ListHeaderComponent={
            <>
              {headerBlock}

              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                {summaryCard("Pendentes", operatorSummary.pending)}
                {summaryCard("Aprovados", operatorSummary.approved)}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                {[
                  { key: "PENDING", label: "Pendentes" },
                  { key: "APPROVED", label: "Aprovados" },
                  { key: "REJECTED", label: "Recusados" },
                  { key: "ALL", label: "Todos" },
                ].map((filter) => (
                  <TouchableOpacity
                    key={filter.key}
                    activeOpacity={0.8}
                    onPress={() =>
                      setOperatorFilter(filter.key as OperatorHomeFilter)
                    }
                    style={filterButtonStyle(operatorFilter === filter.key)}
                  >
                    <Text
                      style={filterButtonTextStyle(operatorFilter === filter.key)}
                    >
                      {filter.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          }
          ListEmptyComponent={
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 18,
                paddingVertical: 30,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#0F172A",
                  marginBottom: 6,
                }}
              >
                Nenhum pedido neste filtro
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  textAlign: "center",
                }}
              >
                Selecione outro status para revisar novas solicitacoes de satelite.
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const badgeStyle = statusStyles[item.status]
            const priorityStyle = priorityStyles[item.priority]

            return (
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 20,
                  padding: 16,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.08,
                  shadowRadius: 10,
                  elevation: 3,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 14,
                  }}
                >
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      backgroundColor: "#ECFDF5",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 14,
                    }}
                  >
                    <Ionicons
                      name="rocket-outline"
                      size={28}
                      color="#059669"
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#0F172A",
                        marginBottom: 4,
                      }}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "600",
                        color: "#334155",
                        marginBottom: 3,
                      }}
                    >
                      {item.company}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        color: "#64748B",
                      }}
                    >
                      Solicitado em {item.requested_at}
                    </Text>
                  </View>

                  <View
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                      borderRadius: 999,
                      backgroundColor: badgeStyle.backgroundColor,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: badgeStyle.color,
                      }}
                    >
                      {badgeStyle.label}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                      borderRadius: 999,
                      backgroundColor: priorityStyle.backgroundColor,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: priorityStyle.color,
                      }}
                    >
                      Prioridade {item.priority}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleOpenPayloadDetail(item.payload_id)}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: "#059669",
                      }}
                    >
                      Ver detalhe
                    </Text>
                  </TouchableOpacity>
                </View>

                {item.status === "PENDING" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => handleRejectRequest(item.request_id)}
                      style={{
                        flex: 1,
                        minHeight: 46,
                        borderRadius: 999,
                        borderWidth: 1,
                        borderColor: "#FCA5A5",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "700",
                          color: "#B91C1C",
                        }}
                      >
                        Recusar
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => handleApproveRequest(item.request_id)}
                      style={{
                        flex: 1,
                        minHeight: 46,
                        borderRadius: 999,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#059669",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "700",
                          color: "#FFFFFF",
                        }}
                      >
                        Aprovar
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 18,
                      color: "#64748B",
                    }}
                  >
                    {item.status === "APPROVED"
                      ? "Solicitacao aprovada e encaminhada para a proxima etapa do fluxo."
                      : "Solicitacao recusada e encerrada na etapa de avaliacao."}
                  </Text>
                )}
              </View>
            )
          }}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <FlatList
        data={employeeRequests}
        keyExtractor={(item) => String(item.request_id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={listContentStyle}
        ListHeaderComponent={
          <>
            {headerBlock}

            <View
              style={{
                flexDirection: "row",
                gap: 12,
                marginBottom: 18,
              }}
            >
              {summaryCard("Pendentes", employeeSummary.pending)}
              {summaryCard("Aprovados", employeeSummary.approved)}
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 18,
              }}
            >
              {[
                { key: "PENDING", label: "Pendentes" },
                { key: "APPROVED", label: "Aprovados" },
                { key: "REJECTED", label: "Recusados" },
                { key: "ALL", label: "Todos" },
              ].map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  activeOpacity={0.8}
                  onPress={() =>
                    setLauncherProviderFilter(
                      filter.key as LauncherProviderHomeFilter,
                    )
                  }
                  style={filterButtonStyle(launcherProviderFilter === filter.key)}
                >
                  <Text
                    style={filterButtonTextStyle(
                      launcherProviderFilter === filter.key,
                    )}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        ListEmptyComponent={
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 18,
              paddingVertical: 30,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#0F172A",
                marginBottom: 6,
              }}
            >
              Nenhum pedido de funcionario
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: "#64748B",
                textAlign: "center",
              }}
            >
              Troque o filtro para revisar outras solicitacoes de acesso da equipe.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const badgeStyle = statusStyles[item.status]

          return (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.08,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 14,
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    backgroundColor: "#ECFDF5",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                  }}
                >
                  <Ionicons
                    name="people-outline"
                    size={28}
                    color="#059669"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "800",
                      color: "#0F172A",
                      marginBottom: 4,
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#334155",
                      marginBottom: 3,
                    }}
                  >
                    {item.role}
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      color: "#64748B",
                    }}
                  >
                    {item.base} | Solicitado em {item.requested_at}
                  </Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 999,
                    backgroundColor: badgeStyle.backgroundColor,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: badgeStyle.color,
                    }}
                  >
                    {badgeStyle.label}
                  </Text>
                </View>
              </View>

              {item.status === "PENDING" ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleRejectEmployeeRequest(item.request_id)}
                    style={{
                      flex: 1,
                      minHeight: 46,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: "#FCA5A5",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: "#B91C1C",
                      }}
                    >
                      Recusar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleApproveEmployeeRequest(item.request_id)}
                    style={{
                      flex: 1,
                      minHeight: 46,
                      borderRadius: 999,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#059669",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: "#FFFFFF",
                      }}
                    >
                      Aceitar
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    color: "#64748B",
                  }}
                >
                  {item.status === "APPROVED"
                    ? "Funcionario aceito e liberado para seguir no fluxo da operacao."
                    : "Pedido recusado e encerrado pela provedora de lancamento."}
                </Text>
              )}
            </View>
          )
        }}
      />
    </View>
  )
}

export default HomeContent
