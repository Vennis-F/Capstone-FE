/* eslint-disable @typescript-eslint/indent */
import { Brush } from '@material-ui/icons'
import PaletteIcon from '@mui/icons-material/Palette'
import PersonIcon from '@mui/icons-material/Person'
import SchoolIcon from '@mui/icons-material/School'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import {
  Badge,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Menu,
  MenuItem,
  Divider,
  Container,
  Grid,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Image from 'material-ui-image'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuthService from 'features/auth/hook/useAuthService'
import { useCartService } from 'features/cart/hooks'
import { getCoursesBySearch } from 'features/courses/api'
import { Course, GetCoursesBySearchRequest, SortFieldCourse } from 'features/courses/types'
import { getImage } from 'features/image/components/apis'
import { MainColor } from 'libs/const/color'
import ButtonDropdownHeader from 'libs/ui/components/ButtonDropdownHeader'
import ButtonLinkContain from 'libs/ui/components/ButtonLinkContain'
import ButtonLinkHeader from 'libs/ui/components/ButtonLinkHeader'
import { toastSuccess } from 'libs/utils/handle-toast'
import { decodeToken, getAccessToken, getUserRoleOrNull } from 'libs/utils/handle-token'
import { OrderType, UserRole } from 'types'

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

const HeaderLOL = () => {
  const { cart, fetchCart } = useCartService()
  const [searchText, setSearchText] = useState<string>('')
  const { isLoggedIn, guestLogout } = useAuthService()
  const navigate = useNavigate()
  const [forceUpdate, setForceUpdate] = useState(false)
  const [coursesSearch, setCoursesSearch] = useState<Course[]>([])
  const [isPaperVisible, setIsPaperVisible] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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

  const handleLogout = () => {
    guestLogout()
    handleClose()
    setTimeout(() => {
      toastSuccess({ message: 'Đăng xuất thành công' })
      navigate('/guest-login')
    }, 2000)
    handleForceUpdate()
  }

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken && decodeToken(accessToken).role === 'Customer') fetchCart()
  }, [fetchCart, isLoggedIn])

  useEffect(() => {
    if (searchText === '') setCoursesSearch([])
    else getCourse()
  }, [searchText])

  const currUserRole = getUserRoleOrNull()

  return (
    <>
      <AppBar
        position="fixed"
        style={{ zIndex: 1400 }}
        elevation={0}
        sx={{
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          backgroundColor: MainColor.RED_500,
          paddingY: '3px',
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Button
                variant="text"
                onClick={() => {
                  if (currUserRole && currUserRole === UserRole.LEARNER) navigate('/my-learning')
                  else navigate('/')
                }}
              >
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
            </Grid>
            <Grid item xs={4} width="100%" position="relative">
              {(!getAccessToken() || (currUserRole && currUserRole !== UserRole.LEARNER)) && (
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
                    autoComplete="false"
                  />
                  <Button
                    variant="text"
                    sx={{ padding: '0 !important', width: '24px !important', color: 'white' }}
                    onClick={() => {
                      navigate('/list-course', { state: { searchText } })
                    }}
                  >
                    <SearchIcon sx={{ marginLeft: 'auto' }} />
                  </Button>
                </Search>
              )}

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
                            src={getImage(course.thumbnailUrl)}
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
            </Grid>
            <Grid item xs={5} display="flex" alignItems="center" justifyContent="flex-end">
              {currUserRole && currUserRole === UserRole.CUSTOMER && (
                <Button
                  sx={{ color: 'white', cursor: 'pointer' }}
                  onClick={() => navigate('/cart')}
                >
                  <Badge
                    color="secondary"
                    badgeContent={cart ? cart.cartItems.length : 0}
                    max={999}
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </Button>
              )}
              {currUserRole && currUserRole === UserRole.CUSTOMER && (
                <ButtonLinkHeader to="/my-learning">
                  <SchoolIcon />
                </ButtonLinkHeader>
              )}
              {!currUserRole && (
                <ButtonLinkContain to="/instructor/signup">Đăng ký giảng viên</ButtonLinkContain>
              )}
              <ButtonLinkHeader to="/blog">Blog</ButtonLinkHeader>
              <ButtonLinkHeader to="/contest">
                <Brush />
              </ButtonLinkHeader>
              {!currUserRole && <ButtonLinkHeader to="/guest-login">Đăng nhập</ButtonLinkHeader>}
              {!currUserRole && <ButtonLinkHeader to="/guest-signup">Đăng ký</ButtonLinkHeader>}
              {currUserRole && (
                <>
                  <ButtonDropdownHeader handlerClick={handleClick}>
                    <PersonIcon sx={{ marginBottom: '0', fontSize: '30px !important' }} />
                  </ButtonDropdownHeader>
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
                        // backgroundColor: '#292929',
                        // color: '#A0A0A0',
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
                    {currUserRole && currUserRole === UserRole.CUSTOMER && (
                      <MenuItem
                        sx={{ ':hover': { color: '#047C8F' } }}
                        onClick={() => {
                          navigate('/user/edit-profile')
                          handleClose()
                        }}
                      >
                        Cài đặt tài khoản
                      </MenuItem>
                    )}
                    {currUserRole && currUserRole === UserRole.CUSTOMER && (
                      <MenuItem
                        sx={{ ':hover': { color: '#047C8F' } }}
                        onClick={() => {
                          navigate('/cart')
                          handleClose()
                        }}
                      >
                        Giỏ hàng của tôi
                      </MenuItem>
                    )}
                    {/* {currUserRole && currUserRole === UserRole.CUSTOMER && (
                      <MenuItem sx={{ ':hover': { color: '#047C8F' } }} onClick={handleClose}>
                        Phương thức thanh toán
                      </MenuItem>
                    )} */}
                    {currUserRole && currUserRole === UserRole.CUSTOMER && (
                      <MenuItem
                        sx={{ ':hover': { color: '#047C8F' } }}
                        onClick={() => {
                          navigate('/user/order-list')
                          handleClose()
                        }}
                      >
                        Lịch sử mua hàng
                      </MenuItem>
                    )}
                    {currUserRole && currUserRole === UserRole.CUSTOMER && (
                      <MenuItem
                        sx={{ ':hover': { color: '#047C8F' } }}
                        onClick={() => {
                          navigate('/user/refunds')
                          handleClose()
                        }}
                      >
                        Lịch sử hoàn tiền
                      </MenuItem>
                    )}
                    {currUserRole &&
                      (currUserRole === UserRole.CUSTOMER || currUserRole === UserRole.LEARNER) && (
                        <MenuItem
                          sx={{ ':hover': { color: '#047C8F' } }}
                          onClick={() => {
                            navigate('/user/achivements')
                            handleClose()
                          }}
                        >
                          Thành tựu
                        </MenuItem>
                      )}
                    {currUserRole && currUserRole === UserRole.CUSTOMER && <Divider />}
                    <MenuItem sx={{ ':hover': { color: '#047C8F' } }} onClick={handleLogout}>
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </>
  )
}

export default HeaderLOL
