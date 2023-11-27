import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import DOMPurify from 'dompurify'
import Parser from 'html-react-parser'

import { getStringDayMonthYear } from 'libs/utils/handle-date'

import { QuestionTopicFilterResponse } from '../../question-topic/types/index'

import QuestionAnswersContainer from './QuestionAnswersContainer'

type Props = {
  questionTopic: QuestionTopicFilterResponse
}

const QuestionTopicDetailContainer = ({ questionTopic }: Props) => {
  const userFullName = questionTopic.user
    ? `${questionTopic.user?.lastName} ${questionTopic.user?.middleName} ${questionTopic.user?.firstName} `
    : `${questionTopic.learner?.lastName} ${questionTopic.learner?.middleName} ${questionTopic.learner?.firstName} `

  return (
    <>
      <Paper
        elevation={2}
        key={questionTopic.id}
        sx={{
          marginBottom: '25px',
          paddingX: '20px',
          borderRadius: '10px',
          ':hover': {
            backgroundColor: '#ffffffc8',
          },
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar sx={{ backgroundColor: '#2D2F31' }}>
              {questionTopic.user ? questionTopic.user.firstName : questionTopic.learner?.firstName}
            </Avatar>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth overflow="hidden">
            <h4 style={{ margin: 0, textAlign: 'left' }}>{questionTopic.title}</h4>
            <p style={{ textAlign: 'left', color: '#702AD8', fontSize: '12px', marginTop: '0px' }}>
              <span style={{ margin: 0, textAlign: 'left', textDecoration: 'underline' }}>
                {userFullName}
              </span>
              {`Bài giảng số ${questionTopic.chapterLecture.index} - `}
              <span style={{ color: 'gray' }}>{`${getStringDayMonthYear(
                questionTopic.updatedDate,
              )}`}</span>
            </p>
            {questionTopic.description && Parser(DOMPurify.sanitize(questionTopic.description))}
          </Grid>
          <Grid item>
            <Box>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                1 <QuestionAnswerIcon />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <QuestionAnswersContainer questionTopicId={questionTopic.id} />
    </>
  )
}

export default QuestionTopicDetailContainer