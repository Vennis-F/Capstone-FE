/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import {
  CheckPromotionCourseApplyRequest,
  CreatePromotionBodyRequest,
  CreatePromotionCourseBodyRequest,
  Promotion,
  PromotionCourse,
  UpdateIsViewOfStaffBodyRequest,
  UpdatePromotionBodyRequest,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const PROMOTION_BASE_URL = 'promotion'
const PROMOTION_COURSE_BASE_URL = 'promotion-course'

export const createPromotion = (body: CreatePromotionBodyRequest): Promise<void> =>
  api.post(`${PROMOTION_BASE_URL}`, body)

export const updatePromotion = (
  body: UpdatePromotionBodyRequest,
  promotionId: string,
): Promise<void> => api.put(`${PROMOTION_BASE_URL}/${promotionId}`, body)

export const deletePromotion = (promotionId: string): Promise<void> =>
  api.delete(`${PROMOTION_BASE_URL}/${promotionId}`)

export const findPromotion = (promotionId: string): Promise<Promotion> =>
  api.get(`${PROMOTION_BASE_URL}/${promotionId}`)

export const findPromotions = (): Promise<Promotion[]> => api.get(`${PROMOTION_BASE_URL}`)

// ----------------------------------------

export const checkPromotionCourseCanApplyById = (
  promotionCourseId: string,
): Promise<{ promotionCourse: PromotionCourse }> =>
  api.post(`${PROMOTION_COURSE_BASE_URL}/apply/view?promotionCourseId=${promotionCourseId}`)

export const checkPromotionCourseCanApplyByCode = (
  courseId: string,
  code: string,
): Promise<{ promotionCourse: PromotionCourse }> =>
  api.post(`${PROMOTION_COURSE_BASE_URL}/apply/not-view?code=${code}&courseId=${courseId}`)

export const checkPromotionCourseApply = (
  body: CheckPromotionCourseApplyRequest,
): Promise<{ promotionCourse: PromotionCourse }> =>
  api.post(`${PROMOTION_COURSE_BASE_URL}/apply`, body)

export const createPromotionCourse = (body: CreatePromotionCourseBodyRequest): Promise<void> =>
  api.post(`${PROMOTION_COURSE_BASE_URL}`, body)

export const updatePromotionCourseIsViewOfInstructor = (
  body: UpdateIsViewOfStaffBodyRequest,
): Promise<void> => api.patch(`${PROMOTION_COURSE_BASE_URL}/view`, body)

export const deletePromotionCourse = (promotionCourseId: string): Promise<void> =>
  api.delete(`${PROMOTION_COURSE_BASE_URL}/${promotionCourseId}`)

export const findPromotionCourseByPromotionCourseId = (
  promotionCourseId: string,
): Promise<PromotionCourse> => api.get(`${PROMOTION_COURSE_BASE_URL}/${promotionCourseId}`)

export const findPromotionCoursesCanViewByCourseId = (
  courseId: string,
): Promise<PromotionCourse[]> => api.get(`${PROMOTION_COURSE_BASE_URL}/view/${courseId}`)

export const findPromotionCoursesByPromotionId = (
  promotionId: string,
): Promise<PromotionCourse[]> => api.get(`${PROMOTION_COURSE_BASE_URL}/promotion/${promotionId}`)
