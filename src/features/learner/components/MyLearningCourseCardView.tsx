/* eslint-disable @typescript-eslint/no-unused-vars */
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
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CourseFilterResponse, CourseLearnerFilterResponse } from 'features/courses/types'
import ReadMoreText from 'libs/ui/components/ReadMoreText'

interface Props {
  learningCourse: CourseLearnerFilterResponse | CourseFilterResponse
}

export const MyLearningCourseCardView = ({ learningCourse }: Props) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [completePercent, setCompletePercent] = useState<null | number>(null)

  function processCourse(courseLearning: Props['learningCourse']) {
    if ('completedPercent' in courseLearning) {
      const course = learningCourse as CourseLearnerFilterResponse
      setCompletePercent(course.completedPercent)
    }
  }

  useEffect(() => {
    if (learningCourse) processCourse(learningCourse)
  }, [learningCourse])

  return (
    <>
      <Paper elevation={5} sx={{ maxWidth: 345 }}>
        <Card>
          <CardActionArea onClick={() => navigate(`/course/${learningCourse.id}/chapter-lecture`)}>
            <CardMedia
              component="img"
              height="140"
              image={learningCourse.thumbnailUrl}
              alt="Hình ảnh"
            />
            <CardContent sx={{ height: '50px' }}>
              <ReadMoreText
                maxCharacterCount={40}
                isTruncatedText={true}
                text={learningCourse.title}
                sxCustom={{ fontWeight: '600', fontSize: '20px' }}
              />
            </CardContent>
          </CardActionArea>
          {completePercent !== null && (
            <CardActions>
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={completePercent} color="secondary" />
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ fontSize: '12px', marginTop: '4px' }}>
                    {completePercent}% Hoàn thành
                  </Typography>
                  {/* <Link
                sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
                // onClick={handleClickOpen}
              >
                <Box sx={{ textAlign: 'right' }}>
                  <Rating value={learningCourse.rating} readOnly sx={{ fontSize: '12px' }} />
                  <Typography sx={{ fontSize: '12px' }}>
                    {learningCourse.rating !== 0 ? 'Đánh giá của bạn' : 'Hãy đánh giá'}
                  </Typography>
                </Box>
              </Link> */}
                </Box>
              </Box>
            </CardActions>
          )}
        </Card>
      </Paper>
    </>
  )
}

/* <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Bạn đáng giá về khóa học này như thế nào?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={() => setOpen(false)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> */

/* <CardActions>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={50} color="secondary" />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontSize: '12px', marginTop: '4px' }}>{13}% Hoàn thành</Typography>
              <Link
                sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
                onClick={handleClickOpen}
              >
                <Box sx={{ textAlign: 'right' }}>
                  <Rating value={learningCourse.rating} readOnly sx={{ fontSize: '12px' }} />
                  <Typography sx={{ fontSize: '12px' }}>
                    {learningCourse.rating !== 0 ? 'Đánh giá của bạn' : 'Hãy đánh giá'}
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
        </CardActions> */
