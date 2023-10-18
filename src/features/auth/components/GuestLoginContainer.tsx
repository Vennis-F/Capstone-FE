import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Box, Link, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { toastError } from 'libs/utils/handle-toast'
import { getAccessToken } from 'libs/utils/handle-token'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import { authActions, selectIsLogging } from '../store'

import { GuestLoginForm } from './GuestLoginForm'

// import TitleTypography from 'libs/ui/components/TitleTypography'

export const GuestLoginContainer = () => {
  const dispatch = useAppDispatch()
  const isLogging = useAppSelector(selectIsLogging)
  const navigate = useNavigate()

  useEffect(() => {
    if (getAccessToken()) {
      navigate('/')
    }
  }, [navigate])

  console.log(isLogging)
  return (
    <>
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
          <LockOpenIcon sx={{ color: '#146C94' }} fontSize="large" />
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
                callbackSuccess: () => {
                  navigate('/my-learning')
                },
              }),
            )
            // createCharacter(data)
            // reset()
            // handleClose()
          }}
          isLogging={isLogging}
        />

        {/* <Button
          onClick={() => {
            dispatch(authActions.logout())
          }}
        >
          Logout
        </Button> */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Link sx={{ color: '#5eadf3', fontSize: '14px', cursor: 'pointer' }}>Quên mật khẩu?</Link>
          <Link sx={{ color: '#5eadf3', fontSize: '14px', cursor: 'pointer' }}>
            Chưa có tài khoản? Đăng ký
          </Link>
        </Box>
      </Container>
    </>
  )
}
