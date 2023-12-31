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
import { useNavigate, useSearchParams } from 'react-router-dom'

import { generateCertifcate } from 'features/achivement/api'
// import { MainColor } from 'libs/const/color'
import VideoPlayer from 'libs/ui/components/VideoPlayer'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { formatSecondToMinute } from 'libs/utils/handle-time'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getUserRoleOrNull } from 'libs/utils/handle-token'
import { getVideo } from 'libs/utils/handle-video'
import { UserRole } from 'types'

import {
  getChapterLectureOfInstructorStudy,
  getChapterLectureOfLearnerStudy,
  saveUserLectureCompleted,
} from '../api'
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
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const { setIsOpen } = useTour()
  const [searchParams, setSearchParams] = useSearchParams()
  const [chapterLectures, setChapterLectures] = useState<ChapterLectureFilter[]>([])
  const [currChapterLecture, setCurrChapterLecture] = useState<ChapterLectureFilter | null>(null)
  const userRole = getUserRoleOrNull()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleGeneratePdf = async (newChapterLectures: ChapterLectureFilter[]) => {
    if (userRole === UserRole.INSTRUCTOR) return

    let totalCompleteds = 0
    newChapterLectures.forEach(chapterLecture => {
      if (chapterLecture.isCompleted) totalCompleteds += 1
    })

    if (newChapterLectures.length === totalCompleteds) {
      try {
        await generateCertifcate(courseId)
        toastSuccess({ message: 'Chúc mừng bạn đã hoàn thành khóa học, bạn đã được nhận bằng cấp' })
      } catch (error) {
        showErrorResponseSaga({ error, defaultMessage: 'Không tạo bằng cấp được' })
      }
    }
  }

  const handleGetChapterLectureStudy = async (isGenerate: boolean) => {
    if (userRole === UserRole.INSTRUCTOR) {
      const currChapterLecturesRes = await getChapterLectureOfInstructorStudy(courseId)
      setChapterLectures(currChapterLecturesRes.sort((a, b) => a.index - b.index))
      return
    }

    if (!isGenerate) {
      const currChapterLecturesRes = await getChapterLectureOfLearnerStudy(courseId)
      setChapterLectures(currChapterLecturesRes.sort((a, b) => a.index - b.index))
    } else {
      const currChapterLecturesRes = await getChapterLectureOfLearnerStudy(courseId)
      await handleGeneratePdf(currChapterLecturesRes)
      setChapterLectures(currChapterLecturesRes.sort((a, b) => a.index - b.index))
    }
  }

  const handleSaveCompleteChapterLecture = async (chapterLectureId: string) => {
    if (userRole === UserRole.INSTRUCTOR) return

    const chapterLecture = chapterLectures.find(
      chapterLecturee => chapterLecturee.id === chapterLectureId,
    ) as ChapterLectureFilter

    if (!chapterLecture.isCompleted) {
      await saveUserLectureCompleted(chapterLectureId)
      handleGetChapterLectureStudy(true)
    }
  }

  useEffect(() => {
    handleGetChapterLectureStudy(false)
  }, [])

  useEffect(() => {
    if (chapterLectures !== null && !currChapterLecture) {
      setCurrChapterLecture(chapterLectures[0])
    }
  }, [chapterLectures, currChapterLecture])

  useEffect(() => {
    if (currChapterLecture) {
      console.log(searchParams)
      setSearchParams({ chapterLectureId: currChapterLecture.id })
    }
  }, [currChapterLecture, setSearchParams])

  return (
    <Box sx={{ display: 'flex', marginTop: '-50px' }} className="six-step">
      <Main open={open}>
        <Box sx={{ height: '65vh' }}>
          <VideoPlayer
            videoURL={!currChapterLecture ? '' : getVideo(currChapterLecture.video)}
            handleSaveCompleteChapterLecture={handleSaveCompleteChapterLecture}
            chapterLectureId={currChapterLecture?.id}
          />
        </Box>

        <TabsChapterLectureLearn courseId={courseId} />

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
        <Box width="100%">
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
            <Typography component={'span'} sx={{ color: 'black', fontWeight: '500' }}>
              Nội dung khóa học
            </Typography>
          </IconButton>
          {userRole !== UserRole.INSTRUCTOR ? (
            <Button sx={{ marginLeft: '40px' }} onClick={() => setIsOpen(true)}>
              Hướng dẫn xem khóa học
            </Button>
          ) : (
            <Button
              sx={{ marginLeft: '40px', fontSize: '14px' }}
              onClick={() => navigate('/instructor/homepage')}
            >
              Quay lại danh sách khóa học
            </Button>
          )}
        </Box>
        <Divider />
        <List className="first-step">
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
                    <LocalFloristIcon
                      className="fourth-step"
                      fontSize="large"
                      sx={{ color: '#4ade80' }}
                    />
                  ) : (
                    <SpaOutlinedIcon
                      className="fourth-step"
                      fontSize="large"
                      sx={{ color: '#78716c' }}
                    />
                  )}
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
