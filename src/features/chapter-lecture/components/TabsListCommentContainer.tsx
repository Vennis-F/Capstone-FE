import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { Avatar, Container, Grid, Typography, Box, Button, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { CreateQuestionTopicForm } from 'features/question-topic/components/CreateQuestionTopicForm'
import {
  QuestionTopicFilterResponse,
  SortFieldSearchFilterQuestionTopic,
} from 'features/question-topic/types'
import { getStringDayMonthYear } from 'libs/utils/handle-date'
import { toastSuccess } from 'libs/utils/handle-toast'
import { OrderType } from 'types'

import { createQuestionTopic, searchFilterQuestionTopic } from '../../question-topic/api/index'

import CommentDetail from './CommentDetail'

const TabsListCommentContainer = () => {
  const [isAddQuestionTopic, setIsAddQuestionTopic] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const [comments, setComments] = useState<QuestionTopicFilterResponse[]>([])
  const [currComment, setCurrComment] = useState<QuestionTopicFilterResponse | null>(null)

  const handleSearchFilterComments = async () => {
    const responses = await searchFilterQuestionTopic({
      active: true,
      sortField: SortFieldSearchFilterQuestionTopic.UPDATED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        take: 5,
        page: 1,
      },
    })
    setComments(responses.data)
  }

  useEffect(() => {
    handleSearchFilterComments()
  }, [])

  return (
    <Container maxWidth="md">
      {(currComment || isAddQuestionTopic) && (
        <Button
          variant="text"
          onClick={() => {
            setCurrComment(null)
            setIsAddQuestionTopic(false)
          }}
          sx={{ marginBottom: '20px' }}
        >
          Quay lại danh sách câu hỏi
        </Button>
      )}

      {!currComment ? (
        <>
          {isAddQuestionTopic ? (
            <CreateQuestionTopicForm
              isLoading={btnLoading}
              onSubmitClick={async (data, comment) => {
                try {
                  setBtnLoading(true)
                  await createQuestionTopic(searchParams.get('chapterLectureId') as string, {
                    title: data.title,
                    description: comment !== '' ? comment : undefined,
                  })
                  toastSuccess({ message: 'Thêm câu hỏi thành công' })
                } catch (error) {
                  console.log(error)
                }
                setBtnLoading(false)
              }}
            />
          ) : (
            comments.map(comment => (
              <Paper
                elevation={2}
                key={comment.id}
                sx={{
                  marginBottom: '25px',
                  paddingX: '20px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#ffffffc8',
                  },
                }}
                onClick={() => setCurrComment(comment)}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar sx={{ backgroundColor: '#2D2F31' }}>
                      {comment.user ? comment.user.firstName : comment.learner?.firstName}
                    </Avatar>
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    {comment.user ? (
                      <h4
                        style={{ margin: 0, textAlign: 'left' }}
                      >{`${comment.user?.lastName} ${comment.user?.middleName} ${comment.user?.firstName} `}</h4>
                    ) : (
                      <h4
                        style={{ margin: 0, textAlign: 'left' }}
                      >{`${comment.learner?.lastName} ${comment.learner?.middleName} ${comment.learner?.firstName} `}</h4>
                    )}
                    <h5 style={{ margin: 0, textAlign: 'left' }}>{comment.title}</h5>
                    <p style={{ textAlign: 'left', color: '#702AD8' }}>
                      {`Bài giảng số ${comment.chapterLecture.index} - `}
                      <span style={{ color: 'gray' }}>{`${getStringDayMonthYear(
                        comment.updatedDate,
                      )}`}</span>
                    </p>
                  </Grid>
                  <Grid item>
                    <Box>
                      <Typography
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        1 <QuestionAnswerIcon />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}
        </>
      ) : (
        <CommentDetail comment={currComment} />
      )}

      {!isAddQuestionTopic && (
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
