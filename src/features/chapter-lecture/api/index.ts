/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { ChapterLectureFilter } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const CHAPTER_LECTURE_BASE_URL = `/chapter-lecture`

const USER_LECTURE_BASE_URL = `/user-lecture`

export const getChapterLecturesByCourseId = (courseId: string): Promise<ChapterLectureFilter[]> =>
  api.get(`${CHAPTER_LECTURE_BASE_URL}/courses/${courseId}`)

export const getChapterLectureOfLearnerStudy = (
  courseId: string,
): Promise<ChapterLectureFilter[]> =>
  api.get(`${CHAPTER_LECTURE_BASE_URL}/courses/learner/study?courseId=${courseId}`)

export const saveUserLectureCompleted = (
  chapterLectureId: string,
): Promise<ChapterLectureFilter[]> =>
  api.post(`${USER_LECTURE_BASE_URL}/save`, { chapterLectureId })

// export const createPost = (post: Post): Promise<Post> => api.post(POSTS_BASE_URL, post);

// export const updatePost = (post: Post): Promise<Post> => api.put(`${POSTS_BASE_URL}/${post.id}`, post)

// export const deletePost =  (post: Post): Promise<Post> => api.delete(`${POSTS_BASE_URL}/${post.id}`, { data: post})
