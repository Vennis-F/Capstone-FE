import { Button, Card, CardMedia, Grid, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { courseStatusInfors } from 'features/courses/types'
import { getImage } from 'features/image/components/apis'
import { TypeInstructorEditCourseParams } from 'types/params.enum'

import { CourseFilterByInstructorResponse } from '../types'

interface Props {
  course: CourseFilterByInstructorResponse
}

const InstructorCourseCardView = ({ course }: Props) => {
  const navigate = useNavigate()

  const statusInfor = courseStatusInfors.find(({ status }) => status === course.status)

  return (
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
            <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
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
          <Grid item xs={2}></Grid>
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
  )
}

export default InstructorCourseCardView
