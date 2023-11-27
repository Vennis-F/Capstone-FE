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
}

const QuestionAnswersContainer = ({ questionTopicId }: Props) => {
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswerFilterResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGetQuestionAnswers = async () => {
    const { data } = await searchFilterQuestionAnswer({
      questionTopicId,
      active: true,
      sortField: SortFieldSearchFilterQuestionTopic.UPDATED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 5,
      },
    })
    setQuestionAnswers(data)
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
    } catch (error) {
      console.log('component=QuestionAnswersContainer', error)
      toastError({ message: 'Không thể thêm câu trả lời' })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    handleGetQuestionAnswers()
  }, [questionTopicId])

  return (
    <>
      <QuestionAnswerCreateForm isLoading={isLoading} onSubmitClick={handleCreateQuestionAnswer} />
      {questionAnswers.map(questionAnswer => (
        <QuestionAnswerCardView key={questionAnswer.id} questionAnswer={questionAnswer} />
      ))}
    </>
  )
}

export default QuestionAnswersContainer
