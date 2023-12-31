/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios'

import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import {
  ChangeIndexChapterLectureBodyRequest,
  ChapterLecture,
  ChapterLectureFilter,
  CreateChapterLectureBodyRequest,
  UpdateChapterLectureBodyRequest,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const CHAPTER_LECTURE_BASE_URL = `/chapter-lecture`

const USER_LECTURE_BASE_URL = `/user-lecture`

export const getChapterLecturesByCourseId = (
  courseId: string,
  active: boolean,
): Promise<ChapterLecture[]> =>
  api.get(`${CHAPTER_LECTURE_BASE_URL}/courses/${courseId}?active=${active}`)

export const getChapterLecturesByChapterLectureId = (
  chapterLectureId: string,
): Promise<ChapterLecture> => api.get(`${CHAPTER_LECTURE_BASE_URL}/${chapterLectureId}`)

export const getChapterLectureOfLearnerStudy = (
  courseId: string,
): Promise<ChapterLectureFilter[]> =>
  api.get(`${CHAPTER_LECTURE_BASE_URL}/courses/learner/study?courseId=${courseId}`)

export const getChapterLectureOfInstructorStudy = (
  courseId: string,
): Promise<ChapterLectureFilter[]> =>
  api.get(`${CHAPTER_LECTURE_BASE_URL}/courses/instructor/study?courseId=${courseId}`)

export const saveUserLectureCompleted = (
  chapterLectureId: string,
): Promise<ChapterLectureFilter[]> =>
  api.post(`${USER_LECTURE_BASE_URL}/save`, { chapterLectureId })

export const changeIndexChapterLecture = (
  body: ChangeIndexChapterLectureBodyRequest,
): Promise<void> => api.patch(`${CHAPTER_LECTURE_BASE_URL}/index/swap`, body)

export const createChapterLecture = (
  body: CreateChapterLectureBodyRequest,
): Promise<ChapterLecture[]> => api.post(`${CHAPTER_LECTURE_BASE_URL}`, body)

export const updateChapterLecture = (
  body: UpdateChapterLectureBodyRequest,
): Promise<ChapterLecture[]> => api.patch(`${CHAPTER_LECTURE_BASE_URL}`, body)

export const uploadChapterLectureVideo = (
  chapterLectureId: string,
  body: any,
  config: AxiosRequestConfig,
): Promise<void> =>
  api.post(
    `${CHAPTER_LECTURE_BASE_URL}/video/upload?chapterLectureId=${chapterLectureId}`,
    body,
    config,
  )
