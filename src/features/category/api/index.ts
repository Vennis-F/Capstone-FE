/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { Category } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const CATEGORY_BASE_URL = `/category`

export const getCategories = (): Promise<Category[]> => api.get(CATEGORY_BASE_URL)

export const getCategoryById = (id: string): Promise<Category> =>
  api.get(`${CATEGORY_BASE_URL}/${id}`)

// export const createPost = (post: Post): Promise<Post> => api.post(POSTS_BASE_URL, post);

// export const updatePost = (post: Post): Promise<Post> => api.put(`${POSTS_BASE_URL}/${post.id}`, post)

// export const deletePost =  (post: Post): Promise<Post> => api.delete(`${POSTS_BASE_URL}/${post.id}`, { data: post})
