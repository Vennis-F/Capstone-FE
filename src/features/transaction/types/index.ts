export type CreateTransactionBody = {
  orderId: string
  paymentAmount: number
  bankCode: string
  bankTranNo: string | null
  cardType: string
  responseCode: string
}

export type CreateTransactionResponse = {
  id: string
  orderId: string
  paymentAmount: 0
  bankTranNo: string | null
  cardType: string
  insertedDate: string
  status: TransactionStatus
}

export enum TransactionStatus {
  Success = 'Success',
  Fail = 'Fail',
}
