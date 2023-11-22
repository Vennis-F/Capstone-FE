import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { TypeInstructorEditCourseParams } from 'types/params.enum'

import { CourseFilterByInstructorResponse } from '../types'

interface Props {
  course: CourseFilterByInstructorResponse
}

const InstructorCourseCardView = ({ course }: Props) => {
  const navigate = useNavigate()
  return (
    <Card sx={{ display: 'flex', marginBottom: '20px' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://s.udemycdn.com/course/200_H/placeholder.jpg"
        alt="Ảnh đại diện"
        width="150px"
        height="150px"
      />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            {course.title}
          </Typography>
        </CardContent>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            Trạng thái {course.status}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ marginLeft: 'auto', marginRight: '10px' }}>
        <Button
          variant="contained"
          sx={{
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
      </CardActions>
    </Card>
  )
}

export default InstructorCourseCardView
