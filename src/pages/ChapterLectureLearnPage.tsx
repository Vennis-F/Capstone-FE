import { Paper, Typography } from '@mui/material'
import { StepType, TourProvider } from '@reactour/tour'
import React from 'react'
import { useParams } from 'react-router-dom'

import ChapterLectureLearnContainer from 'features/chapter-lecture/components/ChapterLectureLearnContainer'

const steps: StepType[] = [
  {
    selector: '.first-step',
    content: (
      <Paper>
        <Typography variant="h5" fontWeight="bold">
          Xem bài giảng
        </Typography>
        <Typography>Đây là bài giảng ạ</Typography>
      </Paper>
    ),
  },
  {
    selector: '.second-step',
    content: 'This is my second Step',
  },
  {
    selector: '.third-step',
    content: 'This is my second Step',
  },
  {
    selector: '.fourth-step',
    content: 'This is my second Step',
  },
  // ...
]

const ChapterLectureLearnPage = () => {
  const { courseId } = useParams()

  return (
    <TourProvider steps={steps}>
      <ChapterLectureLearnContainer courseId={courseId as string} />
    </TourProvider>
  )
}

export default ChapterLectureLearnPage
