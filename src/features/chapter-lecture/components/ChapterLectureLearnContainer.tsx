// import { URLSearchParams } from 'url'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import { useTour } from '@reactour/tour'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// import { MainColor } from 'libs/const/color'
import VideoPlayer from 'libs/ui/components/VideoPlayer'
import { formatSecondToMinute } from 'libs/utils/handle-time'

import { getChapterLectureOfLearnerStudy, saveUserLectureCompleted } from '../api'
import { ChapterLectureFilter } from '../types'

import TabsChapterLectureLearn from './TabsChapterLectureLearn'

const drawerWidth = 480

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

interface Props {
  courseId: string
}

const ChapterLectureLearnContainer = ({ courseId }: Props) => {
  const [open, setOpen] = useState(true)
  const { setIsOpen } = useTour()
  const [searchParams, setSearchParams] = useSearchParams()
  const [chapterLectures, setChapterLectures] = useState<ChapterLectureFilter[]>([])
  const [currChapterLecture, setCurrChapterLecture] = useState<ChapterLectureFilter | null>(null)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleGetChapterLectureStudy = async () => {
    const currChapterLecturesRes = await getChapterLectureOfLearnerStudy(courseId)
    setChapterLectures(currChapterLecturesRes.sort((a, b) => a.index - b.index))
  }

  const handleSaveCompleteChapterLecture = async (chapterLectureId: string) => {
    await saveUserLectureCompleted(chapterLectureId)
    handleGetChapterLectureStudy()
  }

  useEffect(() => {
    console.log(searchParams)
    handleGetChapterLectureStudy()
  }, [])

  useEffect(() => {
    if (chapterLectures !== null && !currChapterLecture) {
      setCurrChapterLecture(chapterLectures[0])
    }
  }, [chapterLectures, currChapterLecture])

  useEffect(() => {
    if (currChapterLecture) {
      setSearchParams({ chapterLectureId: currChapterLecture.id })
    }
  }, [currChapterLecture, setSearchParams])

  return (
    <Box sx={{ display: 'flex', marginTop: '-50px' }}>
      <Main open={open}>
        <Box sx={{ height: '65vh' }}>
          <VideoPlayer
            // videoURL={`${process.env.REACT_APP_API_BASE_CLOUD_URL}/video?id=${
            videoURL={`http://localhost:3000/video?id=${
              currChapterLecture && currChapterLecture.video
                ? currChapterLecture.video
                : 'chapter-lectures/videos/dded2a31-a980-4727-88a8-aa328cedc3e9.mp4'
            }`}
            handleSaveCompleteChapterLecture={handleSaveCompleteChapterLecture}
            chapterLectureId={currChapterLecture?.id}
          />
        </Box>
        <button onClick={() => setIsOpen(true)}>Open Tour</button>

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
            <ChevronRightIcon />
            <Typography component={'span'} sx={{ color: 'black', fontWeight: '500' }}>
              Nội dung khóa học
            </Typography>
          </IconButton>
        </Box>
        <Divider />
        <List>
          {chapterLectures.map(chapterLecture => (
            <>
              <ListItem
                className="second-step"
                key={chapterLecture.id}
                disablePadding
                sx={
                  chapterLecture.id === currChapterLecture?.id
                    ? { backgroundColor: '#D1D7DC' }
                    : undefined
                }
              >
                <ListItemButton onClick={() => setCurrChapterLecture(chapterLecture)}>
                  {chapterLecture.isCompleted ? (
                    <LocalFloristIcon fontSize="large" sx={{ color: '#4ade80' }} />
                  ) : (
                    <SpaOutlinedIcon fontSize="large" sx={{ color: '#78716c' }} />
                  )}
                  {/* <LocalFloristOutlined fontSize="large" />
                  <SpaOutlinedIcon fontSize="medium" sx={{ color: '#78716c' }} /> */}
                  {/* <Checkbox
                    disabled
                    checked={chapterLecture.isCompleted}
                    sx={{ padding: 0, marginRight: '12px' }}
                  /> */}
                  <ListItemText
                    sx={{ marginLeft: '8px' }}
                    primary={`Bài ${chapterLecture.index}: ${chapterLecture.title}`}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PlayCircleFilledRoundedIcon
                          sx={{ fontSize: '16px', marginRight: '4px' }}
                        />
                        <Typography variant="caption">
                          {formatSecondToMinute(chapterLecture.totalContentLength)} phút
                        </Typography>
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
