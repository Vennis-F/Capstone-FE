/* eslint-disable @typescript-eslint/indent */
import { AddOutlined } from '@material-ui/icons'
import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import {
  createPromotion,
  deletePromotion,
  findPromotions,
  updatePromotion,
} from 'features/promotion/api'
import CreatePromotionDialogForm from 'features/promotion/components/CreatePromotionDialogForm'
import PromotionCourseDialogContainer from 'features/promotion/components/PromotionCourseDialogContainer'
import TablePromotions from 'features/promotion/components/TablePromotions'
import UpdatePromotionDialogForm from 'features/promotion/components/UpdatePromotionDialogForm'
import { Promotion } from 'features/promotion/types'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

const InstructorPromotionEdit = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([])

  const [openCreatePromotion, setOpenCreatePromotion] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [currPromotionUpdate, setCurrPromotionUpdate] = useState<Promotion | null>(null)
  const [loadingUpdatePromotion, setLoadingUpdatePromotion] = useState(false)

  const [currPromotionCoursesOfPromotionId, setCurrPromotionCoursesOfPromotionId] = useState<
    string | null
  >(null)

  const handleGetPromotions = async () => {
    const promotionsRes = await findPromotions()
    setPromotions(promotionsRes)
  }

  useEffect(() => {
    handleGetPromotions()
  }, [])

  return (
    <>
      <Container maxWidth="xl" sx={{ marginBottom: '50px' }}>
        <LayoutBodyContainer
          title="Mã giảm giá"
          introduction={
            <>
              <Typography color="black" fontWeight="bold">
                Đặt mã giảm giá cho khóa học của bạn
              </Typography>
              Vui lòng chọn đơn vị tiền tệ và mức giá cho khóa học của bạn. Nếu bạn muốn cung cấp
              miễn phí khóa học của mình thì khóa học đó phải có tổng thời lượng video dưới 2 giờ.
              Ngoài ra, các khóa học có bài kiểm tra thực hành không thể miễn phí.
            </>
          }
        >
          <Box textAlign="right" marginBottom="20px">
            <Button
              variant="outlined"
              sx={{
                color: 'black',
                border: '2px solid black',
                borderRadius: 0,
                ':hover': { border: '2px solid black' },
                marginTop: '30px',
              }}
              onClick={() => setOpenCreatePromotion(true)}
            >
              <AddOutlined /> Mã giảm giá
            </Button>
          </Box>
          <TablePromotions
            promotions={promotions}
            onDeletePromotion={async id => {
              try {
                await deletePromotion(id)
                handleGetPromotions()
                toastSuccess({ message: 'Xóa mã giảm giá thành công' })
              } catch (error) {
                showErrorResponseSaga({ error, defaultMessage: 'Xóa mã giảm giá thất bại' })
              }
            }}
            onUpdatePromotion={promotion => setCurrPromotionUpdate(promotion)}
            onWatchPromotionCourses={id => setCurrPromotionCoursesOfPromotionId(id)}
          />
        </LayoutBodyContainer>
      </Container>

      <CreatePromotionDialogForm
        defaultValues={{
          title: '',
          amount: 0,
          code: '',
          discountPercent: 10,
          effectiveDate: '',
          expiredDate: '',
          note: '',
        }}
        isLoading={isLoading}
        openDialog={openCreatePromotion}
        handleCloseDialog={() => {
          setOpenCreatePromotion(false)
        }}
        onSubmitClick={async (data, reset) => {
          console.log(data)
          setIsLoading(true)
          try {
            await createPromotion({
              amount: data.amount,
              code: data.code,
              discountPercent: data.discountPercent,
              effectiveDate: data.effectiveDate,
              expiredDate: data.expiredDate,
              note: data.note,
              title: data.title,
            })
            reset()
            setOpenCreatePromotion(false)
            handleGetPromotions()
            toastSuccess({ message: 'Tạo mã giảm giá thành công' })
          } catch (error) {
            toastError({
              message: 'Tạo mã giảm giá thất bại',
            })
            console.log(error)
          }
          setIsLoading(false)
        }}
      />

      {currPromotionUpdate && (
        <UpdatePromotionDialogForm
          defaultValues={{
            title: currPromotionUpdate.title,
            amount: currPromotionUpdate.amount,
            code: currPromotionUpdate.code,
            discountPercent: currPromotionUpdate.discountPercent,
            effectiveDate: currPromotionUpdate.effectiveDate,
            expiredDate: currPromotionUpdate.expiredDate,
            note: currPromotionUpdate.note,
          }}
          isLoading={loadingUpdatePromotion}
          openDialog={Boolean(currPromotionUpdate)}
          handleCloseDialog={() => {
            setCurrPromotionUpdate(null)
          }}
          onSubmitClick={async (data, reset) => {
            console.log(data)
            setLoadingUpdatePromotion(true)
            try {
              await updatePromotion(
                {
                  amount: data.amount,
                  code: data.code,
                  discountPercent: data.discountPercent,
                  effectiveDate: data.effectiveDate,
                  expiredDate: data.expiredDate,
                  note: data.note,
                  title: data.title,
                },
                currPromotionUpdate.id,
              )
              reset()
              setCurrPromotionUpdate(null)
              handleGetPromotions()
              toastSuccess({ message: 'Cập nhật mã giảm giá thành công' })
            } catch (error) {
              toastError({
                message: 'Cập nhật mã giảm giá thất bại',
              })
              console.log(error)
            }
            setLoadingUpdatePromotion(false)
          }}
        />
      )}

      {currPromotionCoursesOfPromotionId && (
        <PromotionCourseDialogContainer
          handleCloseDialog={() => setCurrPromotionCoursesOfPromotionId(null)}
          openDialog={Boolean(currPromotionCoursesOfPromotionId)}
          promotionId={currPromotionCoursesOfPromotionId}
        />
      )}
    </>
  )
}

export default InstructorPromotionEdit
