/* eslint-disable @typescript-eslint/no-unused-vars */
import FlagIcon from '@mui/icons-material/Flag'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Typography,
  Link,
  LinearProgress,
  Rating,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  IconButton,
  Grid,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createCourseFeedback } from 'features/course-feedback/apis'
import { createCourseReportByCustomerOrLearner } from 'features/course-report/apis'
import { CourseFilterResponse, CourseLearnerFilterResponse } from 'features/courses/types'
import { getImage } from 'features/image/components/apis'
import ReadMoreText from 'libs/ui/components/ReadMoreText'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

interface Props {
  learningCourse: CourseLearnerFilterResponse | CourseFilterResponse
}

export const MyLearningCourseCardView = ({ learningCourse }: Props) => {
  const navigate = useNavigate()
  const [completePercent, setCompletePercent] = useState<null | number>(null)

  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [star, setStar] = useState<number>(5)
  const [isLoading, setIsLoading] = useState(false)

  const [openReport, setOpenReport] = useState(false)
  const [descriptionReport, setDescriptionReport] = useState('')
  const [isLoadingReport, setIsLoadingReport] = useState(false)

  function processCourse(courseLearning: Props['learningCourse']) {
    if ('completedPercent' in courseLearning) {
      const course = learningCourse as CourseLearnerFilterResponse
      setCompletePercent(course.completedPercent)
    }
  }

  useEffect(() => {
    if (learningCourse) processCourse(learningCourse)
  }, [learningCourse])

  console.log(star, description)

  return (
    <>
      <Paper elevation={5} sx={{ maxWidth: 345 }}>
        <Card>
          <CardActionArea onClick={() => navigate(`/course/${learningCourse.id}/chapter-lecture`)}>
            <CardMedia
              component="img"
              height="140"
              image={getImage(learningCourse.thumbnailUrl)}
              alt="Hình ảnh"
            />
            <CardContent sx={{ height: '50px' }}>
              <Typography
                // color={MainColor.RED_600}
                fontWeight="bold"
                fontSize="20px"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontFamily: 'sans-serif',
                  marginBottom: '10px',
                }}
              >
                {learningCourse.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Box sx={{ width: '100%' }}>
              <Grid container sx={{ width: '100%' }} alignItems="center">
                <Grid item xs={11}>
                  <LinearProgress
                    variant="determinate"
                    value={completePercent === null ? 0 : completePercent}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    disabled={!learningCourse.isCertified}
                    sx={{
                      textDecoration: 'none',
                      cursor: 'pointer',
                      color: 'red',
                      fontSize: '18px',
                      padding: 0,
                      paddingLeft: '5px',
                    }}
                    onClick={() => navigate('/user/achivements')}
                  >
                    <Box>
                      <WorkspacePremiumIcon />
                    </Box>
                  </IconButton>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontSize: '12px', marginTop: '4px' }}>
                  {completePercent === null ? 0 : completePercent}% Hoàn thành
                </Typography>
              </Box>
            </Box>
          </CardActions>
          <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                color: 'blueviolet',
                fontSize: '18px',
              }}
              onClick={() => {
                setDescriptionReport('')
                setOpenReport(true)
              }}
            >
              <Box>
                <FlagIcon />
              </Box>
            </Link>
            <Link
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                color: 'blueviolet',
                fontSize: '18px',
              }}
              onClick={() => {
                setOpen(true)
                setStar(5)
                setDescription('')
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '12px' }}>{'Hãy đánh giá'}</Typography>
              </Box>
            </Link>
          </CardActions>
        </Card>
      </Paper>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
          setStar(5)
          setDescription('')
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ textAlign: 'center' }}
      >
        <DialogTitle id="alert-dialog-title">
          {'Bạn đáng giá về khóa học này như thế nào?'}
        </DialogTitle>
        <DialogContent>
          <Rating
            name="size-large"
            value={star}
            onChange={(event, newValue) => {
              setStar(newValue as number)
            }}
            size="large"
          />
          <TextField
            fullWidth
            size="medium"
            value={description}
            onChange={e => setDescription(e.target.value)}
            multiline
            placeholder="Hãy cho chúng tôi biết trải nghiệm cá nhân của riêng bạn khi tham gia khóa học này. Khóa học có phù hợp với bạn không?"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
              setStar(5)
              setDescription('')
            }}
          >
            Không
          </Button>
          <Button
            disabled={isLoading}
            onClick={async () => {
              if (!star || !description || description.trim().length === 0)
                return toastError({ message: 'Hãy đánh giá trước khi gửi' })

              setIsLoading(true)
              try {
                await createCourseFeedback(learningCourse.id, {
                  description,
                  ratedStar: star,
                })
                toastSuccess({ message: 'Đánh giá khóa học thành công' })
                setOpen(false)
                setStar(5)
                setDescription('')
              } catch (error) {
                showErrorResponseSaga({ defaultMessage: 'Không đánh giá khóa học được', error })
              }
              return setIsLoading(false)
            }}
            autoFocus
          >
            Đánh giá
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openReport}
        onClose={() => {
          setOpenReport(false)
          setDescriptionReport('')
        }}
        aria-labelledby="alert-report-title"
        aria-describedby="alert-dialog-report"
        sx={{ textAlign: 'center' }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title-report">
          {'Bạn báo cáo gì về khóa học này?'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            size="medium"
            value={descriptionReport}
            onChange={e => setDescriptionReport(e.target.value)}
            multiline
            placeholder="Ghi chi tiết báo cáo"
            rows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenReport(false)
              setDescriptionReport('')
            }}
          >
            Không
          </Button>
          <Button
            disabled={isLoading}
            onClick={async () => {
              if (!descriptionReport || descriptionReport.trim().length === 0)
                return toastError({ message: 'Hãy ghi chi tiết báo cáo' })

              setIsLoadingReport(true)
              try {
                await createCourseReportByCustomerOrLearner(learningCourse.id, {
                  description: descriptionReport,
                })
                toastSuccess({
                  message: 'Đánh gửi báo cáo thành công, chúng tôi sẽ xử lý báo cáo của bạn',
                })
                setOpenReport(false)
                setDescriptionReport('')
              } catch (error) {
                showErrorResponseSaga({ defaultMessage: 'Không gửi báo cáo được', error })
              }
              return setIsLoadingReport(false)
            }}
            autoFocus
          >
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
