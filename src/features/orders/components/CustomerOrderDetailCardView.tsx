import { Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getImage } from 'features/image/components/apis'
import { checkRefund, createRefundByCustomer } from 'features/refund/apis'
import CreateRefundDialogForm from 'features/refund/components/CreateRefundDialogForm'
import { TransactionStatus } from 'features/transaction/types'
import CustomButton from 'libs/ui/components/CustomButton'
import { formatCurrency } from 'libs/utils/handle-price'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { NameOrderStatus, Order, OrderDetail } from '../types'

type Props = {
  orderDetail: OrderDetail
  handleGetOrder: () => Promise<void>
  order: Order
}

const CustomerOrderDetailCardView = ({ orderDetail, order, handleGetOrder }: Props) => {
  const navigate = useNavigate()
  const [openForm, setOpenForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showButtonRefund, setShowButtonRefund] = useState(false)

  const canRefund =
    order.orderStatus === NameOrderStatus.Success &&
    order.transaction.status === TransactionStatus.Success &&
    !orderDetail.refund

  const handleCheckCanRefund = async () => {
    // setShowButtonRefund()
    try {
      setShowButtonRefund(await checkRefund(orderDetail.id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleCheckCanRefund()
  }, [])

  return (
    <Grid
      container
      alignItems="center"
      key={orderDetail.id}
      sx={{ marginTop: '15px', cursor: 'pointer' }}
    >
      <Grid item md={1} onClick={() => navigate(`/detail-course/${orderDetail.course.id}`)}>
        <Image
          src={getImage(orderDetail.course.thumbnailUrl)}
          style={{ height: '80px', width: '130px', padding: 0 }}
          imageStyle={{ height: '80px', width: '130px' }}
        />
      </Grid>
      <Grid
        item
        md={7}
        padding={0}
        onClick={() => navigate(`/detail-course/${orderDetail.course.id}`)}
      >
        <Typography
          variant="caption"
          sx={{ fontWeight: 'bold', fontSize: '18px', marginLeft: '80px' }}
        >
          {orderDetail.course.title}
        </Typography>
      </Grid>
      <Grid item md={2} sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 'bold', fontSize: '16px', marginLeft: '10px' }}
        >
          ₫{formatCurrency(orderDetail.priceAfterPromotion)}
        </Typography>
        {orderDetail.promotionCourse && (
          <Typography
            variant="caption"
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              marginLeft: '10px',
              textDecoration: 'line-through',
            }}
          >
            ₫{formatCurrency(orderDetail.price)}
          </Typography>
        )}
      </Grid>
      <Grid
        item
        md={2}
        sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', paddingLeft: '20px' }}
      >
        {canRefund && showButtonRefund && (
          <CustomButton
            onClick={() => {
              setOpenForm(true)
            }}
          >
            Hoàn tiền
          </CustomButton>
        )}
      </Grid>

      <CreateRefundDialogForm
        isLoading={isLoading}
        openDialog={openForm}
        handleCloseDialog={() => {
          setOpenForm(false)
        }}
        defaultValues={{
          accountName: '',
          accountNumber: '',
          bank: '',
          refundReason: '',
        }}
        onSubmitClick={async (data, reset) => {
          setIsLoading(true)
          try {
            await createRefundByCustomer(orderDetail.id, data)

            setOpenForm(false)
            toastSuccess({
              message: 'Đã gửi đơn hoàn tiền thành công, xin vui lòng đợi chấp thuận',
            })
            reset()
            handleGetOrder()
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Không thể hoàn tiền', error })
            console.log(error)
          }
          setIsLoading(false)
        }}
      />
    </Grid>
  )
}

export default CustomerOrderDetailCardView
