import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { CourseReportFilterResponse, CreateCourseReportBodyRequest } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const COURSE_REPORT_BASE_URL = `/course-report`

export const createCourseReportByCustomerOrLearner = (
  courseId: string,
  body: CreateCourseReportBodyRequest,
): Promise<void> => api.post(`${COURSE_REPORT_BASE_URL}?courseId=${courseId}`, body)

export const getCourseReportsByStaff = (): Promise<CourseReportFilterResponse[]> =>
  api.get(`${COURSE_REPORT_BASE_URL}`)
