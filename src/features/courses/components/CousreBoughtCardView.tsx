import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Course } from '../types'

interface Props {
  course: Course
}

const CousreBoughtCardView = ({ course }: Props) => {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate('/detail-course', { state: { id: course.id } })}
      key={course.id}
      sx={{ marginBottom: '20px' }}
    >
      <CardActionArea sx={{ display: 'flex', height: '150px' }}>
        <CardMedia
          component="img"
          sx={{ flex: 1 }}
          image={'https://img-b.udemycdn.com/course/240x135/1879018_95b6_3.jpg'}
          //   image={course.thumbnailUrl}
          alt="Live from space album cover"
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
              <Typography
                sx={{ marginLeft: '5px', fontSize: '14px', color: 'gray' }}
              >{`(${course.totalBought})`}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" component="span">
                {`${course.totalLength} giờ học - ${course.totalChapter} bài giảng - ${course.level}`}
              </Typography>
            </Box>
          </CardContent>
        </Box>
        <Box sx={{ flex: 1, padding: '16px', textAlign: 'right' }}>
          <Typography component="span" variant="h5" sx={{ fontWeight: 'bold' }}>
            ₫{course.price}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default CousreBoughtCardView
