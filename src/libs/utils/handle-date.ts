export const getStringDayMonthYear = (dateString: string) => {
  const date = new Date(dateString)
  // const day = date.getDay()
  // const month = date.getMonth()
  // const year = date.getFullYear()
  return `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`
}

export const getStringMinuteHourDayMonthYear = (dateString: string) => {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const formatter = new Intl.DateTimeFormat('vi-VN', options)
  const formattedDate = formatter.format(date)

  return formattedDate.replace(',', ' lúc')
}

export const getCurrentDateWithPlus1Year = () => {
  const currentDate = new Date()

  // Thêm một năm vào ngày hiện tại
  currentDate.setFullYear(currentDate.getFullYear() + 1)

  // Chuyển đổi ngày sau khi thêm 1 năm về dạng chuỗi theo múi giờ UTC
  const futureDate = currentDate.toUTCString()

  return futureDate
}
