// import { Dayjs } from 'dayjs'

import { UpdatePromotionBodyRequest } from '.'

export type CreatePromotionFormInput = {
  title: string
  discountPercent: number
  note: string
  effectiveDate: string
  expiredDate: string
  code: string
  amount: number
}
export type UpdatePromotionFormInput = UpdatePromotionBodyRequest
