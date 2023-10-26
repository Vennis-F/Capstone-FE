import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Box, Link, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { MainColor } from 'libs/const/color'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getAccessToken } from 'libs/utils/handle-token'
import { useAppSelector } from 'store/hooks'

import { customerSignUp } from '../api'
import { selectIsLogging } from '../store'

import { GuestSignupForm } from './GuestSignupForm'

export const GuestSignupContainer = () => {
  const isLogging = useAppSelector(selectIsLogging)
  const navigate = useNavigate()

  useEffect(() => {
    if (getAccessToken()) {
      navigate('/')
    }
  }, [navigate])

  return (
    <>
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
          <LockOpenIcon sx={{ color: MainColor.YELLOW_500 }} fontSize="large" />
          <Typography variant="h5" sx={{ fontWeight: '600' }}>
            Đăng ký
          </Typography>
        </Box>
        <GuestSignupForm
          onSubmitClick={async data => {
            try {
              const response = await customerSignUp(data)
              toastSuccess({ message: 'Đăng ký thành công' })
              navigate(`/confirm-otp?email=${response.email}`)
            } catch (error) {
              showErrorResponseSaga({
                error,
                defaultMessage: 'Không đăng ký được, vui lòng kiểm tra lại thông tin',
              })
            }
          }}
          isLogging={isLogging}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Link sx={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Quên mật khẩu?</Link>
          <Link sx={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>
            Chưa có tài khoản? Đăng ký
          </Link>
        </Box>
      </Container>
    </>
  )
}
