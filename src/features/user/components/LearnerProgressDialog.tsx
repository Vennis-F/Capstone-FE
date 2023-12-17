import { Box, Dialog, DialogTitle, Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'
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

      {courses.length > 0 ? (
        <Box sx={{ flexGrow: 1, padding: '40px' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 9 }}>
            {courses.map(learningCourse => (
              <Grid item xs={2} sm={3} md={3} key={learningCourse.id}>
                <LearnerCourseProgressCardView learningCourse={learningCourse} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: '40px',
          }}
        >
          <Image
            src={
              'https://afamilycdn.com/thumb_w/650/150157425591193600/2021/7/13/base64-16261710007082116287345.png'
            }
            style={{
              height: '250px',
              width: '250px',
              padding: 0,
              backgroundColor: 'F0F2F5',
              marginBottom: '20px',
            }}
            imageStyle={{
              height: '250px',
              width: '250px',
              marginBottom: '20px',
              backgroundColor: 'F0F2F5',
            }}
          />
          <Typography variant="h6" style={{ fontWeight: 'bold', color: 'rgba(0,0,0,.4)' }}>
            Hiện tại bé chưa có khóa học nào!
          </Typography>
        </Box>
      )}
    </Dialog>
  )
}
