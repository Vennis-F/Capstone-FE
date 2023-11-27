import {
  UpdateBankForInstructorBodyRequest,
  UpdateCourseByInstructorBodyRequest,
  UpdatePriceCourseByInstructorBodyRequest,
} from './index'

export type UpdateCourseFormInput = Omit<UpdateCourseByInstructorBodyRequest, 'courseId'>

export type UpdatePriceCourseFormInput = Omit<UpdatePriceCourseByInstructorBodyRequest, 'courseId'>

export type UpdateBankForInstructorFormInput = UpdateBankForInstructorBodyRequest
