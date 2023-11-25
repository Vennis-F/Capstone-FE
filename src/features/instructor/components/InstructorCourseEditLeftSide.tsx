import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { checkCourseCreateValid } from 'features/courses/api'
import { CourseFullInfor, CourseStatus } from 'features/courses/types'
import CustomButton from 'libs/ui/components/CustomButton'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'
import { TypeInstructorEditCourseParams } from 'types/params.enum'

interface Props {
  currentType: TypeInstructorEditCourseParams
  course: CourseFullInfor
}

const InstructorCourseEditLeftSide = ({ currentType, course }: Props) => {
  const [type, setType] = useState<TypeInstructorEditCourseParams>(currentType)
  const { courseId } = useParams()
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setType(value as TypeInstructorEditCourseParams)
    navigate(`/course/edit/${courseId}/manage/${value}`)
  }

  const handleSendToVerify = async () => {
    try {
      const { msgErrors } = await checkCourseCreateValid(course.id)

      if (msgErrors.length === 0) {
        toastSuccess({ message: 'Đã gửi đi để Admin xem xét thành công' })
      } else {
        const renderMsgErrors = (
          <>
            {msgErrors.map(error => (
              <Typography key={error}>- {error}</Typography>
            ))}
          </>
        )
        toastError({ message: renderMsgErrors, postion: 'top-center' })
      }
      console.log(msgErrors)
    } catch (error) {
      showErrorResponseSaga({ error, defaultMessage: 'Không gửi đi để xem xét được' })
    }
  }

  return (
    <>
      <FormControl sx={{ marginBottom: '15px' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
          Tạo nội dung khóa học
        </Typography>
        <RadioGroup value={type} onChange={handleChange}>
          <FormControlLabel
            value={TypeInstructorEditCourseParams.CURRICULUMN}
            control={<Radio />}
            label="Chương trình giảng dạy"
          />
        </RadioGroup>
        <Typography
          sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black', marginTop: '20px' }}
        >
          Xuât bản khóa học của bạn
        </Typography>
        <RadioGroup value={type} onChange={handleChange}>
          <FormControlLabel
            value={TypeInstructorEditCourseParams.BASICS}
            control={<Radio />}
            label="Trang chủ khóa học"
          />
          <FormControlLabel
            value={TypeInstructorEditCourseParams.THUMBNAIL}
            control={<Radio />}
            label="Ảnh khóa học"
          />
          <FormControlLabel
            value={TypeInstructorEditCourseParams.PRICING}
            control={<Radio />}
            label="Giá khóa học"
          />
          <FormControlLabel
            value={TypeInstructorEditCourseParams.PROMOTION}
            control={<Radio />}
            label="Khuyến mãi"
          />
        </RadioGroup>
      </FormControl>
      {(course.status === CourseStatus.CREATED || course.status === CourseStatus.REJECTED) && (
        <CustomButton onClick={handleSendToVerify}>Gửi đi xem xét</CustomButton>
      )}
    </>
  )
}

export default InstructorCourseEditLeftSide
