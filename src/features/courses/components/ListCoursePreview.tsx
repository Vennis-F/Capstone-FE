import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import {
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import { useState } from 'react'

import { ChapterLecture } from 'features/chapter-lecture/types'
import VideoPlayer from 'libs/ui/components/VideoPlayer'
import { secondsToMinutesString } from 'libs/utils/handle-time'

type Props = {
  chapterLectures: ChapterLecture[]
}

const ListCoursePreview = ({ chapterLectures }: Props) => {
  const [expanded, setExpanded] = useState(true)
  const [currChapterLecturePreview, setCurrChapterLecturePreview] = useState<ChapterLecture | null>(
    null,
  )
  const [open, setOpen] = useState(false)

  const handleChange = () => {
    setExpanded(!expanded)
  }

  const handleClosePreview = () => {
    setOpen(false)
    setCurrChapterLecturePreview(null)
  }

  const handleOpenPreview = (chapterLecture: ChapterLecture) => {
    setOpen(true)
    setCurrChapterLecturePreview(chapterLecture)
  }

  return (
    <>
      <Accordion expanded={expanded} onChange={handleChange} disableGutters={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
            Danh sách bài giảng
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {chapterLectures.map(chapterLecture => (
              <ListItem
                key={chapterLecture.id}
                disablePadding
                secondaryAction={
                  <ListItemText>
                    {chapterLecture.isPreviewed && (
                      <Typography
                        component={'span'}
                        sx={{ textDecorationLine: 'underline', color: '#146C94' }}
                      >
                        Xem trước
                      </Typography>
                    )}
                    {` ${secondsToMinutesString(chapterLecture.totalContentLength)}`}
                  </ListItemText>
                }
              >
                {chapterLecture.isPreviewed ? (
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => handleOpenPreview(chapterLecture)}
                  >
                    <ListItemIcon>
                      <OndemandVideoIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Bài giảng ${chapterLecture.index}: ${chapterLecture.title}`}
                      sx={{ textDecorationLine: 'underline', color: '#146C94' }}
                    />
                  </ListItemButton>
                ) : (
                  <ListItemButton role={undefined} dense>
                    <ListItemIcon>
                      <OndemandVideoIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Bài giảng ${chapterLecture.index}: ${chapterLecture.title}`}
                    />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      {currChapterLecturePreview && (
        <Container maxWidth="lg">
          <Dialog open={open} onClose={handleClosePreview} fullWidth={true} maxWidth="sm">
            <Box
              sx={{
                backgroundColor: '#2D2F31',
              }}
            >
              <DialogTitle id="alert-dialog-title" sx={{ color: 'white' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#d1d5db' }}>
                  Xem trước khóa học
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: '600' }}>
                  {`Bài giảng ${currChapterLecturePreview.index}: ${currChapterLecturePreview.title}`}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <VideoPlayer
                  videoURL={`${process.env.REACT_APP_API_BASE_CLOUD_URL}/video?id=${
                    currChapterLecturePreview?.video as string
                  }`}
                />
              </DialogContent>
            </Box>
          </Dialog>
        </Container>
      )}
    </>
  )
}

export default ListCoursePreview
