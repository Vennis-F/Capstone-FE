import { Typography } from '@mui/material'
import React, { useState } from 'react'

import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { updatePriceCourseByInstructor } from '../api'

import EditLayoutInstructor from './EditLayoutInstructor'
import EditPricingCourseForm from './EditPricingCourseForm'

type Props = { courseId: string; price?: number | null; isEditable: boolean }

const InstructorPricingEdit = ({ courseId, price, isEditable }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <EditLayoutInstructor
      title="Định giá"
      introduction={
        <>
          <Typography color="black" fontWeight="bold">
            Đặt giá cho khóa học của bạn
          </Typography>
          Vui lòng chọn đơn vị tiền tệ và mức giá cho khóa học của bạn. Nếu bạn muốn cung cấp miễn
          phí khóa học của mình thì khóa học đó phải có tổng thời lượng video dưới 2 giờ. Ngoài ra,
          các khóa học có bài kiểm tra thực hành không thể miễn phí.
        </>
      }
    >
      {price !== undefined && (
        <EditPricingCourseForm
          isEditable={isEditable}
          defaultValues={{
            price: price ?? 0,
          }}
          onSubmitClick={async (data, reset) => {
            setIsLoading(true)
            try {
              await updatePriceCourseByInstructor({ courseId, price: data.price })
              toastSuccess({ message: 'Cập nhật giá tiền thành công' })
              reset({ price: data.price })
            } catch (error) {
              showErrorResponseSaga({ defaultMessage: 'Không thể cập nhật giá tiền', error })
            }
            setIsLoading(false)
          }}
          isLoading={isLoading}
        />
      )}
    </EditLayoutInstructor>
  )
}

export default InstructorPricingEdit
