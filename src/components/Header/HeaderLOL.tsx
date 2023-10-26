/* eslint-disable @typescript-eslint/no-unused-vars */
import PaletteIcon from '@mui/icons-material/Palette'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Avatar, Badge, Box, Button, List, ListItem, ListItemButton, Paper } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'material-ui-image'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuthService from 'features/auth/hook/useAuthService'
import { useCartService } from 'features/cart/hooks'
import { getCoursesBySearch } from 'features/courses/api'
import { Course, GetCoursesBySearchRequest, SortFieldCourse } from 'features/courses/types'
import { MainColor } from 'libs/const/color'
import ButtonLinkHeader from 'libs/ui/components/ButtonLinkHeader'
import { getAccessToken } from 'libs/utils/handle-token'
import { OrderType } from 'types'

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
  const { cart, fetchCart } = useCartService()
  const [searchText, setSearchText] = useState<string>('')
  const { isLoggedIn, guestLogout } = useAuthService()
  const navigate = useNavigate()
  const [forceUpdate, setForceUpdate] = useState(false)
  const [coursesSearch, setCoursesSearch] = useState<Course[]>([])
  const [isPaperVisible, setIsPaperVisible] = useState(false)

  const handleForceUpdate = () => {
    setForceUpdate(!forceUpdate)
  }

  const handleTextFieldFocus = () => {
    setIsPaperVisible(true)
  }

  const handleTextFieldBlur = () => {
    setTimeout(() => {
      setIsPaperVisible(false)
    }, 200)
  }

  const getCourse = async () => {
    const bodyRequest: GetCoursesBySearchRequest = {
      categories: [],
      levels: [],
      search: searchText,
      sortField: SortFieldCourse.PUBLISHED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 5,
      },
    }
    const dataResponse = await getCoursesBySearch(bodyRequest)
    setCoursesSearch([...dataResponse.data])
  }

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) fetchCart()
  }, [fetchCart, isLoggedIn])

  useEffect(() => {
    if (searchText === '') setCoursesSearch([])
    else getCourse()
  }, [searchText])

  return (
    <>
      <AppBar
        // position="static"
        position="fixed"
        style={{ zIndex: 1400 }}
        elevation={0}
        sx={{
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          // backgroundColor: MainColor.RED_600,
          backgroundColor: MainColor.RED_500,
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
                color: 'white',
                fontWeight: '600',
              }}
            >
              <PaletteIcon /> {'Vẽ cùng trẻ em'}
            </Typography>
          </Button>

          <Box sx={{ position: 'relative' }}>
            <Search>
              <StyledInputBase
                placeholder="Tìm kiếm khóa học"
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={e => {
                  setSearchText(e.target.value)
                }}
                onFocus={handleTextFieldFocus}
                onBlur={handleTextFieldBlur}
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

            {coursesSearch.length > 0 && isPaperVisible && (
              <Paper
                elevation={4}
                sx={{
                  width: '100%',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '8px',
                }}
              >
                <List disablePadding>
                  {coursesSearch.map(course => (
                    <ListItem disablePadding key={course.id}>
                      <ListItemButton onClick={() => navigate(`/detail-course/${course.id}`)}>
                        <Image
                          src={'https://img-c.udemycdn.com/course/100x100/5152322_9a81_3.jpg'}
                          style={{ height: '40px', width: '40px', padding: 0 }}
                          imageStyle={{ height: '40px', width: '40px' }}
                        />
                        <Box sx={{ marginLeft: '10px' }}>
                          <Typography sx={{ fontWeight: 'bold' }}>{course.title}</Typography>
                          <Typography
                            sx={{ fontSize: '12px', fontWeight: 'bold', color: 'GrayText' }}
                          >
                            Khóa học &nbsp;
                            <Typography sx={{ fontSize: '12px' }} component="span">
                              {course.author}
                            </Typography>
                          </Typography>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          <nav>
            <Button sx={{ color: 'white', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
              <Badge color="secondary" badgeContent={cart ? cart.cartItems.length : 0} max={999}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Button>
            {getAccessToken() && (
              <Button
                onClick={() => {
                  guestLogout()
                  navigate('/guest-login')
                  handleForceUpdate()
                }}
              >
                LOGOUT
              </Button>
            )}
            {/* <ButtonLinkHeader to="/cart" title={t('Cart')} /> */}
            {/* <ButtonLinkHeader to="/list-course" title={t('ListCoursePage')} /> */}
            <ButtonLinkHeader to="/guest-login">Đăng nhập</ButtonLinkHeader>
            <ButtonLinkHeader to="/guest-signup">Đăng ký</ButtonLinkHeader>
            {/* <ButtonLinkHeader to="/" title={t('Đăng ký')} /> */}
            <ButtonLinkHeader to="/order-list">Danh sách đơn hàng</ButtonLinkHeader>
            <ButtonLinkHeader to="/my-learning">Danh sách khóa học của tôi</ButtonLinkHeader>

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
