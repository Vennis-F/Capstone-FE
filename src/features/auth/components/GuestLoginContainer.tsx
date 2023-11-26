import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Box, Link, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { MainColor } from 'libs/const/color'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'
import { decodeToken, getAccessToken } from 'libs/utils/handle-token'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { UserRole } from 'types'

import { authActions, selectIsLogging } from '../store'

import { GuestLoginForm } from './GuestLoginForm'

// import TitleTypography from 'libs/ui/components/TitleTypography'

export const GuestLoginContainer = () => {
  const dispatch = useAppDispatch()
  const isLogging = useAppSelector(selectIsLogging)
  const navigate = useNavigate()

  const handleNavigateAfterLogin = (role: UserRole) => {
    switch (role) {
      case UserRole.CUSTOMER:
        navigate('/')
        break
      case UserRole.LEARNER:
        navigate('/my-learning')
        break
      case UserRole.INSTRUCTOR:
        navigate('/instructor/homepage')
        break
      case UserRole.STAFF:
        navigate('/staff/manage/posts')
        break
      case UserRole.ADMIN:
        navigate('/admin/manage/dashboard')
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (getAccessToken()) {
      const decode = decodeToken(getAccessToken() as string)
      handleNavigateAfterLogin(decode.role as UserRole)
    }
  }, [navigate])

  return (
    <>
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
          <LockOpenIcon sx={{ color: MainColor.YELLOW_500 }} fontSize="large" />
          <Typography variant="h5" sx={{ fontWeight: '600' }}>
            Đăng nhập
          </Typography>
        </Box>
        <GuestLoginForm
          onSubmitClick={data => {
            // console.log('[data form] ', data)
            dispatch(
              authActions.login({
                guessLoginFormInput: data,
                callbackFail: (message: string) => {
                  toastError({ message })
                },
                callbackSuccess: (role: UserRole) => {
                  toastSuccess({ message: 'Đăng nhập thành công' })
                  handleNavigateAfterLogin(role)
                },
              }),
            )
          }}
          isLogging={isLogging}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {/* <Link sx={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Quên mật khẩu?</Link> */}
          <Link sx={{ color: 'black', fontSize: '14px', cursor: 'pointer' }} onClick={()=>navigate("/guest-signup")}>
            Chưa có tài khoản? Đăng ký
          </Link>
        </Box>
      </Container>
    </>
  )
}
