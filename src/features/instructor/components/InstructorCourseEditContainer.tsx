import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { getCourseById } from 'features/courses/api'
import { CourseFullInfor, CourseStatus } from 'features/courses/types'
import BackdropCustom from 'libs/ui/custom-components/BackdropCustom'
import { getUserRole } from 'libs/utils/handle-token'
import { UserRole } from 'types'
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
    if (!course) return null

    const isEditable =
      getUserRole() === UserRole.INSTRUCTOR &&
      course.status !== CourseStatus.PENDING &&
      course.status !== CourseStatus.BANNED

    switch (type) {
      case TypeInstructorEditCourseParams.CURRICULUMN:
        return <InstructorCurriculumEdit course={course} isEditable={isEditable} />
      case TypeInstructorEditCourseParams.BASICS:
        return <InstructorBasicsEdit currentCourse={course} isEditable={isEditable} />
      case TypeInstructorEditCourseParams.THUMBNAIL:
        return (
          <InstructorEditCourseThumbnail
            courseId={courseId}
            url={course?.thumbnailUrl}
            isEditable={isEditable}
          />
        )
      case TypeInstructorEditCourseParams.PRICING:
        return (
          <InstructorPricingEdit
            courseId={courseId}
            price={course?.price}
            isEditable={isEditable}
          />
        )
      default:
        return <InstructorCurriculumEdit course={course} isEditable={isEditable} />
    }
  }

  return (
    <Container maxWidth="lg">
      <BackdropCustom open={course === null} />
      {course && (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <InstructorCourseEditLeftSide currentType={type} course={course} />
          </Grid>
          <Grid item xs={9}>
            {renderRightSideComponent()}
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default InstructorCourseEditContainer
