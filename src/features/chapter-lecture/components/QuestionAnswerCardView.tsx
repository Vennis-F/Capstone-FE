import { Avatar, Grid, Paper } from '@mui/material'
import React from 'react'

import { QuestionAnswerFilterResponse } from 'features/question-topic/types'
import { getStringDayMonthYear } from 'libs/utils/handle-date'
import { renderHTML } from 'libs/utils/handle-html-data'
import { UserRole } from 'types'

type Props = {
  questionAnswer: QuestionAnswerFilterResponse
}

const QuestionAnswerCardView = ({ questionAnswer }: Props) => {
  const userFullName = questionAnswer.user
    ? `${questionAnswer.user?.lastName} ${questionAnswer.user?.middleName} ${questionAnswer.user?.firstName} `
    : `${questionAnswer.learner?.lastName} ${questionAnswer.learner?.middleName} ${questionAnswer.learner?.firstName} `

  const teacherFullName =
    questionAnswer.user?.role?.name === UserRole.INSTRUCTOR ? ' - Giáo viên' : undefined

  return (
    <Paper
      elevation={2}
      key={questionAnswer.id}
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
            {questionAnswer.user
              ? questionAnswer.user.firstName
              : questionAnswer.learner?.firstName}
          </Avatar>
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth overflow="hidden">
          <p
            style={{
              textAlign: 'left',
              color: '#702AD8',
              fontSize: '12px',
              marginTop: '0px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ margin: 0, textAlign: 'left', textDecoration: 'underline' }}>
              {userFullName}
            </span>
            <span style={{ color: 'gray', marginLeft: '10px' }}>{`${getStringDayMonthYear(
              questionAnswer.updatedDate,
            )}`}</span>
            <span
              style={{ color: 'gray', fontWeight: 'bold', fontSize: '18px', marginLeft: '10px' }}
            >
              {teacherFullName}
            </span>
          </p>
          {renderHTML(questionAnswer.description)}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default QuestionAnswerCardView
