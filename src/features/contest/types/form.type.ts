import { CreateContestBodyRequest, UpdateContestBodyRequest } from '.'

export type CreateContestFormInput = {
  discountPercentFirst: number
  discountPercentSecond: number
  discountPercentThird: number
} & CreateContestBodyRequest

export type EditContestFormInput = {
  discountPercentFirst: number
  discountPercentSecond: number
  discountPercentThird: number
} & UpdateContestBodyRequest
