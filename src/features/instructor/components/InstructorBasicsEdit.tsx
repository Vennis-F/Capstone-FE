/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import { getCategories } from 'features/category/api'
import { Category } from 'features/category/types'
import { getCourseById } from 'features/courses/api'
import { CourseFullInfor } from 'features/courses/types'
import { getLevels } from 'features/level/api'
import { Level } from 'features/level/types'
import { textFromHTMLCode } from 'libs/utils/handle-html-data'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { updateCourseByInstructor } from '../api'

import EditCourseBasicInformationForm from './EditCourseBasicInformationForm'

interface Props {
  currentCourse: CourseFullInfor
  isEditable: boolean
}

const InstructorBasicsEdit = ({ currentCourse, isEditable }: Props) => {
  const [levels, setLevels] = useState<Level[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [course, setCourse] = useState<CourseFullInfor | null>(currentCourse)

  const handlePrepare = async () => {
    const levelsRes = await getLevels('true')
    const categoriesRes = await getCategories('true')
    const courseRes = await getCourseById(currentCourse.id)
    console.log(courseRes)
    setLevels(levelsRes)
    setCategories(categoriesRes)
    setCourse(courseRes)
  }

  useEffect(() => {
    handlePrepare()
  }, [])

  return (
    <LayoutBodyContainer
      title="Trang chủ khóa học"
      introduction="Trang đích khóa học của bạn rất quan trọng cho sự thành công của bạn trên nền tảng của
    chúng tôi. Nếu làm đúng, nó cũng có thể giúp bạn có được khả năng hiển thị trên các công
    cụ tìm kiếm như Google. Khi bạn hoàn thành phần này, hãy nghĩ đến việc tạo Trang đích khóa
    học hấp dẫn để chứng minh lý do tại sao ai đó muốn đăng ký khóa học của bạn. Tìm hiểu thêm
    về cách tạo trang đích khóa học và tiêu chuẩn tiêu đề khóa học."
    >
      {course && (
        <EditCourseBasicInformationForm
          onSubmitClick={async data => {
            try {
              console.log(data)
              const description = textFromHTMLCode(data.description as string)
              const prepareMaterial = textFromHTMLCode(data.prepareMaterial as string)
              await updateCourseByInstructor({
                courseId: currentCourse.id,
                title: data.title,
                categoryId: data.categoryId,
                levelId: data.levelId,
                description: description ? data.description : null,
                prepareMaterial: prepareMaterial ? data.prepareMaterial : null,
              })
              handlePrepare()
              toastSuccess({ message: 'Cập nhật thông tin cơ bản thành công' })
            } catch (error) {
              showErrorResponseSaga({ defaultMessage: 'Không cập nhật được khóa học', error })
            }
          }}
          defaultValues={{
            title: course.title,
            description: course.description ? course.description : '',
            prepareMaterial: course.prepareMaterial ? course.prepareMaterial : '',
            categoryId: course.category.id,
            levelId: course.level.id,
          }}
          levels={levels}
          categories={categories}
          isEditable={isEditable}
        />
      )}
    </LayoutBodyContainer>
  )
}

export default InstructorBasicsEdit
