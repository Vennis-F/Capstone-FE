/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PaymentIcon from '@mui/icons-material/Payment'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Divider,
  Collapse,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuthService from 'features/auth/hook/useAuthService'
import { MainColor } from 'libs/const/color'
import { StyleSxProps } from 'types'
import { TypeCustomerProfilePageParams } from 'types/params.enum'

const style: StyleSxProps = {
  buttonHover: {
    borderLeft: `4px solid white`,
    '&:hover': {
      borderLeft: `4px solid ${MainColor.YELLOW_500}`,
    },
  },
} as const

// type Props = {}

const CustomerListItemChoice = () => {
  const [open, setOpen] = useState(true)
  const { guestLogout } = useAuthService()
  const navigate = useNavigate()

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton
          sx={style.buttonHover}
          onClick={() => navigate(`/user/${TypeCustomerProfilePageParams.EditProfile}`)}
        >
          <ListItemIcon>
            <HomeOutlinedIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Hồ sơ" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          sx={style.buttonHover}
          onClick={() => navigate(`/user/${TypeCustomerProfilePageParams.EditSecure}`)}
        >
          <ListItemIcon>
            <KeyOutlinedIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Bảo mật tài khoản" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton sx={style.buttonHover}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Ảnh đại diện" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          sx={style.buttonHover}
          onClick={() => navigate(`/user/${TypeCustomerProfilePageParams.AllCourse}`)}
        >
          <ListItemIcon>
            <MenuIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Khóa học đã sở hữu" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          sx={style.buttonHover}
          onClick={() => navigate(`/user/${TypeCustomerProfilePageParams.EditLearner}`)}
        >
          <ListItemIcon>
            <ChildCareIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Quản lý tài khoản trẻ em" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={style.buttonHover}>
          <ListItemIcon>
            <PaymentIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Phương thức thanh toán" />
        </ListItemButton>
      </ListItem>
      <Divider />
      {/* <ListItem disablePadding>
        <ListItemButton onClick={handleClick} sx={style.buttonHover}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Cài đặt" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Divider /> */}
      {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Chung" />
          </ListItemButton>
          <Divider />
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Ảnh đại diện" />
          </ListItemButton>
          <Divider />
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <KeyOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Mật khẩu" />
          </ListItemButton>
          <Divider />
        </List>
      </Collapse> */}
      <ListItem disablePadding>
        <ListItemButton
          sx={style.buttonHover}
          onClick={() => {
            guestLogout()
            navigate('/guest-login')
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Thoát" />
        </ListItemButton>
      </ListItem>
      <Divider />
    </List>
  )
}

export default CustomerListItemChoice
