import DeleteIcon from '@mui/icons-material/Delete'
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
import { CreateChapterLectureDialogForm } from 'features/chapter-lecture/components/CreateChapterLectureDialogForm'
import { ChapterLecture } from 'features/chapter-lecture/types'
import { CourseStatus } from 'features/courses/types'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import VideoPlayer from 'libs/ui/components/VideoPlayer'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { secondsToMinutesString } from 'libs/utils/handle-time'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getVideo } from 'libs/utils/handle-video'

import { removeChapterLectureByInstructor } from '../api'

import InstructorUploadChapterLectureVideo from './InstructorUploadChapterLectureVideo'

type Props = {
  chapterLecture: ChapterLecture
  handleGetChapterLecturesByCourseId: () => Promise<void>
  isEditable: boolean
  courseStatus: CourseStatus
}

const InstructorEditChapterLecture = ({
  chapterLecture,
  handleGetChapterLecturesByCourseId,
  isEditable,
  courseStatus,
}: Props) => {
  const [editVideo, setEditVideo] = useState(false)
  const [isPreviewed, setIsPreviewed] = useState(chapterLecture.isPreviewed)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currChapterLecture, setCurrChapterLecture] = useState<ChapterLecture>(chapterLecture)
  const [loading, setLoading] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChangePreviewed = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    try {
      await updateChapterLecture({
        chapterLectureId: currChapterLecture.id,
        isPreviewed: checked,
      })
      setIsPreviewed(checked)
    } catch (error) {
      showErrorResponseSaga({ error, defaultMessage: 'Không thay đổi xem trước được' })
    }
  }

  const handleCloseEditVideo = () => {
    setEditVideo(false)
    handleGetChapterLecturesByCourseId()
  }

  const handleDeleteChapterLecture = async () => {
    setLoading(true)
    try {
      await removeChapterLectureByInstructor(chapterLecture.id)
      toastSuccess({ message: 'Xóa bài giảng thành công' })
      setOpenDelete(false)
      handleGetChapterLecturesByCourseId()
    } catch (error) {
      showErrorResponseSaga({ error, defaultMessage: 'Bài giảng không được phép xóa' })
    }
    setLoading(false)
  }

  const renderVideoOrUpload = !editVideo ? (
    <Grid container spacing="0" margin={0}>
      <Grid item xs={2} padding="0px">
        <VideoPlayer
          // videoURL={`${process.env.REACT_APP_API_BASE_CLOUD_URL}/video?id=${chapterLecture.video}`}
          videoURL={getVideo(currChapterLecture.video)}
        />
      </Grid>
      <Grid item xs={7} padding="0px" marginLeft="10px">
        <Box>
          <Typography>{secondsToMinutesString(currChapterLecture.totalContentLength)}</Typography>
          <Typography>mp4</Typography>
        </Box>
      </Grid>
      {isEditable && (
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
            <EditIcon fontSize="small" sx={{ marginRight: '5px' }} />
            Thay đổi
          </Button>
        </Grid>
      )}
    </Grid>
  ) : (
    <>
      <InstructorUploadChapterLectureVideo
        handleCloseEditVideo={handleCloseEditVideo}
        chapterLecture={currChapterLecture}
        showButtonReturn={editVideo && Boolean(currChapterLecture.video)}
      />
    </>
  )

  useEffect(() => {
    setEditVideo(!currChapterLecture.video)
  }, [currChapterLecture.video])

  useEffect(() => {
    setCurrChapterLecture(chapterLecture)
  }, [chapterLecture])

  return (
    <>
      <Accordion
        expanded={isExpanded}
        sx={{ border: '1px solid black', borderRadius: 0, width: '100%' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setIsExpanded(!isExpanded)} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing="1" margin={0} alignItems="center">
            <Grid item xs={2} padding="0px">
              Bài giảng {currChapterLecture.index}:
            </Grid>
            <Grid item xs={5}>
              {currChapterLecture.title}
            </Grid>
            {!isEditable && <Grid item xs={2}></Grid>}
            <Grid item xs={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isPreviewed}
                      onChange={handleChangePreviewed}
                      disabled={!isEditable}
                    />
                  }
                  label="Xem trước"
                />
              </FormGroup>
            </Grid>

            {isEditable && (
              <Grid item xs={1}>
                <EditIcon onClick={() => setOpenDialog(true)} />
              </Grid>
            )}
            {isEditable && courseStatus === CourseStatus.CREATED && (
              <Grid item xs={1}>
                <DeleteIcon onClick={() => setOpenDelete(true)} />
              </Grid>
            )}
          </Grid>
        </AccordionSummary>
        <Divider sx={{ color: 'black', backgroundColor: 'black' }} />
        <AccordionDetails>{renderVideoOrUpload}</AccordionDetails>
      </Accordion>

      <DialogBinaryQuestion
        titleText="Xóa bài giảng"
        contentText="Bạn có chắc muốn xóa bài giảng này không?"
        open={openDelete}
        isLoading={loading}
        clickCloseModal={() => setOpenDelete(false)}
        clickAcceptAction={handleDeleteChapterLecture}
      />

      <CreateChapterLectureDialogForm
        defaultValues={{
          title: currChapterLecture.title,
          description: currChapterLecture.description,
        }}
        onSubmitClick={async data => {
          try {
            setIsLoading(true)
            await updateChapterLecture({
              title: data.title,
              description: data.description,
              chapterLectureId: currChapterLecture.id,
            })
            toastSuccess({ message: 'Cập nhật bài giảng thành công' })
            handleGetChapterLecturesByCourseId()
            setOpenDialog(false)
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Cập nhật bài giảng không thành công', error })
          }
          setIsLoading(false)
        }}
        openDialog={openDialog}
        handleOpenDialog={() => setOpenDialog(true)}
        handleCloseDialog={() => setOpenDialog(false)}
        isLoading={isLoading}
        type="update"
      />
    </>
  )
}

export default InstructorEditChapterLecture
