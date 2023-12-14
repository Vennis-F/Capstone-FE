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
    </Container>
  )
}

export default CourseReportManageContainer
