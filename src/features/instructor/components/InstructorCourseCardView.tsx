import { Button, Card, CardMedia, Grid, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CourseStatus, courseStatusInfors } from 'features/courses/types'
import { getImage } from 'features/image/components/apis'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { TypeInstructorEditCourseParams } from 'types/params.enum'

import { removeCourseByInstructor } from '../api'
import { CourseFilterByInstructorResponse } from '../types'

interface Props {
  course: CourseFilterByInstructorResponse
  handleGetCourseByInstructor: () => Promise<void>
}

const InstructorCourseCardView = ({ course, handleGetCourseByInstructor }: Props) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const statusInfor = courseStatusInfors.find(({ status }) => status === course.status)

  const handleDeleteChapterLecture = async () => {
    setLoading(true)
    try {
      await removeCourseByInstructor(course.id)
      toastSuccess({ message: 'Xóa khóa học thành công' })
      setOpenDelete(false)
      handleGetCourseByInstructor()
    } catch (error) {
      showErrorResponseSaga({ error, defaultMessage: 'Bài giảng không được phép xóa' })
    }
    setLoading(false)
  }

  return (
    <>
      <Paper elevation={3}>
        <Card sx={{ display: 'flex', marginBottom: '20px', height: '150px' }}>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <CardMedia
                component="img"
                style={{ width: '150px', height: '150px', objectFit: 'contain' }}
                image={
                  course.thumbnailUrl
                    ? getImage(course.thumbnailUrl)
                    : 'https://s.udemycdn.com/course/200_H/placeholder.jpg'
                }
                alt="Ảnh đại diện"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: 'bold', fontSize: '16px' }}
              >
                {course.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: statusInfor?.color,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: 'GrayText',
                    marginRight: '10px',
                  }}
                  component="span"
                >
                  Trạng thái
                </Typography>
                {statusInfor?.vietnamese}
              </Typography>
            </Grid>
            <Grid item xs={2} display="flex" justifyContent="flex-end" paddingRight="20px">
              {course.status === CourseStatus.CREATED && (
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    width: '140px',
                    fontWeight: 'bold',
                    borderWidth: '2px',
                  }}
                  onClick={() => setOpenDelete(true)}
                >
                  Xóa
                </Button>
              )}
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                sx={{
                  width: '140px',
                  fontWeight: 'bold',
                  backgroundColor: '#4f46e5',
                  ':hover': {
                    backgroundColor: '#5f58e4',
                  },
                }}
                onClick={() =>
                  navigate(
                    `/course/edit/${course.id}/manage/${TypeInstructorEditCourseParams.CURRICULUMN}`,
                  )
                }
              >
                Chỉnh sửa
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Paper>

      <DialogBinaryQuestion
        titleText="Xóa khóa học"
        contentText="Bạn có chắc muốn xóa khóa học này không?"
        open={openDelete}
        isLoading={loading}
        clickCloseModal={() => setOpenDelete(false)}
        clickAcceptAction={handleDeleteChapterLecture}
      />
    </>
  )
}

export default InstructorCourseCardView
