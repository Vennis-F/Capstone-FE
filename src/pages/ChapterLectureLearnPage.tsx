import { Paper, Typography } from '@mui/material'
import { StepType, TourProvider } from '@reactour/tour'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { NotFound } from 'components/Common'
import ChapterLectureLearnContainer from 'features/chapter-lecture/components/ChapterLectureLearnContainer'
import { checkCourseAndUserValid } from 'features/courses/api'
import BackdropCustom from 'libs/ui/custom-components/BackdropCustom'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'

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
  const [loading, setLoading] = useState(true)
  const [isAllow, setIsAllow] = useState(false)

  const handleCheckUserValidAccess = async () => {
    try {
      const { status } = await checkCourseAndUserValid(courseId as string)
      setLoading(false)
      setIsAllow(status)
    } catch (error) {
      showErrorResponseSaga({
        error,
        defaultMessage: 'Không truy cập được vào khóa học',
        errorStatusMessages: [{ message: 'Bạn không được phép truy cập trang này', status: 403 }],
      })
      setLoading(false)
      setIsAllow(false)
    }
  }

  useEffect(() => {
    handleCheckUserValidAccess()
  }, [])

  return (
    <>
      <BackdropCustom open={loading} />
      {!loading && (
        <>
          {isAllow ? (
            <TourProvider steps={steps}>
              <ChapterLectureLearnContainer courseId={courseId as string} />
            </TourProvider>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  )
}

export default ChapterLectureLearnPage
