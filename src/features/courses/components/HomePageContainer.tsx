import DoneIcon from '@mui/icons-material/Done'
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom'

import { getCategories } from 'features/category/api'
import CategoryBeautyCardView from 'features/category/components/CategoryBeautyCardView'
import { Category } from 'features/category/types'
import { MainColor } from 'libs/const/color'
import CarouselCustom from 'libs/ui/components/CarouselCustom'
import CustomButton from 'libs/ui/components/CustomButton'
import { OrderType } from 'types'

import { getCoursesBySearch } from '../api'
import { categoryThumbnail } from '../data/categoryThumbnail'
import { ExpectFromCourses } from '../data/ExpectFromCourses'
import { reviewsData } from '../data/reviewsData'
import { Course, GetCoursesBySearchRequest, SortFieldCourse } from '../types'

import CourseBeautyCardView from './CourseBeautyCardView'

const HomePageContainer = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [listCourses, setListCourses] = useState<Course[]>([])

  const getNewestCourse = async () => {
    const bodyRequest: GetCoursesBySearchRequest = {
      categories: [],
      levels: [],
      // search: 'Course',
      sortField: SortFieldCourse.PUBLISHED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 10,
      },
    }
    const dataResponse = await getCoursesBySearch(bodyRequest)
    setListCourses([...dataResponse.data])
  }

  const getAllCategories = async () => {
    const listCategories = await getCategories('true')
    setCategories(listCategories)
  }

  useEffect(() => {
    getAllCategories()
    getNewestCourse()
  }, [])

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', marginBottom: '100px' }}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: '600', marginBottom: '15px' }}>
              Nền tảng cung cấp các khóa học vẽ cho
              <Typography variant="inherit" component="span" sx={{ color: '#fde047' }}>
                &nbsp;trẻ em
              </Typography>
            </Typography>
            <Typography variant="body2" sx={{ color: 'GrayText', marginBottom: '20px' }}>
              Đây sẽ là nơi tốt nhất cho bất kỳ ai bán khóa học trực tuyến với tất cả các tính năng
              Thương mại điện tử cần thiết.
            </Typography>
            <Box sx={{ width: '50%' }}>
              <CustomButton onClick={() => navigate('/guest-login')}>
                Tạo tài khoản miễn phí
              </CustomButton>
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              sx={{
                height: 600,
                width: 400,
                borderRadius: '10px',
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src="https://plus.unsplash.com/premium_photo-1678812165206-688656de3b73?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Box>
        </Box>
        <Box sx={{ marginBottom: '100px' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: '600', fontSize: '35px', marginBottom: '20px' }}
          >
            Khóa học
            <Typography component="span" variant="inherit" sx={{ color: MainColor.RED_600 }}>
              &nbsp;nổi bật
            </Typography>
          </Typography>
          <CarouselCustom>
            {listCourses.map(course => (
              <CourseBeautyCardView key={course.id} course={course} />
            ))}
          </CarouselCustom>
        </Box>
        <Box sx={{ marginBottom: '100px' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: '600', fontSize: '35px', marginBottom: '20px' }}
          >
            Thể loại
            <Typography component="span" variant="inherit" sx={{ color: MainColor.RED_600 }}>
              &nbsp;nổi bật
            </Typography>
          </Typography>
          <Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {categories.map((category, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <CategoryBeautyCardView
                    key={category.id}
                    category={category}
                    thumbnailUrl={
                      categoryThumbnail[category.name] ||
                      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>

      <Container
        maxWidth={false}
        sx={{ backgroundColor: '#F5F7F8', paddingY: '100px', marginBottom: '100px' }}
      >
        <Container maxWidth="lg">
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: '600',
                fontSize: '35px',
                marginBottom: '30px',
                textAlign: 'center',
              }}
            >
              Bạn mong đợi điều gì từ các
              <Typography component="span" variant="inherit" sx={{ color: MainColor.RED_600 }}>
                &nbsp;khóa học vẽ?
              </Typography>
            </Typography>
            <Box>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {ExpectFromCourses.map(expect => (
                  <Grid item xs={2} sm={4} md={4} key={expect.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <DoneIcon
                        sx={{
                          color: MainColor.RED_500,
                          fontSize: '40px !important',
                          fontWeight: '600',
                          marginBottom: '20px',
                        }}
                      />
                      <Typography variant="h5" sx={{ fontWeight: '600' }}>
                        {expect.title}
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center', width: '70%' }}>
                        {expect.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Container>

      <Container maxWidth="lg">
        <Carousel>
          {reviewsData.map(review => (
            <Card
              key={review.text}
              sx={{
                display: 'flex',
                width: '100%',
                backgroundColor: '#E1E9FD',
                alignItems: 'center',
              }}
            >
              <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {review.text}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    - {review.author}
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: '40%', height: '400px' }}
                image={review.thumbnailUrl}
                alt="Live from space album cover"
              />
            </Card>
          ))}
        </Carousel>
      </Container>
    </>
  )
}

export default HomePageContainer
