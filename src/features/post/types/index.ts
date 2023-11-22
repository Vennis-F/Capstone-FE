import { PageOptions, SortCriteria } from '../../../types/index'
import { UserFilterResponse } from '../../user/types/index'

export type CreatePostBodyRequest = {
  title: string
  description: string
  resources: string
}

export type UpdatePostBodyRequest = {
  postId: string
  title?: string
  description?: string
  resources?: string
  active?: boolean
}

export type PostFilterResponse = {
  id: string
  title: string
  description: string
  resources: string
  insertedDate: string
  updatedDate: string
  thumbnail?: string
  active: boolean
  user: UserFilterResponse
}

enum SortField {
  INSERTED_DATE = 'insertedDate',
  UPDATED_DATE = 'updatedDate',
}

export type SearchPostsBodyRequest = {
  search?: string
  active?: boolean
  sortCriterias: SortCriteria<SortField>[]
  pageOptions: PageOptions
}
