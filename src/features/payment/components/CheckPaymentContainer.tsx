import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Container, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useCartService } from 'features/cart/hooks'
import { updateOrder } from 'features/orders/api'
import { NameOrderStatus } from 'features/orders/types'
import { createTrasaction } from 'features/transaction/api'
import { CreateTransactionBody, TransactionStatus } from 'features/transaction/types'
import CustomButton from 'libs/ui/components/CustomButton'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastWarn } from 'libs/utils/handle-toast'

import EqualTitle from './EqualTitle'

const CheckPaymentContainer = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { deleteAllCartItems } = useCartService()
  const vnpAmount = searchParams.get('vnp_Amount')
  const vnpBankCode = searchParams.get('vnp_BankCode')
  const vnpBankTranNo = searchParams.get('vnp_BankTranNo')
  const vnpCardType = searchParams.get('vnp_CardType')
  const vnpResponseCode = searchParams.get('vnp_ResponseCode')
  const vnpTransactionNo = searchParams.get('vnp_TransactionNo')
  const vnpTxnRef = searchParams.get('vnp_TxnRef')

  const checkPayment = async () => {
    const isValidToCheckPayment =
      vnpTxnRef && vnpAmount && vnpBankCode && vnpCardType && vnpResponseCode

    if (!isValidToCheckPayment) {
      navigate('/')
      toastWarn({
        message: 'Bạn chưa thanh toán, vui lòng mua các khóa học cho bé tại trang chủ!',
      })
      return
    }

    // Create a new transaction
    let orderStatusName = NameOrderStatus.Fail
    const paymentAmount = Number(vnpAmount) / 100
    const transactionBody: CreateTransactionBody = {
      orderId: vnpTxnRef,
      paymentAmount,
      bankCode: vnpBankCode,
      bankTranNo: vnpBankTranNo,
      cardType: vnpCardType,
      responseCode: vnpResponseCode,
    }

    try {
      const response = await createTrasaction(transactionBody)

      if (response.status !== TransactionStatus.Success) {
        navigate('/cart')
        toastError({
          message: 'Thanh toán thất bại, vui lòng kiểm tra lại giỏ hàng và thanh toán lại',
        })
      } else {
        deleteAllCartItems()
        orderStatusName = NameOrderStatus.Success
      }
    } catch (error) {
      console.log('error', error)
      navigate('/cart')
      showErrorResponseSaga({
        error,
        defaultMessage: 'Thanh toán thất bại, vui lòng kiểm tra lại giỏ hàng và thanh toán lai',
      })
    }

    // Update order status
    await updateOrder({
      orderId: vnpTxnRef,
      nameOrderStatus: orderStatusName,
    })
  }

  useEffect(() => {
    checkPayment()
  }, [])

  return (
    <Container maxWidth="sm">
      <Paper elevation={10} sx={{ padding: '30px' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            fontSize: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#3BAB75',
          }}
        >
          Thanh toán thành công!
          <CheckCircleOutlineIcon
            sx={{ fontSize: '100px !important', color: '#3BAB75', marginY: '40px' }}
          />
        </Typography>

        <EqualTitle titleLeft="Thể loại thanh toán" titleRight="VnPay" />
        <EqualTitle titleLeft="Ngân hàng" titleRight={vnpBankCode} />
        <EqualTitle titleLeft="Email" titleRight={'hoanganhgo28062001@gmail.com'} />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '20px' }}>
          <Typography sx={{ width: '40%', color: 'GrayText', fontSize: '18px', fontWeight: '600' }}>
            Số tiền thanh toán
          </Typography>
          <Typography
            sx={{ width: '60%', textAlign: 'right', fontWeight: '600', fontSize: '20px' }}
          >
            {Number(vnpAmount) / 100}
          </Typography>
        </Box>
        <EqualTitle titleLeft="Mã giao dịch" titleRight={vnpTransactionNo} />
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <CustomButton sxCustom={{ width: '200px' }} onClick={() => navigate('/')}>
            TRang chủ
          </CustomButton>
        </Box>
      </Paper>
    </Container>
  )
}

export default CheckPaymentContainer
