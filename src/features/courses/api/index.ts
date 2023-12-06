/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import {
  GetCoursesBySearchRequest,
  GetCoursesBySearchResponse,
  GetCourseDetailResponse,
  CourseFilterResponse,
  CourseFullInfor,
  UpdateCourseBodyRequest,
  CourseLearnStatus,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const COURSE_BASE_URL = `/course`

export const getCoursesBySearch = (
  body: GetCoursesBySearchRequest,
): Promise<GetCoursesBySearchResponse> => api.post(`${COURSE_BASE_URL}/search`, body)

export const getCourseById = (id: string): Promise<CourseFullInfor> =>
  api.get(`${COURSE_BASE_URL}/${id}`)

export const getCoursesDetailById = (id: string): Promise<GetCourseDetailResponse> =>
  api.get(`${COURSE_BASE_URL}/detail/${id}`)

export const checkCourseIsOwnedByCourseId = (
  id: string,
): Promise<{ status: boolean; isRefund: boolean }> =>
  api.get(`${COURSE_BASE_URL}/order/check-owned/${id}`)

export const getCourseByCustomer = (status?: CourseLearnStatus): Promise<CourseFilterResponse[]> =>
  api.get(`${COURSE_BASE_URL}/order/user${status ? `?status=${status}` : ''}`)

export const getCoursesByStaff = (): Promise<CourseFullInfor[]> =>
  api.get(`${COURSE_BASE_URL}/staff/list`)

export const checkCourseCreateValid = (courseId: string): Promise<{ msgErrors: string[] }> =>
  api.get(`${COURSE_BASE_URL}/instructor/create/valid/${courseId}`)

export const updateCourseStatus = (body: UpdateCourseBodyRequest): Promise<void> =>
  api.patch(`${COURSE_BASE_URL}/status`, body)
