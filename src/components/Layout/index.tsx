import { CssBaseline, ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import { createTheme } from '@mui/material/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

// import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import HeaderLOL from 'components/Header/HeaderLOL'

const Layout = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const { i18n } = useTranslation()

  // TODO: move state to redux
  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang) // eslint-disable-line @typescript-eslint/no-floating-promises
  }

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <HeaderLOL
            currentThemeMode={theme.palette.mode}
            onChangeThemeClick={colorMode.toggleColorMode}
            onChangeLanguage={onChangeLanguage}
          />
          <main>
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: '50px',
                pb: '50px',
              }}
            >
              <Outlet />
            </Box>
          </main>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Layout
