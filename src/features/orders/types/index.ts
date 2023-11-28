import { Course } from 'features/courses/types'
import { PromotionCourse } from 'features/promotion/types'
import { RefundFilterResponse } from 'features/refund/types'
import { Transaction } from 'features/transaction/types'
import { UserFilterResponse } from 'features/user/types'

export enum NameOrderStatus {
  Pending = 'Pending',
  Cancel = 'Cancel',
  Success = 'Success',
  Fail = 'Fail',
}

export const convertOrderStatus = (orderStatus: NameOrderStatus) => {
  switch (orderStatus) {
    case NameOrderStatus.Success:
      return { color: '#008000', vietnamse: 'Thành công' }
    case NameOrderStatus.Cancel:
      return { color: '#FF0000', vietnamse: 'Hủy bỏ' }
    case NameOrderStatus.Pending:
      return { color: '#FFD700', vietnamse: 'Đang chờ' }
    case NameOrderStatus.Fail:
      return { color: '#FF0000', vietnamse: 'Thất bại' }
    default:
      return { color: '#808080', vietnamse: 'Unkown' }
  }
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
  orderStatus: NameOrderStatus
  user: UserFilterResponse
  transaction: Transaction
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
  refund: RefundFilterResponse | null
}

export type UpdateOrderBodyRequest = {
  orderId: string
  nameOrderStatus: NameOrderStatus
}
