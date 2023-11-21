export type CreatePaymentURLBody = {
  orderId: string

  message: string

  amount: number

  language: 'vn'

  returnUrl: string | undefined

  bankCode?: string

  ip?: string
}
