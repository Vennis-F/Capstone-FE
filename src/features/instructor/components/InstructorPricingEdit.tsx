import { Typography } from '@mui/material'
import React, { useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { updatePriceCourseByInstructor } from '../api'

import EditPricingCourseForm from './EditPricingCourseForm'

type Props = {
  courseId: string
  price?: number | null
  isEditable: boolean
  handleGetCourse: () => Promise<void>
}

const InstructorPricingEdit = ({ courseId, price, isEditable, handleGetCourse }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LayoutBodyContainer
      title="Định giá"
      isPadding={true}
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
              handleGetCourse()
            } catch (error) {
              showErrorResponseSaga({ defaultMessage: 'Không thể cập nhật giá tiền', error })
            }
            setIsLoading(false)
          }}
          isLoading={isLoading}
        />
      )}
    </LayoutBodyContainer>
  )
}

export default InstructorPricingEdit
