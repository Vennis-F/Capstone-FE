import { ChapterLectureFilter } from 'features/chapter-lecture/types'
import { LearnerFilterResponse } from 'features/learner/types'
import { PageMetaResponse, PageOptions } from 'types'

import { UserFilterResponse } from '../../user/types/index'

export type CreateQuestionTopicBodyRequest = {
  title: string
  description?: string
}
export type QuestionTopicFilterResponse = {
  id: string
  title: string
  description: string
  insertedDate: string
  updatedDate: string
  type: string
  rating: number
  active: boolean
  chapterLecture: ChapterLectureFilter
  user: UserFilterResponse | null
  learner: LearnerFilterResponse | null
}

export enum SortFieldSearchFilterQuestionTopic {
  RATING = 'rating',
  UPDATED_DATE = 'updatedDate',
}

export type SearchFilterQuestionTopicBodyRequest = {
  chapterLectureId?: string
  search?: string
  active: boolean
  sortField?: SortFieldSearchFilterQuestionTopic
  pageOptions: PageOptions
}

export type SearchFilterQuestionTopicResponse = {
  data: QuestionTopicFilterResponse[]
  meta: PageMetaResponse
}
