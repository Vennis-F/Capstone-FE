import AccessibilityIcon from '@mui/icons-material/Accessibility'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BarChartIcon from '@mui/icons-material/BarChart'
import BrushIcon from '@mui/icons-material/Brush'
import CastForEducationIcon from '@mui/icons-material/CastForEducation'
import CategoryIcon from '@mui/icons-material/Category'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import MenuIcon from '@mui/icons-material/Menu'
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
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import Footer from 'components/Footer/Footer'
import useAuthService from 'features/auth/hook/useAuthService'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getUserRole } from 'libs/utils/handle-token'
import { UserRole } from 'types'

import { Drawer, DrawerHeader } from './DrawerCustom'

interface Route {
  path: string
  icon: JSX.Element
  title: string
}

const routesInstructor = [
  { path: '/instructor/dashboard', icon: <BarChartIcon />, title: 'Thống kê' },
  { path: '/instructor/homepage', icon: <VideoSettingsIcon />, title: 'Khóa học' },
  { path: '/instructor/transaction', icon: <AccountBalanceIcon />, title: 'Danh sách thanh toán' },
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
  { path: '/admin/manage/staff', icon: <ManageAccountsIcon />, title: 'Người quản lý' },
  { path: '/admin/manage/instructor', icon: <CastForEducationIcon />, title: 'Giảng viên' },
  { path: '/admin/manage/customer', icon: <FamilyRestroomIcon />, title: 'Khách hàng' },
]

const StaffLayout = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { guestLogout } = useAuthService()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null)
  const [currentRoutes, setCurrentRoutes] = useState<Route[]>([])
  const [currPathName, setCurrentPathName] = useState('')

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
      <AppBar>
        <Toolbar>
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
          <Typography>{currentRole}</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {currentRole &&
            currentRoutes.length > 0 &&
            currentRoutes.map(({ icon, path, title }, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: 'block',
                  padding: '0 !important',
                  borderLeft: currPathName === path ? '4px solid #ef4444' : undefined,
                }}
              >
                <ListItemButton
                  onClick={() => navigate(path)}
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
                      color: 'white',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={title} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
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
                  color: 'white',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Thoát'} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <main>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F0F2F5' }}
        >
          <main>
            <Box
              sx={{
                pt: '114px',
                // pb: '50px',
              }}
            >
              <Outlet />
            </Box>
          </main>
          {location.pathname !== `/instructor/course/create` && <Footer />}
        </Box>
      </main>
    </>
  )
}

export default StaffLayout
