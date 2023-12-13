import { Box, Pagination, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UseFormReset } from 'react-hook-form'

import { createQuestionAnswer, searchFilterQuestionAnswer } from 'features/question-topic/api'
import {
  QuestionAnswerFilterResponse,
  SortFieldSearchFilterQuestionTopic,
} from 'features/question-topic/types'
import { CreateQuestionAnswerFormInput } from 'features/question-topic/types/form.type'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'
import { OrderType } from 'types'

import QuestionAnswerCardView from './QuestionAnswerCardView'
import { QuestionAnswerCreateForm } from './QuestionAnswerCreateForm'

type Props = {
  questionTopicId: string
  handleSearchFilterQuestionTopics: () => Promise<void>
}

const QuestionAnswersContainer = ({ questionTopicId, handleSearchFilterQuestionTopics }: Props) => {
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswerFilterResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleGetQuestionAnswers = async () => {
    const { data, meta } = await searchFilterQuestionAnswer({
      questionTopicId,
      active: true,
      sortField: SortFieldSearchFilterQuestionTopic.UPDATED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page,
        take: 5,
      },
    })
    setQuestionAnswers(data)
    setPageCount(meta.pageCount)
  }

  const handleCreateQuestionAnswer = async (
    data: CreateQuestionAnswerFormInput,
    reset: UseFormReset<CreateQuestionAnswerFormInput>,
  ) => {
    setIsLoading(true)
    try {
      await createQuestionAnswer({
        questionTopicId,
        description: data.description,
      })
      toastSuccess({ message: 'Thêm câu trả lời mới thành công' })
      reset()
      handleGetQuestionAnswers()
      handleSearchFilterQuestionTopics()
    } catch (error) {
      console.log('component=QuestionAnswersContainer', error)
      toastError({ message: 'Không thể thêm câu trả lời' })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    handleGetQuestionAnswers()
  }, [questionTopicId, page])

  return (
    <>
      <QuestionAnswerCreateForm isLoading={isLoading} onSubmitClick={handleCreateQuestionAnswer} />
      {questionAnswers.map(questionAnswer => (
        <QuestionAnswerCardView key={questionAnswer.id} questionAnswer={questionAnswer} />
      ))}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Stack spacing={2}>
            <Pagination count={pageCount} page={page} onChange={handleChange} color="secondary" />
          </Stack>
        </Box>
      )}
    </>
  )
}

export default QuestionAnswersContainer
