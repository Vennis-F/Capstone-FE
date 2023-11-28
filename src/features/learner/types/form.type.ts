import {
  ChangePasswordLearnerBodyRequest,
  CreateLearnerBodyRequest,
  UpdateLearnerBodyRequest,
} from './index'

export type CreateLearnerFormInput = CreateLearnerBodyRequest

export type UpdateLearnerFormInput = Omit<UpdateLearnerBodyRequest, 'learnerId'>

export type ChangePasswordLearnerFormInput = Omit<ChangePasswordLearnerBodyRequest, 'learnerId'>
