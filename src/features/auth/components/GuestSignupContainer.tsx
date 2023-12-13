/* eslint-disable @typescript-eslint/no-unused-vars */
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Box, Grid, Link, Paper, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Image from 'material-ui-image'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MainColor } from 'libs/const/color'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getAccessToken } from 'libs/utils/handle-token'

import { customerSignUp } from '../api'

import { GuestSignupForm } from './GuestSignupForm'

export const GuestSignupContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (getAccessToken()) {
      navigate('/')
    }
  }, [navigate])

  return (
    <Container maxWidth="lg">
      {/* <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
        <LockOpenIcon sx={{ color: MainColor.YELLOW_500 }} fontSize="large" />
        <Typography variant="h5" sx={{ fontWeight: '600' }}>
          Đăng ký
        </Typography>
      </Box>
      <GuestSignupForm
        onSubmitClick={async data => {
          setIsLoading(true)
          try {
            const response = await customerSignUp({ ...data, role: 'Customer' })
            toastSuccess({ message: 'Đăng ký thành công' })
            navigate(`/confirm-otp?email=${response.email}`)
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
       
        <Link
          sx={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}
          onClick={() => navigate('/guest-login')}
        >
          Đã có tài khoản? Đăng nhập
        </Link>
      </Box> */}
      <Paper elevation={3} sx={{ textAlign: 'center' }}>
        <Grid container spacing={0}>
          <Grid item xs={6} sx={{}}>
            <Typography
              sx={{
                fontWeight: 'bold',
                marginBottom: '20px',
                marginTop: '20px',
                fontSize: '25px',
                color: MainColor.RED_450,
              }}
            >
              Đăng ký
            </Typography>
            <Box sx={{ paddingX: '100px', border: 0 }}>
              <GuestSignupForm
                onSubmitClick={async data => {
                  setIsLoading(true)
                  try {
                    const response = await customerSignUp({ ...data, role: 'Customer' })
                    toastSuccess({ message: 'Đăng ký thành công' })
                    navigate(`/confirm-otp?email=${response.email}`)
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
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Link
                sx={{
                  color: 'black',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginBottom: '20px',
                  textDecoration: 'none',
                }}
                onClick={() => navigate('/guest-login')}
              >
                Đã có tài khoản?
                <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Đăng nhập</span>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Image
              src={'https://cara.edu.vn/wp-content/uploads/2021/03/o1.jpg'}
              style={{ height: '100%', width: '100%', padding: 0 }}
              imageStyle={{ height: '100%', width: '100%', borderRadius: 3 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
