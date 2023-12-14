export type Category = {
  id: string
  name: string
  active: boolean
  insertedDate: string
  updatedDate: string
  totalCourses: number
  thumbnailUrl: string
}

export type CreateCategoryBodyRequest = {
  name: string
}

export type UpdateCategoryBodyRequest = CreateCategoryBodyRequest
