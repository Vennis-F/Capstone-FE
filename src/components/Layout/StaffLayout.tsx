import AccessibilityIcon from '@mui/icons-material/Accessibility'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import BarChartIcon from '@mui/icons-material/BarChart'
import BrushIcon from '@mui/icons-material/Brush'
import CastForEducationIcon from '@mui/icons-material/CastForEducation'
import CategoryIcon from '@mui/icons-material/Category'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import DiscountIcon from '@mui/icons-material/Discount'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import MenuIcon from '@mui/icons-material/Menu'
// import NotificationsIcon from '@mui/icons-material/Notifications'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
// import PaidIcon from '@mui/icons-material/Paid'
import ReportIcon from '@mui/icons-material/Report'
import VideoSettingsIcon from '@mui/icons-material/VideoSettings'
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

// import Footer from 'components/Footer/Footer'
import useAuthService from 'features/auth/hook/useAuthService'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getUserInforOrNull, getUserRole } from 'libs/utils/handle-token'
import { UserRole, userRoleInfor } from 'types'

import { Drawer, DrawerHeader } from './DrawerCustom'

interface Route {
  path: string
  icon: JSX.Element
  title: string
}

const routesInstructor = [
  { path: '/instructor/dashboard', icon: <BarChartIcon />, title: 'Thống kê' },
  { path: '/instructor/homepage', icon: <VideoSettingsIcon />, title: 'Khóa học' },
  { path: '/instructor/transaction', icon: <AccountBalanceIcon />, title: 'Thanh toán' },
  { path: '/instructor/promotion', icon: <DiscountIcon />, title: 'Mã giảm giá' },
]

const routesStaff = [
  { path: '/staff/manage/posts', icon: <ImportContactsIcon />, title: 'Bài đăng' },
  { path: '/staff/manage/reports', icon: <ReportIcon />, title: 'Báo cáo' },
  { path: '/staff/manage/courses', icon: <OndemandVideoIcon />, title: 'Khóa học' },
  { path: '/staff/manage/contest', icon: <BrushIcon />, title: 'Cuộc thi' },
]

const routesAdmin = [
  { path: '/admin/manage/dashboard', icon: <BarChartIcon />, title: 'Thống kê' },
  { path: '/admin/manage/categories', icon: <CategoryIcon />, title: 'Thể loại' },
  { path: '/admin/manage/levels', icon: <AccessibilityIcon />, title: 'Cấp độ' },
  // {
  //   path: '/admin/manage/pay-mentor',
  //   icon: <PaidIcon />,
  //   title: 'Tiền giáo viên',
  // },
  // { path: '/admin/manage/promotions', icon: <AttachMoneyIcon />, title: 'Giảm giá' },
  {
    path: '/admin/manage/refund-learner',
    icon: <KeyboardReturnIcon />,
    title: 'Hoàn tiền',
  },
  { path: '/admin/manage/staff', icon: <ManageAccountsIcon />, title: 'Nhân viên' },
  { path: '/admin/manage/instructor', icon: <CastForEducationIcon />, title: 'Giáo viên' },
  { path: '/admin/manage/customer', icon: <FamilyRestroomIcon />, title: 'Khách hàng' },
]

const StaffLayout = () => {
  const navigate = useNavigate()
  const { guestLogout } = useAuthService()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null)
  const [currentRoutes, setCurrentRoutes] = useState<Route[]>([])
  const [currPathName, setCurrentPathName] = useState('')
  const userInfor = getUserInforOrNull()

  useEffect(() => {
    setCurrentPathName(location.pathname)
  }, [location])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const role = getUserRole()
    setCurrentRole(role)
    if (role === UserRole.ADMIN) setCurrentRoutes(routesAdmin)
    if (role === UserRole.STAFF) setCurrentRoutes(routesStaff)
    if (role === UserRole.INSTRUCTOR) setCurrentRoutes(routesInstructor)
  }, [])

  return (
    <>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: '#FFFFFF' }}>
        <Toolbar sx={{ textAlign: 'right', width: '100%', justifyContent: 'flex-end' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction="row" spacing={2} alignItems="center">
            {userInfor && (
              <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>
                <Typography component="span" variant="inherit" color="GrayText">
                  {userRoleInfor(userInfor.role)}
                </Typography>{' '}
                {userInfor.fullName}
              </Typography>
            )}
            <Avatar
              alt="Remy Sharp"
              src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg"
            />
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader sx={{ display: 'flex', justifyContent: 'center' }}>
          <ColorLensIcon fontSize="large" sx={{ color: 'rgb(0, 167, 111)' }} />
        </DrawerHeader>
        <Divider />
        <List sx={{ paddingX: '10px' }}>
          {currentRole &&
            currentRoutes.length > 0 &&
            currentRoutes.map(({ icon, path, title }, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: 'block',
                  padding: '0 !important',
                  backgroundColor: currPathName === path ? ' rgb(216,245,232)' : '#FFFFFF',
                  borderRadius: 2,
                }}
              >
                <ListItemButton
                  onClick={() => navigate(path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    color: 'rgb(99, 115, 129)',
                    marginBottom: '5px',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: currPathName === path ? ' rgb(0, 167, 111)' : 'rgb(99, 115, 129)',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: currPathName === path ? ' rgb(0, 167, 111)' : 'rgb(99, 115, 129)',
                      fontWeight: '600',
                      '& .MuiListItemText-primary': { fontWeight: 'bold' },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          <ListItem
            key={'logout'}
            disablePadding
            sx={{ display: 'block', padding: '0 !important', borderLeft: '2px solid transparent' }}
          >
            <ListItemButton
              onClick={async () => {
                guestLogout()
                setTimeout(() => {
                  toastSuccess({ message: 'Đăng xuất thành công' })
                  navigate('/guest-login')
                }, 2000)
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'rgb(99, 115, 129)',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Đăng xuất'}
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'rgb(99, 115, 129)',
                  fontWeight: '600',
                  '& .MuiListItemText-primary': { fontWeight: 'bold' },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <main>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f0fdf4' }}
        >
          <main>
            <Box
              sx={{
                pt: '114px',
              }}
            >
              <Outlet />
            </Box>
          </main>
        </Box>
      </main>
    </>
  )
}

export default StaffLayout
