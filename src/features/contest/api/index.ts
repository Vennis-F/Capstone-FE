/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'
import { PageResponse } from 'types'

import { Contest, CreateContestBodyRequest, FindContestsFilterBodyRequest } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const CONTEST_BASE_URL = `/contest`

export const getContestById = (id: string): Promise<Contest> => api.get(`${CONTEST_BASE_URL}/${id}`)

export const getContestsByStaff = (): Promise<Contest[]> => api.get(`${CONTEST_BASE_URL}/staff`)

export const findContestsFilter = (
  body: FindContestsFilterBodyRequest,
): Promise<PageResponse<Contest>> => api.post(`${CONTEST_BASE_URL}`, body)

export const createContestByStaff = (body: CreateContestBodyRequest): Promise<void> =>
  api.post(`${CONTEST_BASE_URL}/create`, body)

export const updateContestThumbnailByStaff = (contestId: string, body: any): Promise<void> =>
  api.put(`${CONTEST_BASE_URL}/thumbnail?contestId=${contestId}`, body)
