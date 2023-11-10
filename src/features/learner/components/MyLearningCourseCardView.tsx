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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CourseLearnerFilterResponse } from 'features/courses/types'
import ReadMoreText from 'libs/ui/components/ReadMoreText'

interface Props {
  learningCourse: CourseLearnerFilterResponse
}

export const MyLearningCourseCardView = ({ learningCourse }: Props) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

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
            {/* <CardContent sx={{ height: '90px' }}> */}
            <CardContent sx={{ height: '50px' }}>
              <ReadMoreText
                maxCharacterCount={40}
                isTruncatedText={true}
                text={learningCourse.title}
                sxCustom={{ fontWeight: '600', fontSize: '20px' }}
              />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Box sx={{ width: '100%' }}>
              <LinearProgress
                variant="determinate"
                value={learningCourse.completedPercent}
                color="secondary"
              />
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontSize: '12px', marginTop: '4px' }}>
                  {learningCourse.completedPercent}% Hoàn thành
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
