import React from 'react'
import { useLocation } from 'react-router-dom'

import { CouresDetailGuestContainer } from 'features/courses/components/CourseDetailGuestContainer'

type LocationStateType = { id: string }

const DetailCoursePage = () => {
  const locationState = useLocation().state as LocationStateType
  return (
    <div>
      <CouresDetailGuestContainer id={locationState.id} />
    </div>
  )
}

export default DetailCoursePage
