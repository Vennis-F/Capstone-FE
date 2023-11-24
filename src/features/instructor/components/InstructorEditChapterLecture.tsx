import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { updateChapterLecture } from 'features/chapter-lecture/api'
import { ChapterLecture } from 'features/chapter-lecture/types'
import VideoPlayer from 'libs/ui/components/VideoPlayer'
import { secondsToMinutesString } from 'libs/utils/handle-time'
import { getUserRole } from 'libs/utils/handle-token'
import { UserRole } from 'types'

import InstructorUploadChapterLectureVideo from './InstructorUploadChapterLectureVideo'

type Props = {
  chapterLecture: ChapterLecture
}

const InstructorEditChapterLecture = ({ chapterLecture }: Props) => {
  const [editVideo, setEditVideo] = useState(false)
  const [isPreviewed, setIsPreviewed] = useState(chapterLecture.isPreviewed)
  const [isExpanded, setIsExpanded] = useState(false)

  const renderVideoOrUpload = !editVideo ? (
    <Grid container spacing="0" margin={0}>
      <Grid item xs={2} padding="0px">
        <VideoPlayer
          // videoURL={`${process.env.REACT_APP_API_BASE_CLOUD_URL}/video?id=${chapterLecture.video}`}
          videoURL={`http://localhost:3000/video?id=${chapterLecture.video}`}
        />
      </Grid>
      <Grid item xs={7} padding="0px" marginLeft="10px">
        <Box>
          <Typography>{secondsToMinutesString(chapterLecture.totalContentLength)}</Typography>
          <Typography>mp4</Typography>
        </Box>
      </Grid>
      <Grid item padding="0px" marginLeft="auto">
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#6366f1',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            borderRadius: 0,
            ':hover': { backgroundColor: '#5254cf' },
          }}
          onClick={() => {
            setEditVideo(true)
          }}
        >
          <EditIcon fontSize="small" sx={{ marginRight: '5px' }} /> Thay đổi
        </Button>
      </Grid>
    </Grid>
  ) : (
    <>
      <InstructorUploadChapterLectureVideo chapterLecture={chapterLecture} />
      {editVideo && chapterLecture.video && (
        <Button onClick={() => setEditVideo(false)}>Trở về</Button>
      )}
    </>
  )

  const handleChangePreviewed = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    await updateChapterLecture({
      chapterLectureId: chapterLecture.id,
      isPreviewed: checked,
    })
    setIsPreviewed(checked)
  }

  useEffect(() => {
    setEditVideo(!chapterLecture.video)
  }, [chapterLecture.video])

  return (
    <Accordion
      expanded={isExpanded}
      sx={{ border: '1px solid black', borderRadius: 0, width: '100%' }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon onClick={() => setIsExpanded(!isExpanded)} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container spacing="1" margin={0}>
          <Grid item xs={2} padding="0px">
            Bài giảng {chapterLecture.index}:
          </Grid>
          <Grid item xs={5}>
            {chapterLecture.title}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isPreviewed}
                    onChange={handleChangePreviewed}
                    disabled={getUserRole() === UserRole.STAFF}
                  />
                }
                label="Xem trước"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </AccordionSummary>
      <Divider sx={{ color: 'black', backgroundColor: 'black' }} />
      <AccordionDetails>{renderVideoOrUpload}</AccordionDetails>
    </Accordion>
  )
}

export default InstructorEditChapterLecture
