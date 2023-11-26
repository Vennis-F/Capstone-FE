/* eslint-disable @typescript-eslint/no-unused-vars */
import { CssBaseline, ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import { createTheme } from '@mui/material/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

// import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import HeaderLOL from 'components/Header/HeaderLOL'
import { decodeToken, getAccessToken } from 'libs/utils/handle-token'

const Layout = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: 'Comic Sans MS',
          // fontFamily: 'Comic Neue',
          // Các cài đặt typography khác ở đây nếu bạn muốn thay đổi
        },
      }),
    [mode],
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F0F2F5' }}
        >
          <HeaderLOL />
          <main>
            <Box
              sx={{
                pt: '100px',
                pb: '50px',
              }}
            >
              <Outlet />
            </Box>
          </main>
          {/* {getAccessToken() && decodeToken(getAccessToken() as string) && <Footer />} */}
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Layout
