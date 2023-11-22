import AddIcon from '@mui/icons-material/Add'
import { Container, Fab } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TitleTypography from 'libs/ui/components/TitleTypography'
import { OrderType } from 'types'

import { getCoursesByInstructorId } from '../api/index'
import { CourseFilterByInstructorResponse } from '../types'

import InstructorCourseCardView from './InstructorCourseCardView'

const InstructorHomepageContainer = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<CourseFilterByInstructorResponse[]>([])

  const handleGetCourseByInstructor = async () => {
    const responses = await getCoursesByInstructorId({ order: OrderType.ASC, page: 1, take: 10 })
    setCourses(responses.data)
  }

  useEffect(() => {
    handleGetCourseByInstructor()
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <Container>
        <TitleTypography title="Khóa học" />
        <Box></Box>
        {courses.map(course => (
          <InstructorCourseCardView key={course.id} course={course} />
        ))}
      </Container>
      <Fab
        aria-label="add"
        onClick={() => navigate('/instructor/course/create')}
        sx={{
          position: 'fixed',
          bottom: '80px',
          right: '80px',
          color: 'white',
          backgroundColor: '#d946ef',
          ':hover': {
            color: 'white',
            backgroundColor: '#bd38d1',
          },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default InstructorHomepageContainer
