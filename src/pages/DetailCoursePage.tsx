import React from 'react'
import { useParams } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'

import { NotFound } from 'components/Common'
import { CouresDetailGuestContainer } from 'features/courses/components/CourseDetailGuestContainer'

// type LocationStateType = { id: string }

const DetailCoursePage = () => {
  // const locationState = useLocation().state as LocationStateType
  const { courseId } = useParams()

  return courseId === undefined ? <NotFound /> : <CouresDetailGuestContainer id={courseId} />
}

export default DetailCoursePage
