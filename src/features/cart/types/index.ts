import { Course } from 'features/courses/types'
import { PromotionCourse } from 'features/promotion/types'

export type Cart = {
  id: string
  insertedDate: Date
  updatedDate: Date
  cartItems: CartItem[]
}

export type CartItem = {
  id: string
  course: Course
  promotionCourse: PromotionCourse | null
}

export type AddCartItemBody = { courseId: string; promotionCourseId: string | null }

export type CartTotalPrice = {
  totalPrice: number
  totalPriceDiscount: number
  totalPriceAfterPromotion: number
}
