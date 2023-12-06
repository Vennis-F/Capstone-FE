/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { ViewAchievementReponse } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const ACHIVEMENT_BASE_URL = `/achievement`

// export const getAchievementCertificate = (path: string): Promise<void> =>
//   api.get(`${ACHIVEMENT_BASE_URL}?active=${active}`)

export const downloadCertifcate = (path: string): Promise<void> =>
  api.get(`${ACHIVEMENT_BASE_URL}/download?path=${path}`)

// export const getCategoriesByAdmin = (): Promise<Category[]> =>
//   api.get(`${ACHIVEMENT_BASE_URL}/admin`)

export const generateCertifcate = (courseId: string): Promise<void> =>
  api.post(`${ACHIVEMENT_BASE_URL}/generate?courseId=${courseId}`)

export const getListAchievements = (): Promise<ViewAchievementReponse[]> =>
  api.get(`${ACHIVEMENT_BASE_URL}/user`)
