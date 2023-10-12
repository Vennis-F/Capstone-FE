/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { Level } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const LEVEL_BASE_URL = `/level`

export const getLevels = (): Promise<Level[]> => api.get(LEVEL_BASE_URL)

export const getLevelById = (id: string): Promise<Level> => api.get(`${LEVEL_BASE_URL}/${id}`)

// export const createPost = (post: Post): Promise<Post> => api.post(POSTS_BASE_URL, post);

// export const updatePost = (post: Post): Promise<Post> => api.put(`${POSTS_BASE_URL}/${post.id}`, post)

// export const deletePost =  (post: Post): Promise<Post> => api.delete(`${POSTS_BASE_URL}/${post.id}`, { data: post})
