import { Container } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'

import { getCourseReportsByStaff } from '../apis'
import { CourseReportFilterResponse } from '../types'

import TableCourseReport from './TableCourseReport'

const CourseReportManageContainer = () => {
  const [courseReports, setCourseReport] = useState<CourseReportFilterResponse[]>([])

  const fetchReports = async () => {
    try {
      const fetchedCourseReports = await getCourseReportsByStaff()
      setCourseReport(fetchedCourseReports)
    } catch (error) {
      console.error('Error fetching course reports:', error)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  return (
    <Container maxWidth="lg">
      <LayoutBodyContainer title="Báo cáo khóa học">
        <TableCourseReport courseReports={courseReports} />
      </LayoutBodyContainer>
    </Container>
  )
}

export default CourseReportManageContainer
