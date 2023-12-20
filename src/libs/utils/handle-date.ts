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

  return formattedDate.replace(',', '')
}

export const getCurrentDateWithPlus1Year = () => {
  const currentDate = new Date()

  // Thêm một năm vào ngày hiện tại
  currentDate.setFullYear(currentDate.getFullYear() + 1)

  // Chuyển đổi ngày sau khi thêm 1 năm về dạng chuỗi theo múi giờ UTC
  const futureDate = currentDate.toUTCString()

  return futureDate
}

export const getDateWithPlus1Year = (date: string) => {
  const currentDate = new Date(date)

  currentDate.setFullYear(currentDate.getFullYear() + 1)

  const futureDate = currentDate.toUTCString()

  return futureDate
}

export const timeAgo = (timestamp: string) => {
  const current = new Date().getTime() // Thời gian hiện tại
  const previous = new Date(timestamp).getTime() // Thời gian của timestamp

  const difference = Math.abs(current - previous) / 1000 // Sử dụng Math.abs() để lấy giá trị tuyệt đối

  const seconds = Math.floor(difference)
  const minutes = Math.floor(difference / 60)
  const hours = Math.floor(difference / 3600)
  const days = Math.floor(difference / (3600 * 24))
  const months = Math.floor(difference / (3600 * 24 * 30))
  const years = Math.floor(difference / (3600 * 24 * 30 * 12))

  if (seconds < 60) {
    return `${seconds} giây`
  }
  if (minutes < 60) {
    return `${minutes} phút`
  }
  if (hours < 24) {
    return `${hours} giờ`
  }
  if (days < 30) {
    return `${days} ngày`
  }
  if (months < 12) {
    return `${months} tháng`
  }

  return `${years} năm`
}
