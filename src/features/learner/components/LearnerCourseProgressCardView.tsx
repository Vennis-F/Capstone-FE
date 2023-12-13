/* eslint-disable @typescript-eslint/no-unused-vars */
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Typography,
  LinearProgress,
  Paper,
  IconButton,
  Grid,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CourseLearnerFilterResponse } from 'features/courses/types'
import { getImage } from 'features/image/components/apis'

interface Props {
  learningCourse: CourseLearnerFilterResponse
}

export const LearnerCourseProgressCardView = ({ learningCourse }: Props) => {
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
        </Card>
      </Paper>
    </>
  )
}
