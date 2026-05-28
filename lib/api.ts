export const getUser = async (jwt_token: string) => {
  if (jwt_token === "VALID_SHIPPER_TOKEN") {
    return {
      user_id: 1,
      name: "Testador da Silva",
      email: "teste@email.com",
      type: "SHIPPER",
    }
  }
}
