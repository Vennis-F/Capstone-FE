export type CheckPromotionCourseApplyRequest = {
  courseId: string
  code: string
}

export type PromotionCourse = {
  id: string
  effectiveDate: string
  expiredDate: string
  active: boolean
  code: string
  promotion: Promotion
}

export type Promotion = {
  id: string
  discountPercent: number
  insertedDate: string
  updatedDate: string
  note: string
  active: boolean
}
