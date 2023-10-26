import { ExpandLess, ExpandMore } from '@material-ui/icons'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
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

import { MainColor } from 'libs/const/color'
import { StyleSxProps } from 'types'

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

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton sx={style.buttonHover}>
          <ListItemIcon>
            <MenuIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Khóa học của tôi" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton sx={style.buttonHover}>
          <ListItemIcon>
            <ShoppingBagIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Đơn hàng" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick} sx={style.buttonHover}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: MainColor.YELLOW_500 }} />
          </ListItemIcon>
          <ListItemText primary="Cài đặt" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
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
      </Collapse>
      <ListItem disablePadding>
        <ListItemButton sx={style.buttonHover}>
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
