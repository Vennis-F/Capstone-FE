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

export type Transaction = {
  id: string
  paymentAmount: number
  bankCode: string
  bankTranNo: string
  cardType: string
  insertedDate: Date
  status: TransactionStatus
}

export const convertTransactionStatus = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.Success:
      return { color: '#008000', vietnamse: 'Thành công' }
    case TransactionStatus.Fail:
      return { color: '#FF0000', vietnamse: 'Thất bại' }
    default:
      return { color: '#808080', vietnamse: 'Unkown' }
  }
}
