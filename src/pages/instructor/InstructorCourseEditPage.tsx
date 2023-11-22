import { useParams } from 'react-router-dom'

import InstructorCourseEditContainer from 'features/instructor/components/InstructorCourseEditContainer'
import { TypeInstructorEditCourseParams } from 'types/params.enum'

const InstructorCourseEditPage = () => {
  const { type, courseId } = useParams()

  return (
    <InstructorCourseEditContainer
      courseId={courseId as string}
      type={type as TypeInstructorEditCourseParams}
    />
  )
}

export default InstructorCourseEditPage
