/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import {
  GetCoursesBySearchRequest,
  GetCoursesBySearchResponse,
  GetCourseDetailResponse,
  CourseFilterResponse,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const COURSE_BASE_URL = `/course`

export const getCoursesBySearch = (
  body: GetCoursesBySearchRequest,
): Promise<GetCoursesBySearchResponse> => api.post(`${COURSE_BASE_URL}/search`, body)

export const getCoursesDetailById = (id: string): Promise<GetCourseDetailResponse> =>
  api.get(`${COURSE_BASE_URL}/${id}`)

export const checkCourseIsOwnedByCourseId = (id: string): Promise<{ status: boolean }> =>
  api.get(`${COURSE_BASE_URL}/order/check-owned/${id}`)

export const getCourseByCustomer = (): Promise<CourseFilterResponse[]> =>
  api.get(`${COURSE_BASE_URL}/order/user`)

// export const getLevels = (): Promise<Level[]> => api.get(LEVEL_BASE_URL)

// export const createPost = (post: Post): Promise<Post> => api.post(POSTS_BASE_URL, post);

// export const updatePost = (post: Post): Promise<Post> => api.put(`${POSTS_BASE_URL}/${post.id}`, post)

// export const deletePost =  (post: Post): Promise<Post> => api.delete(`${POSTS_BASE_URL}/${post.id}`, { data: post})
