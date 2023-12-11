import { CreateContestBodyRequest, DefinePromotionForWinnerBodyRequest } from '.'

export type CreateContestFormInput = DefinePromotionForWinnerBodyRequest & CreateContestBodyRequest
export type EditContestFormInput = CreateContestBodyRequest
