import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { getCourseById } from 'features/courses/api'
import { CourseFullInfor } from 'features/courses/types'
import { TypeInstructorEditCourseParams } from 'types/params.enum'

import InstructorBasicsEdit from './InstructorBasicsEdit'
import InstructorCourseEditLeftSide from './InstructorCourseEditLeftSide'
import InstructorCurriculumEdit from './InstructorCurriculumEdit'
import InstructorEditCourseThumbnail from './InstructorEditCourseThumbnail'
import InstructorPricingEdit from './InstructorPricingEdit'

type Props = {
  courseId: string
  type: TypeInstructorEditCourseParams
}

const InstructorCourseEditContainer = ({ courseId, type }: Props) => {
  const [course, setCourse] = useState<CourseFullInfor | null>(null)

  const handleGetCourse = async () => {
    const courseRes = await getCourseById(courseId)
    setCourse(courseRes)
  }

  useEffect(() => {
    handleGetCourse()
  }, [courseId])

  const renderRightSideComponent = () => {
    switch (type) {
      case TypeInstructorEditCourseParams.CURRICULUMN:
        return <InstructorCurriculumEdit courseId={courseId} />
      case TypeInstructorEditCourseParams.BASICS:
        return <InstructorBasicsEdit courseId={courseId} />
      case TypeInstructorEditCourseParams.THUMBNAIL:
        return <InstructorEditCourseThumbnail courseId={courseId} url={course?.thumbnailUrl} />
      case TypeInstructorEditCourseParams.PRICING:
        return <InstructorPricingEdit courseId={courseId} price={course?.price} />
      default:
        return <InstructorCurriculumEdit courseId={courseId} />
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <InstructorCourseEditLeftSide currentType={type} />
        </Grid>
        <Grid item xs={9}>
          {renderRightSideComponent()}
        </Grid>
      </Grid>
    </Container>
  )
}

export default InstructorCourseEditContainer
