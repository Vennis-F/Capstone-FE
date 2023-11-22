import { PageMetaResponse } from 'types'

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
  status: string
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