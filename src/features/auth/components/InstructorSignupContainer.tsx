import { Box, Link, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getAccessToken } from 'libs/utils/handle-token'

import { customerSignUp } from '../api'

import { GuestSignupForm } from './GuestSignupForm'

const InstructorSignupContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (getAccessToken()) {
      navigate('/')
    }
  }, [navigate])

  return (
    <Container maxWidth="xs">
      <Box sx={{ textAlign: 'left', marginBottom: '20px' }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ fontWeight: '600', fontFamily: 'sans-serif', marginBottom: '10px' }}
        >
          Trở thành giảng viên trên nền tảng
        </Typography>
        <Typography sx={{ fontFamily: 'sans-serif', fontSize: '14px' }}>
          Khám phá cộng đồng hỗ trợ bao gồm nhiều giảng viên online. Được phép sử dụng ngay tất cả
          các tài nguyên sáng tạo khóa học.
        </Typography>
      </Box>
      <GuestSignupForm
        onSubmitClick={async data => {
          setIsLoading(true)
          try {
            const response = await customerSignUp({ ...data, role: 'Instructor' })
            toastSuccess({ message: 'Đăng ký thành công' })
            navigate(`/confirm-otp?email=${response.email}&isInstructor=${true}`)
          } catch (error) {
            showErrorResponseSaga({
              error,
              defaultMessage: 'Không đăng ký được, vui lòng kiểm tra lại thông tin',
            })
          }
          setIsLoading(false)
        }}
        isLoading={isLoading}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Link sx={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Quên mật khẩu?</Link> */}
        <Link
          sx={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}
          onClick={() => navigate('/guest-login')}
        >
          Đã có tài khoản? Đăng nhập
        </Link>
      </Box>
    </Container>
  )
}

export default InstructorSignupContainer
