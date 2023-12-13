import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import CustomButton from 'libs/ui/components/CustomButton'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { customerConfirm, resendUserOTP } from '../api'

const ConfirmOTPContainer = () => {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [searchParams] = useSearchParams()
  const currentEmail = searchParams.get('email')
  const isInstructor = searchParams.get('isInstructor')

  const handleConfirmOTP = async () => {
    if (!code || !currentEmail) {
      toastError({ message: 'Mã OTP đang trống, vui lòng nhập mã OTP' })
    } else {
      try {
        await customerConfirm({ email: currentEmail, otp: code })
        toastSuccess({ message: 'Xác nhận OTP thành công' })
        if (isInstructor) navigate(`/instructor/signup/bank?email=${currentEmail}`)
        else navigate('/guest-login')
      } catch (error) {
        showErrorResponseSaga({ error, defaultMessage: 'OTP không hợp lệ' })
      }
    }
  }

  const handleResendOTP = async () => {
    try {
      if (!currentEmail) return toastError({ message: 'Không tìm thấy email' })
      await resendUserOTP(currentEmail)
      toastSuccess({ message: 'Gửi lại mã thành công! Vui lòng kiểm tra hộp thư email' })
    } catch (error) {
      toastError({ message: 'Không thể gửi lại mã OTP' })
    }
    return null
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={10}
        sx={{
          margin: 'auto',
          textAlign: 'center',
          padding: '40px',
          borderRadius: '15px',
          width: '75%',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Kiểm tra email của bạn
        </Typography>
        <Typography variant="caption" component={'div'}>
          Hãy nhập 6 số mà chúng tôi đã gửi qua email của bạn
        </Typography>
        <Box sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%', borderRadius: '15px', marginY: '20px' }}
            size="small"
            onChange={e => setCode(e.target.value)}
          />
        </Box>
        <CustomButton onClick={handleConfirmOTP}>Xác nhận</CustomButton>
        <Box>
          <Button onClick={handleResendOTP} sx={{ textTransform: 'capitalize', marginTop: '10px' }}>
            Gửi lại mã
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default ConfirmOTPContainer
