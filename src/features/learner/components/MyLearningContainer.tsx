/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Container,
  Typography,
  Box,
  Grid,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { getCourseByCustomer } from 'features/courses/api'
import {
  CourseFilterResponse,
  CourseLearnStatus,
  CourseLearnerFilterResponse,
} from 'features/courses/types'
import { toastError } from 'libs/utils/handle-toast'
import { getAccessToken, getUserRole } from 'libs/utils/handle-token'
import { UserRole } from 'types'

import { getCourseForLearnerSearchByUser } from '../api'

import { MyLearningCourseCardView } from './MyLearningCourseCardView'

export const MyLearningContainer = () => {
  const [courses, setCourses] = useState<CourseLearnerFilterResponse[] | CourseFilterResponse[]>([])
  const [courseLearnStatus, setCourseLearnStatus] = useState<CourseLearnStatus | undefined>(
    undefined,
  )

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setCourseLearnStatus(event.target.value as CourseLearnStatus)
  }

  const getCourses = async () => {
    const userRole = getUserRole()
    if (!userRole) toastError({ message: 'Hãy đăng nhập và tôi sẽ cho trả về khóa học của bạn ạ' })

    if (userRole === UserRole.CUSTOMER) setCourses(await getCourseByCustomer(courseLearnStatus))
    else if (userRole === UserRole.LEARNER)
      setCourses((await getCourseForLearnerSearchByUser('', courseLearnStatus)).data)
  }

  useEffect(() => {
    getCourses()
  }, [courseLearnStatus])

  console.log('[list]', courses)

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundImage: `url("https://img4.thuthuatphanmem.vn/uploads/2020/07/05/background-vui-nhon-cho-tre-em_035755170.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '150vh',
        margin: '-50px 0',
      }}
    >
      <Container maxWidth="lg" sx={{ paddingTop: '50px' }}>
        <Box width="200px" marginBottom="20px">
          <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
            <InputLabel id="label-course-learn-status">Trạng thái khóa học</InputLabel>
            <Select
              labelId="label-course-learn-status"
              id="select-course-learn-status"
              onChange={handleChangeStatus}
              label="course-learn-status"
              value={courseLearnStatus}
            >
              <MenuItem value={undefined}>{'Tất cả'}</MenuItem>
              <MenuItem key={CourseLearnStatus.COMPLETED} value={CourseLearnStatus.COMPLETED}>
                {'Hoàn thành'}
              </MenuItem>
              <MenuItem key={CourseLearnStatus.LEARNING} value={CourseLearnStatus.LEARNING}>
                {'Đang học'}
              </MenuItem>
              <MenuItem key={CourseLearnStatus.NOT_LEARNING} value={CourseLearnStatus.NOT_LEARNING}>
                {'Chưa học'}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 9 }}>
            {courses.map(learningCourse => (
              <Grid item xs={2} sm={3} md={3} key={learningCourse.id}>
                <MyLearningCourseCardView
                  learningCourse={learningCourse}
                  handleGetCourses={getCourses}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Container>
  )
}
