import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded'
import { Box, Button, Checkbox, Toolbar, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import { useState } from 'react'

import VideoPlayer from 'libs/ui/components/VideoPlayer'

import TabsChapterLectureLearn from './TabsChapterLectureLearn'

const drawerWidth = 280

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  //   padding: theme.spacing(3),
  padding: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
  position: 'relative',
}))

const ChapterLectureLearnContainer = () => {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', marginTop: '-50px' }}>
      <Main open={open}>
        <Box sx={{ height: '65vh' }}>
          <VideoPlayer />
        </Box>
        <TabsChapterLectureLearn />
        {!open && (
          <Button
            sx={{
              position: 'absolute',
              top: '150px',
              right: '0',
              backgroundColor: '#2D2F31',
              border: '1px solid gray',
              '&:hover': {
                backgroundColor: '#444649',
              },
            }}
            onClick={handleDrawerOpen}
            variant="contained"
          >
            <ArrowBackIcon />
          </Button>
        )}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Toolbar />
        <Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />{' '}
            <Typography component={'span'} sx={{ color: 'black', fontWeight: '500' }}>
              Nội dung khóa học
            </Typography>
          </IconButton>
        </Box>
        <Divider />
        <List>
          {['1. Giới thiệu', '2. Vẽ cơ bản', '3. Vẽ con chim', '4. Vẽ đôi cánh'].map(text => (
            <>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <Checkbox disabled checked={true} sx={{ padding: 0, marginRight: '12px' }} />
                  <ListItemText
                    primary={text}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PlayCircleFilledRoundedIcon
                          sx={{ fontSize: '16px', marginRight: '4px' }}
                        />
                        <Typography variant="caption">{5} phút</Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default ChapterLectureLearnContainer
