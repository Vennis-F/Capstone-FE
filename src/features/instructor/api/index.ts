/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { Course } from 'features/courses/types'
import makeApi from 'libs/core/configureAxios'
import { PageOptions } from 'types'

import {
  CreateCourseByInstructorBodyRequest,
  GetCoursesByInstructorResponse,
  UpdateCourseByInstructorBodyRequest,
  UpdatePriceCourseByInstructorBodyRequest,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const INSTRUCTOR_BASE_URL = `/instructor`

export const getCoursesByInstructorId = (
  body: PageOptions,
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