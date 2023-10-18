/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { CheckPromotionCourseApplyRequest, PromotionCourse } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

// const PROMOTION_BASE_URL = 'promotion'
const PROMOTION_COURSE_BASE_URL = 'promotion-course'

export const checkPromotionCourseApply = (
  body: CheckPromotionCourseApplyRequest,
): Promise<{ promotionCourse: PromotionCourse }> =>
  api.post(`${PROMOTION_COURSE_BASE_URL}/apply`, body)
