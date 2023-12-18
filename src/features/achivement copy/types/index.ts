export type CreateDeviceTokenBodyRequest = {
  deviceTokenId: string
}

export type NotificationResponse = {
  userId: string
  title: string
  body: string
  data: any
  createdDate: Date
  isSeen: boolean
}
