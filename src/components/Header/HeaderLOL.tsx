import PaletteIcon from '@mui/icons-material/Palette'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Badge, Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import useAuthService from 'features/auth/hook/useAuthService'
import { useCartService } from 'features/cart/hooks'
import ButtonLinkHeader from 'libs/ui/components/ButtonLinkHeader'
import { getAccessToken } from 'libs/utils/handle-token'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

type HeaderLOLProps = {
  currentThemeMode: 'light' | 'dark'
  onChangeThemeClick: () => void
  onChangeLanguage: (lang: string) => void
}

const HeaderLOL = (props: HeaderLOLProps) => {
  const { t } = useTranslation()
  const { cart, fetchCart } = useCartService()
  const [searchText, setSearchText] = useState<string>('')
  const { isLoggedIn } = useAuthService()
  const navigate = useNavigate()
  console.log('[cart]', cart, props)

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) fetchCart()
  }, [fetchCart, isLoggedIn])

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          backgroundColor: '#146C94',
        }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Button variant="text" onClick={() => navigate('/')}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                color: '#B0DAFF',
              }}
            >
              <PaletteIcon /> {'DRAWING PLATFORM'}
            </Typography>
          </Button>
          <Search>
            <StyledInputBase
              placeholder="Tìm kiếm khóa học"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={e => {
                setSearchText(e.target.value)
              }}
            />
            <Button
              variant="text"
              sx={{ padding: '0 !important', width: '24px !important', color: 'white' }}
              onClick={() => {
                navigate('/list-course', { state: { searchText } })
              }}
            >
              <SearchIcon />
            </Button>
          </Search>
          <nav>
            <Button sx={{ color: 'white', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
              <Badge color="secondary" badgeContent={cart ? cart.cartItems.length : 0} max={999}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Button>
            {/* {getAccessToken() && <Button onClick={() => {}}>LOGOUT</Button>} */}
            {/* <ButtonLinkHeader to="/cart" title={t('Cart')} /> */}
            {/* <ButtonLinkHeader to="/list-course" title={t('ListCoursePage')} /> */}
            <ButtonLinkHeader to="/guest-login" title={t('Đăng nhập')} />
            {/* <ButtonLinkHeader to="/" title={t('Đăng ký')} /> */}
            <ButtonLinkHeader to="/order-list" title={t('Danh sách đơn hàng')} />
            <ButtonLinkHeader to="/my-learning" title={t('Danh sách khóa học của tôi')} />

            {/* <ButtonDropdownHeader title="Tin tức" handlerClick={handleClick} />
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
            </Menu> */}
            {/* <ButtonGroup variant="text" color="inherit">
              <Button onClick={() => onChangeLanguage('en')}>🇺🇸</Button>
              <Button onClick={() => onChangeLanguage('pl')}>🇵🇱</Button>
            </ButtonGroup> */}
            {/* <IconButton sx={{ ml: 1 }} onClick={onChangeThemeClick} color="inherit">
              {currentThemeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton> */}
          </nav>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default HeaderLOL
