/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import {
  CreateQuestionTopicBodyRequest,
  QuestionTopicFilterResponse,
  SearchFilterQuestionTopicBodyRequest,
  SearchFilterQuestionTopicResponse,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const QUESTION_TOPIC_BASE_URL = `/question-topic`

export const createQuestionTopic = (
  chapterLectureId: string,
  body: CreateQuestionTopicBodyRequest,
): Promise<void> => api.post(`${QUESTION_TOPIC_BASE_URL}/${chapterLectureId}`, body)

export const ratingQuestionTopic = (questionTopicId: string): Promise<void> =>
  api.patch(`${QUESTION_TOPIC_BASE_URL}/rating/${questionTopicId}`)

export const searchFilterQuestionTopic = (
  body: SearchFilterQuestionTopicBodyRequest,
): Promise<SearchFilterQuestionTopicResponse> => api.post(`${QUESTION_TOPIC_BASE_URL}/search`, body)

export const findQuestionTopicById = (
  questionTopicId: string,
): Promise<QuestionTopicFilterResponse> => api.get(`${QUESTION_TOPIC_BASE_URL}/${questionTopicId}`)
