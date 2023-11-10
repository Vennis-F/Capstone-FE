/* eslint-disable @typescript-eslint/no-unused-vars */
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { getLearnerIsLearningCourseByCourseId, updateLearnerCourse } from 'features/learner/api'
import { LearnerFilterResponse } from 'features/learner/types'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import ReadMoreText from 'libs/ui/components/ReadMoreText'

import { CourseFilterResponse } from '../types'

interface LearningCourseCardViewlearningCourse {
  learningCourse: CourseFilterResponse
  learners: LearnerFilterResponse[]
}

export const LearningCourseCardView = ({
  learningCourse,
  learners,
}: LearningCourseCardViewlearningCourse) => {
  const [open, setOpen] = useState(false)
  const [openChangeLearningLearner, setOpenChangeLearningLearner] = useState(false)
  const [currLearningLearnerId, setCurrLearningLearnerId] = useState('')
  const [selectLearnerId, setSelectLearnerId] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setOpenChangeLearningLearner(true)
    setSelectLearnerId(event.target.value)
  }

  const handleAcceptChange = async () => {
    await updateLearnerCourse({
      courseId: learningCourse.id,
      currentLearnerId: currLearningLearnerId,
      newLearnerId: selectLearnerId,
    })
    setCurrLearningLearnerId(selectLearnerId)
    setOpenChangeLearningLearner(false)
  }

  const getLearnerIsLearningCourse = async () => {
    const { learnerId } = await getLearnerIsLearningCourseByCourseId(learningCourse.id)
    setCurrLearningLearnerId(learnerId)
    setSelectLearnerId(learnerId)
  }

  useEffect(() => {
    getLearnerIsLearningCourse()
  }, [])

  console.log(learningCourse.title, currLearningLearnerId, selectLearnerId)

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={learningCourse.thumbnailUrl}
            alt="Hình ảnh"
          />
          <CardContent sx={{ height: '90px' }}>
            <ReadMoreText
              maxCharacterCount={40}
              isTruncatedText={true}
              text={learningCourse.title}
              sxCustom={{ fontWeight: '600', fontSize: '15px' }}
            />
            {/* <Typography variant="body2" color="text.secondary">
              {learningCourse.author}
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: '200px' }}>
          <InputLabel>Khóa học dành cho bé</InputLabel>
          <Select value={currLearningLearnerId} onChange={handleChange} autoWidth label="Age">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {learners.map(learner => (
              <MenuItem
                key={learner.id}
                value={learner.id}
              >{`${learner.lastName} ${learner.middleName} ${learner.firstName}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Card>
      <DialogBinaryQuestion
        open={openChangeLearningLearner}
        clickAcceptAction={handleAcceptChange}
        clickCloseModal={() => setOpenChangeLearningLearner(false)}
        titleText={`Cho bé học khóa này`}
        contentText={`Bạn có chắc rằng cho bé học khóa này không?`}
      />
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
