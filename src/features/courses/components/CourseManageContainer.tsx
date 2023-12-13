import { Box, Container, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import CustomTabPanel from 'libs/ui/custom-components/CustomTabPanel'

import { getCoursesByStaff } from '../api'
import { CourseFullInfor, CourseStatus } from '../types/index'

import TableCourses from './TableCourses'

const CourseManageContainer = () => {
  const [courses, setCourses] = useState<CourseFullInfor[]>([])
  const [value, setValue] = useState(0)

  const fetchCourses = async (newValue: number) => {
    let status
    try {
      switch (newValue) {
        case 0:
          status = CourseStatus.APPROVED
          break
        case 1:
          status = CourseStatus.PENDING
          break
        case 2:
          status = CourseStatus.REJECTED
          break
        case 3:
          status = CourseStatus.BANNED
          break
        case 4:
          status = undefined
          break
        default:
          status = undefined
          break
      }

      const res = await getCoursesByStaff(status)
      setCourses(res)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    fetchCourses(newValue)
  }

  useEffect(() => {
    fetchCourses(0)
  }, [])

  return (
    <Container maxWidth="xl">
      <LayoutBodyContainer title="Khóa học" isPadding={true}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Được thông qua" id="approved" />
              <Tab label="Chờ phê duyệt" id="pending" />
              <Tab label="Từ chối" id="rejected" />
              <Tab label="Ban" id="banned" />
              <Tab label="Tất cả" id="all" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}></CustomTabPanel>
          <CustomTabPanel value={value} index={1}></CustomTabPanel>
          <CustomTabPanel value={value} index={2}></CustomTabPanel>
          <CustomTabPanel value={value} index={3}></CustomTabPanel>
          <CustomTabPanel value={value} index={4}></CustomTabPanel>
        </Box>
        <TableCourses
          courses={courses}
          onEditRow={courseId => {
            console.log(courseId)
          }}
          value={value}
          fetchCourses={fetchCourses}
        />
      </LayoutBodyContainer>
    </Container>
  )
}

export default CourseManageContainer
