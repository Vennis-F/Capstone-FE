import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  LinearProgress,
  Box,
  Rating,
  Link,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material'
import { useState } from 'react'

import ReadMoreText from 'libs/ui/components/ReadMoreText'

interface LearningCourseCardViewlearningCourse {
  learningCourse: LearningCourse
}

interface LearningCourse {
  id: string
  title: string
  author: string
  price: number
  rating: number
  img: string
}

export const LearningCourseCardView = ({
  learningCourse,
}: LearningCourseCardViewlearningCourse) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={learningCourse.img} alt="Hình ảnh" />
          <CardContent sx={{ height: '90px' }}>
            <ReadMoreText
              maxCharacterCount={50}
              isTruncatedText={true}
              text={learningCourse.title}
              sxCustom={{ fontWeight: '600', fontSize: '15px' }}
            />
            <Typography variant="body2" color="text.secondary">
              {learningCourse.author}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
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
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Bạn đáng giá về khóa học này như thế nào?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
