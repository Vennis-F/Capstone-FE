import { UpdatePostBodyRequest } from 'features/post/types'

import { CreateStaffBodyRequest } from '.'

export type CreateStaffFormInput = Omit<CreateStaffBodyRequest, 'role'>

export type UpdateStaffFormInput = UpdatePostBodyRequest
