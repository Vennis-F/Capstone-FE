import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Box, Breadcrumbs, Container, Grid, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getCourseById } from 'features/courses/api'
import { CourseFullInfor, CourseStatus } from 'features/courses/types'
import { MainColor } from 'libs/const/color'
import BackdropCustom from 'libs/ui/custom-components/BackdropCustom'
import { getUserRole, getUserRoleOrNull } from 'libs/utils/handle-token'
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
  const navigate = useNavigate()
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

    // Only for instructor
    const isEditable =
      getUserRole() === UserRole.INSTRUCTOR &&
      (course.status === CourseStatus.CREATED ||
        course.status === CourseStatus.APPROVED ||
        course.status === CourseStatus.REJECTED)

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
            handleGetCourse={handleGetCourse}
          />
        )
      case TypeInstructorEditCourseParams.PRICING:
        return (
          <InstructorPricingEdit
            courseId={courseId}
            price={course?.price}
            isEditable={isEditable}
            handleGetCourse={handleGetCourse}
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
        <>
          {getUserRoleOrNull() === UserRole.INSTRUCTOR && (
            <Box display="flex">
              <Breadcrumbs sx={{ marginBottom: '10px' }}>
                <Link
                  underline="hover"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: MainColor.YELLOW_500,
                    cursor: 'pointer',
                  }}
                  color="inherit"
                  onClick={() => navigate('/instructor/homepage')}
                >
                  <KeyboardBackspaceIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Quay trở lại danh sách khóa học
                </Link>
              </Breadcrumbs>
            </Box>
          )}
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <InstructorCourseEditLeftSide
                currentType={type}
                course={course}
                handleGetCourse={handleGetCourse}
              />
            </Grid>
            <Grid item xs={9}>
              {renderRightSideComponent()}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}

export default InstructorCourseEditContainer
