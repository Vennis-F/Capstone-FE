/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, Typography, Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'

import { CourseLearnerFilterResponse } from 'features/courses/types'

import { getCourseForLearnerSearchByUser } from '../api'

import { MyLearningCourseCardView } from './MyLearningCourseCardView'

export const MyLearningContainer = () => {
  const [courses, setCourses] = useState<CourseLearnerFilterResponse[]>([])

  const getCoursesOfLearner = async () => {
    const listCourses = await getCourseForLearnerSearchByUser('')
    setCourses(listCourses.data)
  }

  useEffect(() => {
    getCoursesOfLearner()
  }, [])
  console.log('[list]', courses)

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundImage: `url("https://img4.thuthuatphanmem.vn/uploads/2020/07/05/background-vui-nhon-cho-tre-em_035755170.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        margin: '-50px 0',
      }}
    >
      <Container maxWidth="lg" sx={{ paddingTop: '50px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 9 }}>
            {courses.map(learningCourse => (
              <Grid item xs={2} sm={3} md={3} key={learningCourse.id}>
                <MyLearningCourseCardView learningCourse={learningCourse} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Container>
  )
}
