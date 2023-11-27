export type TransactionOrderDetailResponse = {
  refundId: string
  paymentAmount: number
  refundAmount: number
  insertedDate: string
  active: boolean
  courseName: string
  author: string
  buyer: string
}

export type TransactionPayOffResponse = {
  id: string
  senderId: string
  totalPaymentAmount: number
  active: boolean
  insertedDate: Date
}
