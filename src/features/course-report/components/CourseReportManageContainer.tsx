import { Container, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import TitleTypography from 'libs/ui/components/TitleTypography'

import { getCourseReportsByStaff } from '../apis'
import { CourseReportFilterResponse } from '../types'

import TableCourseReport from './TableCourseReport'

const CourseReportManageContainer = () => {
  const [courseReports, setCourseReport] = useState<CourseReportFilterResponse[]>([])
  // const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  // const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)

  const fetchPosts = async () => {
    try {
      const fetchedCourseReports = await getCourseReportsByStaff()
      setCourseReport(fetchedCourseReports)
    } catch (error) {
      console.error('Error fetching course reports:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Container maxWidth="lg">
      <TitleTypography title="Báo cáo khóa học" />
      <Paper elevation={10}>
        <TableCourseReport courseReports={courseReports} />
      </Paper>
      {/* <CreatePostDialogForm
        defaultValues={{
          title: '',
          description: '',
          resources: '',
        }}
        onSubmitClick={async (data, reset) => {
          setIsLoadingCreate(true)
          try {
            await createPostByStaff({
              title: data.title,
              description: data.description,
              resources: data.resources,
            })
            reset()
            fetchPosts()
            setIsOpenFormCreate(false)
            toastSuccess({ message: 'Tạo bài đăng mới thành công' })
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Không thể tạo bài đăng mới', error })
          }
          setIsLoadingCreate(false)
        }}
        openDialog={isOpenFormCreate}
        isLoading={isLoadingCreate}
        handleOpenDialog={() => setIsOpenFormCreate(true)}
        handleCloseDialog={() => setIsOpenFormCreate(false)}
      /> */}
    </Container>
  )
}

export default CourseReportManageContainer
