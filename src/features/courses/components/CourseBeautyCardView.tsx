import { PlayArrow } from '@material-ui/icons'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import CustomButton from 'libs/ui/components/CustomButton'
import ReadMoreText from 'libs/ui/components/ReadMoreText'

import { Course } from '../types'

type Props = { course: Course }

const CourseBeautyCardView = ({ course }: Props) => {
  const navigate = useNavigate()

  return (
    <Card
      key={course.title}
      sx={{ maxWidth: 250, backgroundColor: '#F5F7F8', borderRadius: '10px' }}
    >
      <CardActionArea onClick={() => navigate(`/detail-course/${course.id}`)}>
        <CardMedia component="img" height="180px" image={course.thumbnailUrl} alt="green iguana" />

        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: '600', fontSize: '18px' }}
          >
            {course.title}
          </Typography>
          <ReadMoreText
            text={course.description}
            isTruncatedText={true}
            maxCharacterCount={50}
            sxCustom={{ color: 'GrayText', fontSize: '14px', marginBottom: '8px' }}
          />
          <Typography
            variant="body2"
            component="div"
            sx={{
              color: 'GrayText',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <OndemandVideoIcon sx={{ marginRight: '7px' }} />
            {course.totalChapter} Bài học
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#0ea5e9', fontWeight: '600', fontSize: '16px' }}
          >
            ₫{course.price}
          </Typography>
        </CardContent>

        <CardActions>
          <CustomButton
            sxCustom={{ textTransform: 'capitalize', fontSize: '12px !important' }}
            onClick={() => navigate('/detail-course', { state: { id: course.id } })}
          >
            <PlayArrow /> Bắt đầu học
          </CustomButton>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default CourseBeautyCardView
