import { Course } from 'features/courses/types'
import { PromotionCourse } from 'features/promotion/types'

export enum NameOrderStatus {
  Pending = 'Pending',
  Cancel = 'Cancel',
  Success = 'Success',
  Fail = 'Fail',
}

export type OrderStatus = {
  active: boolean
  id: string
  insertedDate: string
  statusName: NameOrderStatus
}

export type Order = {
  id: string
  totalPrice: number
  totalPriceAfterPromotion: number
  note: string
  active: boolean
  orderDetails: OrderDetail[]
  insertedDate: string
  updatedDate: string
  orderStatus: OrderStatus
}

export type OrderDetail = {
  id: string
  price: number
  priceAfterPromotion: number
  status: null | string
  note: null | string
  refundReason: null | string
  active: boolean
  course: Course
  promotionCourse: PromotionCourse
}

export type UpdateOrderBodyRequest = {
  orderId: string
  nameOrderStatus: NameOrderStatus
}
