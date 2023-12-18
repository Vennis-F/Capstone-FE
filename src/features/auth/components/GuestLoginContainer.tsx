import { Box, Grid, Link, Paper, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Image from 'material-ui-image'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { requestPermission, saveDevice } from 'features/notification/api'
import { patternDetailPath } from 'libs/utils/handle-regex'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'
import { decodeToken, getAccessToken } from 'libs/utils/handle-token'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { RootState } from 'store/store'
import { UserRole } from 'types'

import { authActions, selectIsLogging } from '../store'

import { GuestLoginForm } from './GuestLoginForm'

export const GuestLoginContainer = () => {
  const dispatch = useAppDispatch()
  const isLogging = useAppSelector(selectIsLogging)
  const navigate = useNavigate()
  const routerState = useSelector((state: RootState) => state.router.previousLocations)

  const handleNavigateAfterLogin = (role: UserRole) => {
    if (role === UserRole.CUSTOMER) {
      if (routerState) {
        const previousLocationPath = routerState[routerState.length - 1].location?.pathname

        if (previousLocationPath && patternDetailPath.test(previousLocationPath))
          return navigate(previousLocationPath)
        return navigate('/')
      }

      return navigate('/')
    }

    switch (role) {
      case UserRole.LEARNER:
        navigate('/my-learning')
        break
      case UserRole.INSTRUCTOR:
        navigate('/instructor/dashboard')
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
    return null
  }

  const handleSaveDeviceToken = async () => {
    const token = await requestPermission()

    if (!token) return

    try {
      console.log('helo ae hehe', token)
      await saveDevice({ deviceTokenId: token })
    } catch (error) {
      console.log(error)
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
      <Container maxWidth="lg">
        <Paper elevation={5}>
          <Grid container sx={{ height: '65vh' }}>
            <Grid item xs={8}>
              <Image
                src={`https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                style={{ height: '100%', width: '100%', padding: 0 }}
                imageStyle={{ height: '100%', width: '100%' }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ textAlign: 'center', marginBottom: '30px' }}>
                  <Typography variant="h5" sx={{ fontWeight: '600', fontSize: '25px' }}>
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
                          handleSaveDeviceToken()
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
                  <Link
                    sx={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}
                    onClick={() => navigate('/guest-signup')}
                  >
                    Chưa có tài khoản? Đăng ký
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
