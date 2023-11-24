import { Typography, Box, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import { getCourseByCustomer } from 'features/courses/api'
import { LearningCourseCardView } from 'features/courses/components/LearningCourseCardView'
import { CourseFilterResponse } from 'features/courses/types'
import { getLearnersByUser } from 'features/learner/api'
import { LearnerFilterResponse } from 'features/learner/types'

export const CustomerAllCourseContainer = () => {
  const [courses, setCourses] = useState<CourseFilterResponse[]>([])
  const [learners, setLearners] = useState<LearnerFilterResponse[]>([])

  const handleGetCourseForLearner = async () => {
    const coursesResponse = await getCourseByCustomer()
    setCourses(coursesResponse)
  }

  const handleGetLearners = async () => {
    const learnersFilterResponse = await getLearnersByUser()
    setLearners(learnersFilterResponse)
  }

  useEffect(() => {
    handleGetCourseForLearner()
    handleGetLearners()
  }, [])

  return (
    <Paper elevation={10} sx={{ padding: '40px', marginX: '50px' }}>
      <Typography variant="h5" fontWeight="bold" marginBottom="20px">
        Khóa học của tôi
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12 }}>
          {courses.map(course => (
            <Grid item xs={2} sm={3} md={3} key={course.id}>
              <LearningCourseCardView learningCourse={course} learners={learners} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}
