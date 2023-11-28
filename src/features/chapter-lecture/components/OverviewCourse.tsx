import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { getCoursesDetailById } from 'features/courses/api'
import { GetCourseDetailResponse } from 'features/courses/types'
import ReadMoreText from 'libs/ui/components/ReadMoreText'

type Props = {
  courseId: string
}

const OverviewCourse = ({ courseId }: Props) => {
  const [courseDetail, setCourseDetail] = useState<GetCourseDetailResponse | null>(null)

  const getCourseDetail = async () => {
    try {
      const response = await getCoursesDetailById(courseId)
      setCourseDetail(response)
    } catch (error) {
      console.log(`Cannot get detail for course by the id ${courseId}`)
    }
  }

  useEffect(() => {
    getCourseDetail()
  }, [courseId])

  return (
    <Container maxWidth="md">
      {courseDetail && (
        <>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '30px' }}>
              Giới thiệu về khóa học
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '18px' }}>
              {courseDetail.title}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '20px' }}>
              Miêu tả
            </Typography>
            {courseDetail.description && (
              <ReadMoreText maxCharacterCount={400} text={courseDetail.description} />
            )}
          </Box>
        </>
      )}
    </Container>
  )
}

export default OverviewCourse
