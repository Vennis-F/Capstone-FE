export const getStringDayMonthYear = (dateString: string) => {
  const date = new Date(dateString)
  // const day = date.getDay()
  // const month = date.getMonth()
  // const year = date.getFullYear()
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}
