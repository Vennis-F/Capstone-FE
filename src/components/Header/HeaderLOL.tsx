import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Button, ButtonGroup, IconButton, Menu, MenuItem } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ButtonDropdownHeader from 'libs/ui/components/ButtonDropdownHeader'
import ButtonLinkHeader from 'libs/ui/components/ButtonLinkHeader'

type HeaderLOLProps = {
  currentThemeMode: 'light' | 'dark'
  onChangeThemeClick: () => void
  onChangeLanguage: (lang: string) => void
}

const HeaderLOL = (props: HeaderLOLProps) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { currentThemeMode, onChangeThemeClick, onChangeLanguage } = props

  return (
    <>
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          backgroundColor: '#111111',
        }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {'RIOT GAMES'}
          </Typography>
          <nav>
            <ButtonLinkHeader to="/" title={t('navigation.links.home')} />
            <ButtonLinkHeader to="/about" title={t('navigation.links.about')} />
            <ButtonLinkHeader to="/characters" title={t('navigation.links.characters')} />

            <ButtonDropdownHeader title="Tin tức" handlerClick={handleClick} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{
                '.MuiMenu-paper': {
                  borderTop: '3px solid #047C8F',
                  backgroundColor: '#292929',
                  color: '#A0A0A0',
                  paddingX: 2,
                },
              }}
              anchorOrigin={{
                vertical: 60,
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem
                sx={{ ':hover': { backgroundColor: '#464545', borderRadius: 2, color: 'white' } }}
                onClick={handleClose}
              >
                Tất cả
              </MenuItem>
              <MenuItem onClick={handleClose}>Cập nhật trò chơi</MenuItem>
              <MenuItem onClick={handleClose}>Esport</MenuItem>
            </Menu>
            <ButtonGroup variant="text" color="inherit">
              <Button onClick={() => onChangeLanguage('en')}>🇺🇸</Button>
              <Button onClick={() => onChangeLanguage('pl')}>🇵🇱</Button>
            </ButtonGroup>
            <IconButton sx={{ ml: 1 }} onClick={onChangeThemeClick} color="inherit">
              {currentThemeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </nav>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default HeaderLOL
