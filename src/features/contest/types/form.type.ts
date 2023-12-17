import {
  CreateContestBodyRequest,
  DefinePromotionForWinnerBodyRequest,
  UpdateContestBodyRequest,
} from '.'

export type CreateContestFormInput = DefinePromotionForWinnerBodyRequest & CreateContestBodyRequest
export type EditContestFormInput = UpdateContestBodyRequest
