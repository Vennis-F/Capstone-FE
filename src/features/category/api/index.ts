/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { Category, CreateCategoryBodyRequest, UpdateCategoryBodyRequest } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const CATEGORY_BASE_URL = `/category`

export const getCategories = (active?: 'true' | 'false'): Promise<Category[]> =>
  api.get(`${CATEGORY_BASE_URL}?active=${active}`)

export const getCategoryById = (id: string): Promise<Category> =>
  api.get(`${CATEGORY_BASE_URL}/${id}`)

export const getCategoriesByAdmin = (): Promise<Category[]> => api.get(`${CATEGORY_BASE_URL}/admin`)

export const createCategoryByAdmin = (body: CreateCategoryBodyRequest): Promise<void> =>
  api.post(`${CATEGORY_BASE_URL}`, body)

export const updateCategoryByAdmin = (id: string, body: UpdateCategoryBodyRequest): Promise<void> =>
  api.patch(`${CATEGORY_BASE_URL}/${id}`, body)

export const deleteCategoryByAdmin = (id: string): Promise<void> =>
  api.delete(`${CATEGORY_BASE_URL}/${id}`)
