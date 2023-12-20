import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Rating,
  Typography,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { getImage } from 'features/image/components/apis'
import { formatCurrency } from 'libs/utils/handle-price'
import { formatSecondToHour } from 'libs/utils/handle-time'

import { Course } from '../types'

interface Props {
  course: Course
}

const CousreBoughtCardView = ({ course }: Props) => {
  const navigate = useNavigate()

  const handleNavigateCourseDetail = () => {
    navigate(`/detail-course/${course.id}`)
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: '10px' }}>
      <Card onClick={handleNavigateCourseDetail} key={course.id} sx={{ marginBottom: '20px' }}>
        <CardActionArea sx={{ display: 'flex', height: '150px' }}>
          <CardMedia
            component="img"
            sx={{ flex: 1, width: '240px !important' }}
            image={getImage(course.thumbnailUrl)}
            alt="Ảnh khóa học"
          />
          <Box sx={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5" sx={{ fontSize: '18px' }}>
                {course.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Dạy bởi {course.author}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', marginRight: 1 }}
                >
                  {course.ratedStar}
                </Typography>
                <Rating name="read-only" value={course.ratedStar} readOnly />
                <Typography sx={{ marginLeft: '5px', fontSize: '14px', color: 'gray' }}>{`(${
                  course.totalBought ? course.totalBought : 0
                })`}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" component="span">
                  {`${formatSecondToHour(course.totalLength)} giờ học - ${
                    course.totalChapter ? course.totalChapter : 0
                  } bài giảng - ${course.level}`}
                </Typography>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{ flex: 1, padding: '16px', textAlign: 'right' }}>
            <Typography component="span" variant="h5" sx={{ fontWeight: 'bold' }}>
              ₫{formatCurrency(course.price)}
            </Typography>
            {/* <Typography component="span" variant="h5" sx={{ fontWeight: 'bold' }}>
              ₫
              {course.discount === 0
                ? formatCurrency(course.price)
                : formatCurrency(course.discountPrice)}
            </Typography>
            {course.discount !== 0 && (
              <Typography sx={{ color: 'gray', fontSize: 14, textDecorationLine: 'line-through' }}>
                ₫{formatCurrency(course.price)}
              </Typography>
            )} */}
          </Box>
        </CardActionArea>
      </Card>
    </Paper>
  )
}

export default CousreBoughtCardView
