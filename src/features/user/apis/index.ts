/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import {
  ChangePasswordUserBodyRequest,
  UpdateProfileBodyRequest,
  UserFilterResponse,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const USER_BASE_URL = `/user`

export const updateProfile = (body: UpdateProfileBodyRequest): Promise<UserFilterResponse> =>
  api.patch(`${USER_BASE_URL}/profile`, body)

export const changePasswordUser = (
  body: ChangePasswordUserBodyRequest,
): Promise<UserFilterResponse> => api.post(`${USER_BASE_URL}/profile/change-password`, body)

export const getProfileUser = (): Promise<UserFilterResponse> => api.get(`${USER_BASE_URL}/profile`)

export const uploadAvatarUser = (body: any): Promise<void> =>
  api.post(`${USER_BASE_URL}/profile/avatar`, body)

export const getCustomersByAdmin = (): Promise<UserFilterResponse[]> =>
  api.get(`${USER_BASE_URL}/customer/list`)

export const getCustomersByIdByAdmin = (customerId: string): Promise<UserFilterResponse> =>
  api.get(`${USER_BASE_URL}/customer/${customerId}`)
