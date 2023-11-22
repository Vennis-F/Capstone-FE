import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
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
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Footer from 'components/Footer/Footer'

import { Drawer, DrawerHeader } from './DrawerCustom'

const InstructorLayout = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <CssBaseline />
      {location.pathname !== `/instructor/course/create` && (
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
          </Toolbar>
        </AppBar>
      )}
      {location.pathname !== `/instructor/course/create` && (
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
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: 'block', padding: '0 !important' }}
              >
                <ListItemButton
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
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: 'block', padding: '0 !important' }}
              >
                <ListItemButton
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
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
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

export default InstructorLayout
