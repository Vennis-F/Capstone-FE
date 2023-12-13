import {
  Container,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
  Pagination,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'

import { CreateQuestionTopicForm } from 'features/question-topic/components/CreateQuestionTopicForm'
import QuestionTopicCardView from 'features/question-topic/components/QuestionTopicCardView'
import {
  QuestionTopicFilterResponse,
  SortFieldSearchFilterQuestionTopic,
} from 'features/question-topic/types'
import { CreateQuestionTopicFormInput } from 'features/question-topic/types/form.type'
import { toastSuccess } from 'libs/utils/handle-toast'
import { OrderType } from 'types'

import { createQuestionTopic, searchFilterQuestionTopic } from '../../question-topic/api/index'

import QuestionTopicDetailContainer from './QuestionTopicDetailContainer'

const TabsListCommentContainer = () => {
  const [isAddQuestionTopic, setIsAddQuestionTopic] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const { courseId } = useParams()
  const [questionTopics, setQuestionTopics] = useState<QuestionTopicFilterResponse[]>([])
  const [currQuestionTopic, setCurrQuestionTopic] = useState<QuestionTopicFilterResponse | null>(
    null,
  )
  const chapterLectureId = searchParams.get('chapterLectureId')
  const [isCurrent, setIsCurrent] = useState<'true' | 'false'>('true')
  const [orderType, setOrderType] = useState<OrderType>(OrderType.DESC)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [reRender, setReRender] = useState(false)

  const handleSearchFilterQuestionTopics = async () => {
    const responses = await searchFilterQuestionTopic({
      courseId: courseId as string,
      chapterLectureId: isCurrent === 'true' ? (chapterLectureId as string) : undefined,
      active: true,
      sortField: SortFieldSearchFilterQuestionTopic.UPDATED_DATE,
      pageOptions: {
        order: orderType,
        take: 5,
        page,
      },
    })
    setQuestionTopics(responses.data)
    setPageCount(responses.meta.pageCount)
  }

  const handleCreateQuestionTopic = async (
    data: CreateQuestionTopicFormInput,
    comment: string,
    reset: UseFormReset<CreateQuestionTopicFormInput>,
  ) => {
    try {
      setBtnLoading(true)
      await createQuestionTopic(searchParams.get('chapterLectureId') as string, {
        title: data.title,
        description: comment !== '' ? comment : undefined,
      })
      toastSuccess({ message: 'Thêm câu hỏi thành công' })
      handleSearchFilterQuestionTopics()
      setIsAddQuestionTopic(false)
      reset()
    } catch (error) {
      console.log(error)
    }
    setBtnLoading(false)
  }

  const renderListOrCreateQuestionTopic = isAddQuestionTopic ? (
    <CreateQuestionTopicForm isLoading={btnLoading} onSubmitClick={handleCreateQuestionTopic} />
  ) : (
    questionTopics.map(questionTopic => (
      <QuestionTopicCardView
        onChangeQuestionTopic={() => setCurrQuestionTopic(questionTopic)}
        key={questionTopic.id}
        questionTopic={questionTopic}
      />
    ))
  )

  useEffect(() => {
    if (chapterLectureId) {
      setPage(1)
      setPageCount(0)
      setIsCurrent('true')
      setCurrQuestionTopic(null)
      setOrderType(OrderType.DESC)
      setReRender(!reRender)
    }
  }, [chapterLectureId])

  useEffect(() => {
    handleSearchFilterQuestionTopics()
  }, [page, isCurrent, orderType, reRender])

  return (
    <Container maxWidth="md">
      {(currQuestionTopic || isAddQuestionTopic) && (
        <Button
          variant="text"
          onClick={() => {
            setCurrQuestionTopic(null)
            setIsAddQuestionTopic(false)
          }}
          sx={{ marginBottom: '20px' }}
        >
          Quay lại danh sách câu hỏi
        </Button>
      )}

      {!currQuestionTopic && !isAddQuestionTopic && (
        <Grid container spacing={0} marginBottom="40px">
          <Grid item xs={3}>
            <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
              <InputLabel id="label-filter">Bộ lọc:</InputLabel>
              <Select
                labelId="label-filter"
                id="select-filter"
                onChange={e => {
                  setIsCurrent(e.target.value as 'true' | 'false')
                  setPage(1)
                }}
                label="filter"
                value={isCurrent}
              >
                <MenuItem value={'true'}>{'Bài giảng hiện tại'}</MenuItem>
                <MenuItem value={'false'}>{'Tất cả các bài giảng'}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} marginLeft="14px">
            <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
              <InputLabel id="label-order">Sắp xếp theo:</InputLabel>
              <Select
                labelId="label-order"
                id="select-order"
                onChange={e => {
                  setOrderType(e.target.value as OrderType)
                  setPage(1)
                }}
                label="order"
                value={orderType}
              >
                <MenuItem value={OrderType.DESC}>{'Sắp xếp theo thứ tự gần đây nhất'}</MenuItem>
                <MenuItem value={OrderType.ASC}>{'Sắp xếp theo thứ tự cũ nhất'}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

      {!currQuestionTopic ? (
        <>{renderListOrCreateQuestionTopic}</>
      ) : (
        <QuestionTopicDetailContainer
          questionTopic={currQuestionTopic}
          handleSearchFilterQuestionTopics={handleSearchFilterQuestionTopics}
        />
      )}

      {pageCount > 1 && !currQuestionTopic && !isAddQuestionTopic && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '40px' }}>
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="secondary"
            />
          </Stack>
        </Box>
      )}

      {!isAddQuestionTopic && !currQuestionTopic && (
        <Button
          variant="text"
          onClick={() => {
            setIsAddQuestionTopic(true)
          }}
        >
          Đặt câu hỏi mới
        </Button>
      )}
    </Container>
  )
}

export default TabsListCommentContainer
