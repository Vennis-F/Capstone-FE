import { PageMetaResponse, PageOptions } from 'types'

export type Course = {
  id: string
  title: string
  description: string
  price: number
  discount: number
  discountPrice: number
  promotionCourseByStaffId: string | null
  ratedStar: number
  author: string
  totalLength: number
  shortDescription: string
  prepareMaterial: string
  status: string
  totalChapter: number
  publishedDate: string
  totalBought: number
  thumbnailUrl: string
  active: boolean
  level: string
}

// Components
export enum SortCourseBy {
  PUBLISHED_DATE_ASC = 'PUBLISHED_DATE_ASC',
  PUBLISHED_DATE_DESC = 'PUBLISHED_DATE_DESC',
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
}
// const SortCourseBy = (enum) => {}

// API
export type GetCoursesBySearchRequest = {
  levels: string[]
  categories: string[]
  search?: string
  sortField?: SortFieldCourse
  pageOptions: PageOptions
}

export type GetCoursesBySearchResponse = {
  data: Course[]
  meta: PageMetaResponse
}

export type GetCourseDetailResponse = {
  authorId: string
  categoryId: string
  category: string
} & Course

export enum SortFieldCourse {
  PRICE = 'price',
  PUBLISHED_DATE = 'publishedDate',
}
