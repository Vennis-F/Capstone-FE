import { Paper, Typography } from '@mui/material'
import { StepType, TourProvider } from '@reactour/tour'
import React from 'react'
import { useParams } from 'react-router-dom'

import ChapterLectureLearnContainer from 'features/chapter-lecture/components/ChapterLectureLearnContainer'

const steps: StepType[] = [
  {
    selector: '.first-step',
    content: (
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h5" fontWeight="bold" marginBottom="20px">
          Danh sách bài giảng
        </Typography>
        <Typography>Đây là danh sách video trong khóa học nha</Typography>
      </Paper>
    ),
  },
  {
    selector: '.second-step',
    content: (
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h5" fontWeight="bold" marginBottom="20px">
          Xem video dạy vẽ
        </Typography>
        <Typography>Và khi &quot;bé&ldquo; chọn nội dung này</Typography>
      </Paper>
    ),
  },
  {
    selector: '.third-step',
    content: (
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h5" fontWeight="bold" marginBottom="20px">
          Màn hình màu nhiệm
        </Typography>
        <Typography>Video về nội dung mà &quot;bé&ldquo; chọn sẽ ở đây nha!</Typography>
      </Paper>
    ),
  },
  {
    selector: '.fourth-step',
    content: (
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h5" fontWeight="bold" marginBottom="20px">
          Bông hoa màu xanh
        </Typography>
        <Typography>
          Sau khi &quot;bé&ldquo; học hết video thì một bông hoa được nở rộ ở đây nhé !
        </Typography>
      </Paper>
    ),
  },
  {
    selector: '.fifth-step',
    content: (
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h5" fontWeight="bold" marginBottom="20px">
          Bé thắc mắc &quot;bé&ldquo;
        </Typography>
        <Typography>Nếu có câu hỏi gì thì &quot;bé&ldquo; có thể hỏi ở đây nha !!</Typography>
      </Paper>
    ),
  },
  {
    selector: '.six-step',
    content: (
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h5" fontWeight="bold" marginBottom="20px">
          Chúc &quot;bé&ldquo; học vui vẻ !
        </Typography>
        {/* <Typography>Nếu có câu hỏi gì thì &quot;bé&ldquo; có thể hỏi ở đây nha !!</Typography> */}
      </Paper>
    ),
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
