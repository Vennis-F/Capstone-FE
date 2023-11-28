export type CreateRefundBodyRequest = {
  bank: string
  accountNumber: string
  accountName: string
  refundReason: string
}

export type RefundFilterResponse = {
  id: string
  bank: string
  accountNumber: string
  accountName: string
  refundPrice: number
  refundReason: string
  isApproved: boolean
  insertedDate: Date
  firstName: string
  middleName: string
  lastName: string
  courseTitle: string
}
