import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { TypeInstructorEditCourseParams } from 'types/params.enum'

interface Props {
  currentType: TypeInstructorEditCourseParams
}

const InstructorCourseEditLeftSide = ({ currentType }: Props) => {
  const [type, setType] = useState<TypeInstructorEditCourseParams>(currentType)
  const { courseId } = useParams()
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setType(value as TypeInstructorEditCourseParams)
    navigate(`/course/edit/${courseId}/manage/${value}`)
  }

  return (
    <>
      <FormControl>
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
    </>
  )
}

export default InstructorCourseEditLeftSide
