import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'
import { PageOptions, PageResponse } from 'types'

import { CourseFeedbackFilterResponse, CreateCourseFeedbackBodyRequest } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const COURSE_FEEDBACK_BASE_URL = `/course-feedback`

export const createCourseFeedback = (
  courseId: string,
  body: CreateCourseFeedbackBodyRequest,
): Promise<void> => api.post(`${COURSE_FEEDBACK_BASE_URL}/create?courseId=${courseId}`, body)

export const updateCourseFeedback = (
  courseId: string,
  body: CreateCourseFeedbackBodyRequest,
): Promise<void> => api.put(`${COURSE_FEEDBACK_BASE_URL}?courseId=${courseId}`, body)

export const getCoursesFeedback = (
  courseId: string,
  pageOptions: PageOptions,
): Promise<PageResponse<CourseFeedbackFilterResponse>> =>
  api.post(`${COURSE_FEEDBACK_BASE_URL}/courses/${courseId}`, pageOptions)
