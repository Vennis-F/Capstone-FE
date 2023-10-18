import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
// import { useNavigate } from 'react-router-dom'

import { Category } from '../types'

type Props = {
  category: Category
  thumbnailUrl: string
  numOfCourses: number
}

const CategoryBeautyCardView = ({ category, thumbnailUrl, numOfCourses }: Props) => {
  //   const navigate = useNavigate()
  console.log(123)

  return (
    <Card sx={{ backgroundColor: '#F5F7F8', borderRadius: '15px' }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={thumbnailUrl} alt="green iguana" />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: '600' }}>
            {category.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {`${numOfCourses} Khóa học`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CategoryBeautyCardView
