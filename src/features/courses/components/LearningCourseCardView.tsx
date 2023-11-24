import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
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
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { CourseFilterResponse } from '../types'

interface LearningCourseCardViewlearningCourse {
  learningCourse: CourseFilterResponse
  learners: LearnerFilterResponse[]
}

export const LearningCourseCardView = ({
  learningCourse,
  learners,
}: LearningCourseCardViewlearningCourse) => {
  const [isLearnerLearning, setIsLearnerLearning] = useState(false)
  const [openChangeLearningLearner, setOpenChangeLearningLearner] = useState(false)
  const [currLearningLearnerId, setCurrLearningLearnerId] = useState('')
  const [selectLearnerId, setSelectLearnerId] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setOpenChangeLearningLearner(true)
    setSelectLearnerId(event.target.value)
  }

  const handleAcceptChange = async () => {
    try {
      await updateLearnerCourse({
        courseId: learningCourse.id,
        currentLearnerId: currLearningLearnerId,
        newLearnerId: selectLearnerId,
      })
      setCurrLearningLearnerId(selectLearnerId)
      toastSuccess({ message: 'Thay đổi thành công' })
    } catch (error) {
      console.log(error)
      const learnerCurr = learners.find(
        item => item.id === currLearningLearnerId,
      ) as LearnerFilterResponse
      showErrorResponseSaga({
        error,
        defaultMessage: 'Không thế thay đổi được',
        errorStatusMessages: [
          {
            message: `Bé ${learnerCurr.lastName} ${learnerCurr.middleName} ${learnerCurr.firstName} đang học nên không chỉ định được`,
            status: 406,
          },
        ],
      })
    }
    setOpenChangeLearningLearner(false)
  }

  const getLearnerIsLearningCourse = async () => {
    const { learnerId, isLearning } = await getLearnerIsLearningCourseByCourseId(learningCourse.id)
    setCurrLearningLearnerId(learnerId)
    setSelectLearnerId(learnerId)
    setIsLearnerLearning(isLearning)
  }

  useEffect(() => {
    getLearnerIsLearningCourse()
  }, [])

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
          </CardContent>
        </CardActionArea>
        <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: '200px' }}>
          <InputLabel>Khóa học dành cho bé</InputLabel>
          <Select
            value={currLearningLearnerId}
            onChange={handleChange}
            autoWidth
            label="Age"
            disabled={isLearnerLearning}
          >
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
