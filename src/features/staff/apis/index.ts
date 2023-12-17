/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { CreateStaffBodyRequest, StaffFilterResponse, UpdateStaffBodyRequest } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const STAFF_BASE_URL = `/staff`

export const createStaffByAdmin = (body: CreateStaffBodyRequest): Promise<void> =>
  api.post(`${STAFF_BASE_URL}`, body)

export const updateProfileOfStaff = (body: UpdateStaffBodyRequest): Promise<void> =>
  api.patch(`${STAFF_BASE_URL}/profile`, body)

// export const updatePostThumbnailByStaff = (postId: string, body: any): Promise<void> =>
//   api.post(`${STAFF_BASE_URL}/thumbnail/upload?postId=${postId}`, body)

export const getStaffByIdByAdmin = (staffId: string): Promise<StaffFilterResponse> =>
  api.get(`${STAFF_BASE_URL}/${staffId}`)

export const getStaffsByAdmin = (): Promise<StaffFilterResponse[]> => api.get(`${STAFF_BASE_URL}`)

export const getProfileOfStaff = (): Promise<StaffFilterResponse> =>
  api.get(`${STAFF_BASE_URL}/profile`)

export const deleteStaffByAdmin = (staffId: string): Promise<void> =>
  api.delete(`${STAFF_BASE_URL}/${staffId}`)

export const reActiveStaffByAdmin = (staffId: string): Promise<void> =>
  api.put(`${STAFF_BASE_URL}/reactive/${staffId}`)
