import AddIcon from '@mui/icons-material/Add'
import { Container, Fab, Pagination, Stack } from '@mui/material'
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
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [courses, setCourses] = useState<CourseFilterByInstructorResponse[]>([])

  const handleGetCourseByInstructor = async () => {
    const responses = await getCoursesByInstructorId({ order: OrderType.DESC, page, take: 5 })
    setCourses(responses.data)
    setPageCount(responses.meta.pageCount)
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    handleGetCourseByInstructor()
  }, [page])

  return (
    <Box sx={{ display: 'flex' }}>
      <Container>
        <TitleTypography title="Khóa học" />
        <Box></Box>
        {courses.map(course => (
          <InstructorCourseCardView key={course.id} course={course} />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '40px' }}>
          <Stack spacing={2}>
            <Pagination count={pageCount} page={page} onChange={handleChange} color="secondary" />
          </Stack>
        </Box>
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
