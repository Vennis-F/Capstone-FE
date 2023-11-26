/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { Course } from 'features/courses/types'
import makeApi from 'libs/core/configureAxios'
import { UploadStatus } from 'types'

import {
  BankListResponse,
  CreateCourseByInstructorBodyRequest,
  GetCoursesByInstructorBodyRequest,
  GetCoursesByInstructorResponse,
  UpdateBankForInstructorBodyRequest,
  UpdateCourseByInstructorBodyRequest,
  UpdatePriceCourseByInstructorBodyRequest,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const INSTRUCTOR_BASE_URL = `/instructor`

export const getCoursesByInstructorId = (
  body: GetCoursesByInstructorBodyRequest,
): Promise<GetCoursesByInstructorResponse> => api.post(`${INSTRUCTOR_BASE_URL}/course/own`, body)

export const createCourseByInstructor = (
  body: CreateCourseByInstructorBodyRequest,
): Promise<Course> => api.post(`${INSTRUCTOR_BASE_URL}/course`, body)

export const updateCourseByInstructor = (
  body: UpdateCourseByInstructorBodyRequest,
): Promise<Course> => api.patch(`${INSTRUCTOR_BASE_URL}/course`, body)

export const updatePriceCourseByInstructor = (
  body: UpdatePriceCourseByInstructorBodyRequest,
): Promise<Course> => api.patch(`${INSTRUCTOR_BASE_URL}/course/price`, body)

export const uploadCourseThumbnailByInstructor = (courseId: string, body: any): Promise<void> =>
  api.post(`${INSTRUCTOR_BASE_URL}/course/thumbnail/upload?courseId=${courseId}`, body)

export const updateBankForInstructor = (
  email: string,
  body: UpdateBankForInstructorBodyRequest,
): Promise<void> => api.put(`${INSTRUCTOR_BASE_URL}/bank/update?email=${email}`, body)

export const getListBanks = (): Promise<BankListResponse> =>
  api.get('https://api.vietqr.io/v2/banks')

export const uploadCertifcateForInstructor = (email: string, body: any): Promise<UploadStatus> =>
  api.post(`${INSTRUCTOR_BASE_URL}/certifications/upload?email=${email}`, body)
