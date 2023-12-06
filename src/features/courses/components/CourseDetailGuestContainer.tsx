import { Avatar, Grid } from '@material-ui/core'
import EventIcon from '@mui/icons-material/Event'
import GrainIcon from '@mui/icons-material/Grain'
import HomeIcon from '@mui/icons-material/Home'
import StarIcon from '@mui/icons-material/Star'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import {
  Box,
  Container,
  Typography,
  Rating,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Pagination,
} from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import DOMPurify from 'dompurify'
import Parser from 'html-react-parser'
import RenderImage from 'material-ui-image'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getChapterLecturesByCourseId } from 'features/chapter-lecture/api'
import { ChapterLecture } from 'features/chapter-lecture/types'
import { getCoursesFeedback } from 'features/course-feedback/apis'
import { CourseFeedbackFilterResponse } from 'features/course-feedback/types'
import { MainColor } from 'libs/const/color'
import ReadMoreText from 'libs/ui/components/ReadMoreText'
import BackdropCustom from 'libs/ui/custom-components/BackdropCustom'
import { getStringDayMonthYear } from 'libs/utils/handle-date'
import { OrderType } from 'types'

import { getCoursesDetailById } from '../api'
import { GetCourseDetailResponse } from '../types'

import CourseCartBougthCardView from './CourseCartBougthCardView'
import ListCoursePreview from './ListCoursePreview'

interface CouresDetailGuestContainerProps {
  id: string
}

export const CouresDetailGuestContainer = ({ id }: CouresDetailGuestContainerProps) => {
  const [courseDetail, setCourseDetail] = useState<GetCourseDetailResponse | null>(null)
  const [chapterLectures, setChapterLectures] = useState<ChapterLecture[]>([])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [courseFeedbacks, setCourseFeedbacks] = useState<CourseFeedbackFilterResponse[]>([])

  const getCourseDetail = async (courseId: string) => {
    setIsLoading(true)
    try {
      const response = await getCoursesDetailById(courseId)
      setCourseDetail(response)

      const chapterLecturesRes = await getChapterLecturesByCourseId(courseId, true)
      const sortedArray = chapterLecturesRes.sort((a, b) => a.index - b.index)
      setChapterLectures(sortedArray)
      setPage(1)
    } catch (error) {
      console.log(`Cannot get detail for course by the id ${id}`)
    }
    setIsLoading(false)
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const getCourseFeedbacks = async () => {
    const responses = await getCoursesFeedback(id, {
      order: OrderType.DESC,
      page,
      take: 4,
    })
    setCourseFeedbacks(responses.data)
    setPageCount(responses.meta.pageCount)
  }

  useEffect(() => {
    getCourseDetail(id)
  }, [id])

  useEffect(() => {
    getCourseFeedbacks()
  }, [page])

  return isLoading ? (
    <BackdropCustom open={true} />
  ) : (
    <>
      {courseDetail ? (
        <>
          <Container
            maxWidth={false}
            sx={{
              backgroundColor: '#2D2F31',
              paddingTop: '30px',
              paddingBottom: '22px',
              marginTop: '-50px',
            }}
          >
            <Container maxWidth="lg" sx={{ display: 'flex' }}>
              <Box sx={{ width: '70%' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', marginBottom: '10px' }}>
                  <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', color: MainColor.YELLOW_500 }}
                    color="inherit"
                    href="/"
                  >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Trang chủ
                  </Link>
                  <Link
                    underline="hover"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: MainColor.YELLOW_500,
                      cursor: 'pointer',
                    }}
                    color="inherit"
                    onClick={() =>
                      navigate('/list-course', {
                        state: { categorySearchId: courseDetail.categoryId },
                      })
                    }
                  >
                    <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    {courseDetail.category}
                  </Link>
                  <Typography
                    sx={{ display: 'flex', alignItems: 'center', color: '#9c7d21' }}
                    color="text.primary"
                  >
                    <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    {courseDetail.title}
                  </Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {courseDetail?.title}
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
                    sx={{ fontWeight: 'bold', marginRight: 1, color: '#FAAF00', fontSize: '16px' }}
                  >
                    {courseDetail.ratedStar}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={courseDetail.ratedStar}
                    readOnly
                    sx={{ fontSize: '16px', marginRight: '10px' }}
                  />
                  <Typography component="span" sx={{ color: 'white', fontSize: '16px' }}>
                    {courseDetail.totalBought ? courseDetail.totalBought : 0} Học viên
                  </Typography>
                </Box>
                <Typography sx={{ color: 'white', fontWeight: 'bold', marginBottom: '10px' }}>
                  Được tạo bởi
                  <Link component="button" sx={{ fontSize: '16px', marginLeft: '10px' }}>
                    {courseDetail.author}
                  </Link>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventIcon sx={{ color: 'white', marginRight: '10px' }} />
                  <Typography sx={{ color: 'white' }}>
                    Cập nhật {getStringDayMonthYear(courseDetail.publishedDate)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: '30%', position: 'relative' }}>
                <CourseCartBougthCardView courseDetail={courseDetail} />
              </Box>
            </Container>
          </Container>
          <Container maxWidth={false}>
            <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
              <Box sx={{ width: '67%' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Nội dung khóa học
                </Typography>
                <ListCoursePreview chapterLectures={chapterLectures} />
              </Box>
            </Container>
            <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
              <Box sx={{ width: '67%' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Yêu cầu
                </Typography>
                {Parser(DOMPurify.sanitize(courseDetail.prepareMaterial as string))}
              </Box>
            </Container>
            <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
              <Box sx={{ width: '67%' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Miêu tả
                </Typography>
                {courseDetail.description && (
                  <ReadMoreText maxCharacterCount={400} text={courseDetail.description} />
                )}
              </Box>
            </Container>
            <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
              <Box sx={{ width: '67%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <StarIcon sx={{ color: '#FAAF00', marginRight: '10px' }} />
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {courseDetail.ratedStar} đánh giá khóa học
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {courseFeedbacks.map(comment => (
                    <Grid key={comment.id} item sm={12} md={6}>
                      <Card sx={{ width: '100%' }}>
                        <CardHeader
                          avatar={<Avatar>A</Avatar>}
                          title={`${comment.insertedBy}`}
                          subheader={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating
                                name="read-only"
                                value={comment.ratedStar}
                                readOnly
                                sx={{ fontSize: '16px', marginRight: '10px' }}
                              />
                              {getStringDayMonthYear(comment.updatedDate)}
                            </Box>
                          }
                        />
                        <CardContent>
                          <ReadMoreText text={comment.description} maxCharacterCount={50} />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '40px' }}>
                  <Stack spacing={2}>
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={handleChange}
                      color="secondary"
                    />
                  </Stack>
                </Box>
              </Box>
            </Container>
          </Container>
        </>
      ) : (
        <>
          <Container maxWidth="md" sx={{ height: '80vh' }}>
            <RenderImage
              src="https://media.istockphoto.com/vectors/error-page-not-found-vector-id962223846?k=6&m=962223846&s=612x612&w=0&h=FmE7jhtdf9FHMFR8m336RnNaCFFEGDZo-xqB-v3CN1M="
              alt="Preview"
              style={{ width: '100%', height: '100%', padding: 0 }}
              imageStyle={{ width: '100%', height: '100%' }}
            />
          </Container>
        </>
      )}
    </>
  )
}
