import { LearnerFilterResponse } from 'features/learner/types'
import { User } from 'features/user/types'
import { PageOptions } from 'types'

export type CustomerDrawing = {
  id: string
  title: string
  description: string
  imageUrl: string
  insertedDate: string
  updatedDate: string
  approved: boolean
  active: boolean
  customerName: string
  contestName: string
  totalVotes: number
  isVoted: boolean
  isOwned: boolean
}

export type CreateCustomerDrawingBodyRequest = {
  title: string
  description: string
}

export enum CustomerDrawingSortField {
  VOTE = 'votes',
  UPDATED_DATE = 'updatedDate',
}

export type FilterCustomerDrawingBodyRequest = {
  customerDrawingSortField?: CustomerDrawingSortField
  pageOptions: PageOptions
}

export type Vote = {
  id: string
  user: User
  customerDrawing: CustomerDrawing
  learner: LearnerFilterResponse
}

export type CustomerDrawingNotFilter = {
  id: string
  title: string
  description: string
  imageUrl: string
  insertedDate: string
  updatedDate: string
  active: boolean
  status: string
  user: User
  votes: Vote[]
  totalVotes: number
}

export enum CustomerDrawingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  BANNED = 'BANNED',
}
