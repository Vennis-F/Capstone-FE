/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'
import { PageResponse } from 'types'

import {
  CreatePostBodyRequest,
  PostFilterResponse,
  SearchPostsBodyRequest,
  UpdatePostBodyRequest,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const POST_BASE_URL = `/post`

export const createPostByStaff = (body: CreatePostBodyRequest): Promise<void> =>
  api.post(`${POST_BASE_URL}`, body)

export const updatePostByStaff = (body: UpdatePostBodyRequest): Promise<void> =>
  api.patch(`${POST_BASE_URL}`, body)

export const updatePostThumbnailByStaff = (postId: string, body: any): Promise<void> =>
  api.post(`${POST_BASE_URL}/thumbnail/upload?postId=${postId}`, body)

export const getPostById = (postId: string): Promise<PostFilterResponse> =>
  api.post(`${POST_BASE_URL}/${postId}`)

export const searchPosts = (
  body: SearchPostsBodyRequest,
): Promise<PageResponse<PostFilterResponse>> => api.post(`${POST_BASE_URL}/search`, body)
