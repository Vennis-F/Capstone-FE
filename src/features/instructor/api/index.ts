/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { Course } from 'features/courses/types'
import makeApi from 'libs/core/configureAxios'
import { UploadStatus } from 'types'

import {
  BankListResponse,
  CourseFilterByInstructorResponse,
  CreateCourseByInstructorBodyRequest,
  GetCoursesByInstructorBodyRequest,
  GetCoursesByInstructorResponse,
  InstructorFilterResponse,
  InstructorStatus,
  UpdateBankForInstructorBodyRequest,
  UpdateCourseByInstructorBodyRequest,
  UpdatePriceCourseByInstructorBodyRequest,
  UpdateStatusInstructorByAdminBodyRequest,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const INSTRUCTOR_BASE_URL = `/instructor`

export const getCoursesByInstructorId = (
  body: GetCoursesByInstructorBodyRequest,
): Promise<GetCoursesByInstructorResponse> => api.post(`${INSTRUCTOR_BASE_URL}/course/own`, body)

export const getCoursesCanApplyPromotionByInstructorId = (
  body: GetCoursesByInstructorBodyRequest,
  promotionId: string,
): Promise<CourseFilterByInstructorResponse[]> =>
  api.post(`${INSTRUCTOR_BASE_URL}/course/own/promotion/can-apply/${promotionId}`, body)

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

export const getInstructorsByAdmin = (
  status?: InstructorStatus,
): Promise<InstructorFilterResponse[]> =>
  status ? api.get(`${INSTRUCTOR_BASE_URL}?status=${status}`) : api.get(`${INSTRUCTOR_BASE_URL}`)

export const getInstructorByIdByAdmin = (instructorId: string): Promise<InstructorFilterResponse> =>
  api.get(`${INSTRUCTOR_BASE_URL}/${instructorId}`)

export const updateInstructorStatusByAdmin = (
  body: UpdateStatusInstructorByAdminBodyRequest,
): Promise<void> => api.put(`${INSTRUCTOR_BASE_URL}/status/set`, body)

export const removeCourseByInstructor = (courseId: string): Promise<void> =>
  api.delete(`${INSTRUCTOR_BASE_URL}/course/${courseId}`)

export const removeChapterLectureByInstructor = (chapterLectureId: string): Promise<void> =>
  api.delete(`${INSTRUCTOR_BASE_URL}/chapter-lecture/${chapterLectureId}`)
