import { TransactionOrderDetailResponse } from 'features/transaction-pay-off/types'

export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })

  const formattedString = formatter.format(amount)
  return formattedString.replace('₫', '').replace(/,/g, '')
}

export const calcPriceDiscount = (amount: number, discount: number) =>
  amount - (discount / 100) * amount

export const calcTotalPaymentAmount = (
  transactionOrderDetailsResponse: TransactionOrderDetailResponse[],
) =>
  transactionOrderDetailsResponse.reduce(
    (total, transaction) => total + transaction.paymentAmount,
    0,
  )

export const calcTotalRefundAmount = (
  transactionOrderDetailsResponse: TransactionOrderDetailResponse[],
) =>
  transactionOrderDetailsResponse.reduce(
    (total, transaction) => total + transaction.refundAmount,
    0,
  )

export const calcTotalPaymentRefund = (
  transactionOrderDetailsResponse: TransactionOrderDetailResponse[],
) =>
  calcTotalPaymentAmount(transactionOrderDetailsResponse) +
  calcTotalRefundAmount(transactionOrderDetailsResponse)
