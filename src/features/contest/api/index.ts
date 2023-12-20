/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'
import { PageResponse } from 'types'

import {
  Contest,
  ContestStatus,
  CreateContestBodyRequest,
  DefinePromotionForWinnerBodyRequest,
  FindContestsFilterBodyRequest,
  UpdateContestBodyRequest,
  ViewWinner,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const CONTEST_BASE_URL = `/contest`

export const getContestById = (id: string): Promise<Contest> => api.get(`${CONTEST_BASE_URL}/${id}`)

export const getContestStatusActive = (): Promise<Contest[]> =>
  api.get(`${CONTEST_BASE_URL}/status/active`)

export const getContestsByStaff = (status?: ContestStatus): Promise<Contest[]> =>
  api.get(`${CONTEST_BASE_URL}/staff${status ? `?status=${status}` : ''}`)

export const findContestsFilter = (
  body: FindContestsFilterBodyRequest,
): Promise<PageResponse<Contest>> => api.post(`${CONTEST_BASE_URL}`, body)

export const createContestByStaff = (body: CreateContestBodyRequest): Promise<Contest> =>
  api.post(`${CONTEST_BASE_URL}/create`, body)

export const updateContestByStaff = (
  contestId: string,
  body: UpdateContestBodyRequest,
): Promise<Contest> => api.put(`${CONTEST_BASE_URL}/${contestId}`, body)

export const updateContestThumbnailByStaff = (contestId: string, body: any): Promise<void> =>
  api.put(`${CONTEST_BASE_URL}/thumbnail?contestId=${contestId}`, body)

export const deleteContestByStaff = (contestId: string): Promise<void> =>
  api.delete(`${CONTEST_BASE_URL}/${contestId}`)

// ----------------------------------------------------------------

const WINNER_BASE_URL = `/winner`

export const definePromotionForWinner = (
  body: DefinePromotionForWinnerBodyRequest,
  contestId: string,
): Promise<void> => api.post(`${WINNER_BASE_URL}/${contestId}`, body)

export const getWinners = (contestId: string): Promise<ViewWinner[]> =>
  api.get(`${WINNER_BASE_URL}/contest/${contestId}`)

// ----------------------------------------------------------------

const VOTE_BASE_URL = `/vote`

export const createVoteCustomerDrawing = (customerDrawingId: string): Promise<void> =>
  api.post(`${VOTE_BASE_URL}/customer-drawing/${customerDrawingId}`)
