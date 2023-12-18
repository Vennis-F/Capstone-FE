/* eslint-disable @typescript-eslint/no-unused-vars */
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

const InstructorSignupContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (getAccessToken()) {
      navigate('/')
    }
  }, [navigate])

  return (
    <Container maxWidth="lg">
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
              Đăng ký giáo viên
            </Typography>
            <Box sx={{ paddingX: '100px', border: 0 }}>
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
              src={
                'https://www.vietnamworks.com//hrinsider//wp-content/uploads/2021/06/shutterstock_434383288-1.jpg'
              }
              style={{ height: '100%', width: '100%', padding: 0 }}
              imageStyle={{ height: '100%', width: '100%', borderRadius: 3 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default InstructorSignupContainer
