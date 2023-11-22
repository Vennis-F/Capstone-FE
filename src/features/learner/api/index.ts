/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { CourseLearnerFilterResponse } from 'features/courses/types'
import makeApi from 'libs/core/configureAxios'
import { PageMetaResponse } from 'types'

import {
  CreateLearnerBodyRequest,
  CreateLearnerCourseBodyRequest,
  LearnerFilterResponse,
  UpdateLearnerCourseBodyRequest,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const LEARNER_BASE_URL = `/learner`

const LEARNER_COURSE_BASE_URL = `/learner-course`

export const createLearner = (body: CreateLearnerBodyRequest): Promise<void> =>
  api.post(`${LEARNER_BASE_URL}/create`, body)

export const getLearnersByUser = (): Promise<LearnerFilterResponse[]> =>
  api.get(`${LEARNER_BASE_URL}/user`)

export const getCourseForLearnerSearchByUser = (
  search: string,
): Promise<{ data: CourseLearnerFilterResponse[]; meta: PageMetaResponse }> =>
  api.post(`${LEARNER_BASE_URL}/course/user?search=${search}`)

// ----------------------------------------------------------------

export const createLearnerCourse = (body: CreateLearnerCourseBodyRequest): Promise<void> =>
  api.post(`${LEARNER_COURSE_BASE_URL}/create`, body)

export const updateLearnerCourse = (body: UpdateLearnerCourseBodyRequest): Promise<void> =>
  api.patch(`${LEARNER_COURSE_BASE_URL}/update`, body)

export const getLearnerIsLearningCourseByCourseId = (
  courseId: string,
): Promise<{ learnerId: string }> =>
  api.get(`${LEARNER_COURSE_BASE_URL}/course/learning/${courseId}`)
