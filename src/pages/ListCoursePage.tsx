import React from 'react'
import { useLocation } from 'react-router-dom'

import { CourseListGuestContainer } from 'features/courses/components/CourseListGuestContainer'

type LocationStateType = { searchText?: string; categorySearchId?: string }

const ListCoursePage = () => {
  const locationState = useLocation().state as LocationStateType
  return (
    <div>
      <CourseListGuestContainer
        searchText={locationState?.searchText}
        categorySearchId={locationState?.categorySearchId}
      />
    </div>
  )
}

export default ListCoursePage
