import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

import { getStringDayMonthYear } from 'libs/utils/handle-date'

import { QuestionTopicFilterResponse } from '../types'

type Props = {
  questionTopic: QuestionTopicFilterResponse
  onChangeQuestionTopic: () => void
}

const QuestionTopicCardView = ({ questionTopic, onChangeQuestionTopic }: Props) => {
  const userFullName = questionTopic.user
    ? `${questionTopic.user?.lastName} ${questionTopic.user?.middleName} ${questionTopic.user?.firstName} `
    : `${questionTopic.learner?.lastName} ${questionTopic.learner?.middleName} ${questionTopic.learner?.firstName} `

  return (
    <Paper
      elevation={2}
      sx={{
        marginBottom: '25px',
        paddingX: '20px',
        borderRadius: '10px',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#ffffffc8',
        },
      }}
      onClick={onChangeQuestionTopic}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar sx={{ backgroundColor: '#2D2F31' }}>
            {questionTopic.user ? questionTopic.user.firstName : questionTopic.learner?.firstName}
          </Avatar>
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          {userFullName}
          <h5 style={{ margin: 0, textAlign: 'left' }}>{questionTopic.title}</h5>
          <Box style={{ textAlign: 'left', color: '#702AD8', marginBottom: '10px' }}>
            {`Bài giảng số ${questionTopic.chapterLecture.index} - `}
            <span style={{ color: 'gray' }}>{`${getStringDayMonthYear(
              questionTopic.updatedDate,
            )}`}</span>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {questionTopic.totalLengthQuestionAnswers} <QuestionAnswerIcon />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default QuestionTopicCardView
