/* eslint-disable */
import { Autocomplete, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

import { getCoursesByInstructorId } from 'features/instructor/api'
import {
  CourseFilterByInstructorResponse,
  GetCoursesByInstructorBodyRequest,
} from 'features/instructor/types'
import CustomButton from 'libs/ui/components/CustomButton'
import { OrderType } from 'types'

import { createPromotionCourse, findPromotionCoursesByPromotionId } from '../api'
import { PromotionCourse } from '../types'

import TablePromotionCourses from './TablePromotionCourse'

export type Props = {
  openDialog: boolean
  handleCloseDialog: () => void
  promotionId: string
  // otherValues: { url?: string; postId: string }
}

const PromotionCourseDialogContainer = (props: Props) => {
  const [courses, setCourses] = useState<CourseFilterByInstructorResponse[]>([])
  const [promotionCourses, setPromotionCourses] = useState<PromotionCourse[]>([])
  const [selectCourses, setSelectCourses] = useState<CourseFilterByInstructorResponse[]>([])

  const handlePrepare = async () => {
    const promotionCoursesRes = await findPromotionCoursesByPromotionId(props.promotionId)
    setPromotionCourses(promotionCoursesRes)

    const bodyRequest: GetCoursesByInstructorBodyRequest = {
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 10000,
      },
    }

    const responses = await getCoursesByInstructorId(bodyRequest)
    const courseNotSelected = responses.data.filter(course =>
      promotionCoursesRes.every(promotionCourse => promotionCourse.course.id !== course.id),
    )
    setCourses(courseNotSelected)
  }

  const hanldeCreatePromotionCourses = async () => {
    for (let index = 0; index < selectCourses.length; index++) {
      await createPromotionCourse({
        courseId: selectCourses[index].id,
        isView: false,
        promotionId: props.promotionId,
      })
    }
    setSelectCourses([])
    handlePrepare()
  }

  useEffect(() => {
    handlePrepare()
  }, [])

  console.log(selectCourses)

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleCloseDialog}
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Tạo mã giảm giá mới
      </DialogTitle>
      <DialogContent>
        <Grid container marginY="20px" alignItems="center">
          <Grid item xs={10}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={courses}
              getOptionLabel={option => option.title}
              value={selectCourses}
              onChange={(_, selectedOptions) => {
                setSelectCourses(selectedOptions)
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Khóa học muốn được giảm"
                  placeholder="Chọn các khóa học muốn được giảm giá"
                />
              )}
            />
          </Grid>
          <Grid item xs={2} paddingLeft="20px">
            <CustomButton onClick={hanldeCreatePromotionCourses} sxCustom={{ height: '40px' }}>
              Thêm khóa học
            </CustomButton>
          </Grid>
        </Grid>

        <TablePromotionCourses promotionCourses={promotionCourses} onPrepare={handlePrepare} />
      </DialogContent>
    </Dialog>
  )
}

export default PromotionCourseDialogContainer
