export const formatDecimal = (value: string) => {
  return value
    .replace(/[^\d.,]/g, "")
    .replace(/\./g, ",")
    .replace(/(,.*),/g, "$1")
}
