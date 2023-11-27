/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import CustomButton from 'libs/ui/components/CustomButton'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { OrderType, PageOptions } from 'types'

import { getCoursesByStaff } from '../api'
import { CourseFullInfor } from '../types/index'

import TableCourses from './TableCourses'

const CourseManageContainer = () => {
  const [courses, setCourses] = useState<CourseFullInfor[]>([])
  const [currentCourse, setCurrentCourse] = useState<CourseFullInfor | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)

  const fetchCourses = async () => {
    try {
      const res = await getCoursesByStaff()
      setCourses(res)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <Container maxWidth="xl">
      <TitleTypography title="Khóa học" />
      <Paper elevation={10}>
        <TableCourses
          courses={courses}
          onEditRow={courseId => {
            console.log(courseId)
            // const post = posts.find(currPost => currPost.id === postId) as PostFilterResponse
            // setCurrentPost(post)
            // setIsOpenForm(true)
          }}
        />
      </Paper>
      {/* {currentPost && (
        <EditPostDialogForm
          defaultValues={{
            title: currentPost.title,
            active: currentPost.active,
            description: currentPost.description,
            resources: currentPost.resources,
          }}
          otherValues={{
            url: currentPost.thumbnail,
            postId: currentPost.id,
          }}
          onSubmitClick={async data => {
            setIsLoading(true)
            try {
              await updatePostByStaff({
                postId: currentPost.id,
                active: data.active,
                description: data.description,
                resources: data.resources,
                title: data.title,
              })
              fetchPosts()
              setCurrentPost(null)
              setIsOpenForm(false)
              toastSuccess({ message: 'Cập nhật bài đăng thành công' })
            } catch (error) {
              showErrorResponseSaga({ defaultMessage: 'Không thể cập nhật bài đăng', error })
            }
            setIsLoading(false)
          }}
          openDialog={isOpenForm}
          isLoading={isLoading}
          handleOpenDialog={() => setIsOpenForm(true)}
          handleCloseDialog={() => setIsOpenForm(false)}
        />
      )}
      */}
    </Container>
  )
}

export default CourseManageContainer
