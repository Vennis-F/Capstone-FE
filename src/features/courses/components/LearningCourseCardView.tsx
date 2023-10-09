import {
  Typography,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
} from '@mui/material'

interface LearningCourseCardViewlearningCourse {
  learingCourse: LearningCourse
}

interface LearningCourse {
  id: string
  title: string
  author: string
  price: number
  rating: number
  img: string
}

export const LearningCourseCardView = ({ learingCourse }: LearningCourseCardViewlearningCourse) => {
  console.log(123)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={learningCourse.img} alt="Hình ảnh" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {learningCourse.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {learningCourse.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  )
}
