import { Box, Dialog, DialogTitle, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { CourseLearnerFilterResponse } from 'features/courses/types'
import { getCourseForLearnerSearchByLearnerIdFromCustomer } from 'features/learner/api'
import { LearnerCourseProgressCardView } from 'features/learner/components/LearnerCourseProgressCardView'

export type Props = {
  openDialog: boolean
  handleCloseDialog: () => void
  learnerId: string
}

export const LearnerProgressDialog = ({ openDialog, handleCloseDialog, learnerId }: Props) => {
  const [courses, setCourses] = useState<CourseLearnerFilterResponse[]>([])
  console.log(courses)
  const handleGetCourseOfLearnerLearn = async () => {
    const res = await getCourseForLearnerSearchByLearnerIdFromCustomer('', learnerId)
    setCourses(res.data)
  }

  useEffect(() => {
    handleGetCourseOfLearnerLearn()
  }, [])

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth={true}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Tiến độ học của bé
      </DialogTitle>

      <Box sx={{ flexGrow: 1, padding: '40px' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 9 }}>
          {courses.map(learningCourse => (
            <Grid item xs={2} sm={3} md={3} key={learningCourse.id}>
              <LearnerCourseProgressCardView learningCourse={learningCourse} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Dialog>
  )
}
