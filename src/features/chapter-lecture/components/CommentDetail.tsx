import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import DOMPurify from 'dompurify'
import Parser from 'html-react-parser'
import React from 'react'

import { getStringDayMonthYear } from 'libs/utils/handle-date'

import { QuestionTopicFilterResponse } from '../../question-topic/types/index'

type Props = {
  comment: QuestionTopicFilterResponse
}

const CommentDetail = ({ comment }: Props) => {
  const fullName = () => {
    if (comment.user)
      return `${comment.user?.lastName} ${comment.user?.middleName} ${comment.user?.firstName} `
    return `${comment.learner?.lastName} ${comment.learner?.middleName} ${comment.learner?.firstName} `
  }

  return (
    <Paper
      elevation={2}
      key={comment.id}
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
            {comment.user ? comment.user.firstName : comment.learner?.firstName}
          </Avatar>
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth overflow="hidden">
          <h4 style={{ margin: 0, textAlign: 'left' }}>{comment.title}</h4>
          <p style={{ textAlign: 'left', color: '#702AD8', fontSize: '12px', marginTop: '0px' }}>
            <span style={{ margin: 0, textAlign: 'left', textDecoration: 'underline' }}>
              {fullName()}
            </span>
            {`Bài giảng số ${comment.chapterLecture.index} - `}
            <span style={{ color: 'gray' }}>{`${getStringDayMonthYear(comment.updatedDate)}`}</span>
          </p>
          {comment.description && Parser(DOMPurify.sanitize(comment.description))}
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
  )
}

export default CommentDetail
