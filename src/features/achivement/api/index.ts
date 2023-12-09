/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { ViewAchievementReponse } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const ACHIVEMENT_BASE_URL = `/achievement`

export const getCertificate = (path: string): Promise<BlobPart> =>
  api.get(`${ACHIVEMENT_BASE_URL}?path=${path}`, { responseType: 'blob' })

export const downloadCertifcate = (path: string): Promise<BlobPart> =>
  api.get(`${ACHIVEMENT_BASE_URL}/download?path=${path}`, { responseType: 'blob' })

export const generateCertifcate = (courseId: string): Promise<void> =>
  api.post(`${ACHIVEMENT_BASE_URL}/generate?courseId=${courseId}`)

export const getListAchievements = (): Promise<ViewAchievementReponse[]> =>
  api.get(`${ACHIVEMENT_BASE_URL}/user`)
