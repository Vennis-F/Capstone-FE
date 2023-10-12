import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Box, Link, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { authActions, selectIsLogging } from '../store'

import { GuestLoginForm } from './GuestLoginForm'

// import TitleTypography from 'libs/ui/components/TitleTypography'

export const GuestLoginContainer = () => {
  const dispatch = useAppDispatch()
  const isLogging = useAppSelector(selectIsLogging)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/cart')
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
                  toast.error(message, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                  })
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
