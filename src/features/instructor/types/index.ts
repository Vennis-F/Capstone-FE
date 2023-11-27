import { CourseStatus, SortFieldCourse } from 'features/courses/types'
import { PageMetaResponse, PageOptions } from 'types'

// export type CreateQuestionTopicBodyRequest = {
//   title: string
//   description?: string
// }

export type CourseFilterByInstructorResponse = {
  id: string
  title: string
  description: string
  price: number
  shortDescription: string
  prepareMaterial: string
  status: CourseStatus
  totalChapter: number
  publishedDate: string
  totalBought: number
  thumbnailUrl: string
  active: boolean
}

export type GetCoursesByInstructorResponse = {
  data: CourseFilterByInstructorResponse[]
  meta: PageMetaResponse
}

// export enum SortFieldSearchFilterQuestionTopic {
//   RATING = 'rating',
//   UPDATED_DATE = 'updatedDate',
// }

export type CreateCourseByInstructorBodyRequest = {
  title: string
  categoryId: string
  levelId: string
}

export type UpdateCourseByInstructorBodyRequest = {
  courseId: string
  title: string
  description: string | null
  prepareMaterial: string | null
  categoryId: string
  levelId: string
}

export type UpdatePriceCourseByInstructorBodyRequest = {
  courseId: string
  price: number
}

export type GetCoursesByInstructorBodyRequest = {
  courseStatus?: CourseStatus
  search?: string
  sortField?: SortFieldCourse
  pageOptions: PageOptions
}

export type UpdateBankForInstructorBodyRequest = {
  bank: string
  accountNumber: string
  accountHolderName: string
}

export interface Bank {
  id: number
  name: string
  code: string
  bin: string
  shortName: string
  logo: string
  transferSupported: number
  lookupSupported: number
  short_name: string
  support: number
  isTransfer: number
  swift_code: string
}

export interface BankListResponse {
  code: string
  desc: string
  data: Bank[]
}

export type InstructorFilterResponse = {
  id: string
  firstName: string
  lastName: string
  middleName: string
  userName: string
  password: string
  avatar: string
  email: string
  phoneNumber: string
  status: string
  active: boolean

  bank: string
  accountNumber: string
  accountHolderName: string

  certificateUrl: string
  reason: string
}

export enum InstructorStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Reject = 'Rejected',
}

export type UpdateStatusInstructorByAdminBodyRequest = {
  instructorId: string
  reason?: string
  status: InstructorStatus
}

export interface InstructorStatusInfo {
  status: CourseStatus
  color: string
  vietnamese: string
}

export const instructorStatusInfors: InstructorStatusInfo[] = [
  {
    status: CourseStatus.PENDING,
    color: '#f1c40f', // Màu sắc cho trạng thái PENDING
    vietnamese: 'Đang chờ duyệt', // Bản dịch tiếng Việt của PENDING
  },
  {
    status: CourseStatus.APPROVED,
    color: '#2ecc71', // Màu sắc cho trạng thái APPROVED
    vietnamese: 'Đã duyệt', // Bản dịch tiếng Việt của APPROVED
  },
  {
    status: CourseStatus.REJECTED,
    color: '#e74c3c', // Màu sắc cho trạng thái REJECTED
    vietnamese: 'Bị từ chối', // Bản dịch tiếng Việt của REJECTED
  },
]
