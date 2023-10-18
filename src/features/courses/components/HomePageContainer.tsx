import DoneIcon from '@mui/icons-material/Done'
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom'

import CategoryBeautyCardView from 'features/category/components/CategoryBeautyCardView'
import CarouselCustom from 'libs/ui/components/CarouselCustom'
import CustomButton from 'libs/ui/components/CustomButton'

import CourseBeautyCardView from './CourseBeautyCardView'

const courses = [
  {
    title: 'Khóa học dạy vẽ Minion',
    description: 'Nếu bạn đam mê hoạt hình Minion, thì đây là nơi phù hợp cho bạn nha',
    totalChapter: 3,
    price: '100.000',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    title: 'Khóa học dạy vẽ Minion 2',
    description: 'Nếu bạn đam mê hoạt hình Minion, thì đây là nơi phù hợp cho bạn nha',
    totalChapter: 3,
    price: '100.000',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    title: 'Khóa học dạy vẽ Minion 3',
    description: 'Nếu bạn đam mê hoạt hình Minion, thì đây là nơi phù hợp cho bạn nha',
    totalChapter: 3,
    price: '100.000',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    title: 'Khóa học dạy vẽ Minion 4',
    description: 'Nếu bạn đam mê hoạt hình Minion, thì đây là nơi phù hợp cho bạn nha',
    totalChapter: 3,
    price: '100.000',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    title: 'Khóa học dạy vẽ Minion 5',
    description: 'Nếu bạn đam mê hoạt hình Minion, thì đây là nơi phù hợp cho bạn nha',
    totalChapter: 3,
    price: '100.000',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    title: 'Khóa học dạy vẽ Minion 6',
    description: 'Nếu bạn đam mê hoạt hình Minion, thì đây là nơi phù hợp cho bạn nha',
    totalChapter: 3,
    price: '100.000',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    title: 'Khóa học dạy vẽ Minion 7',
    description: 'Nếu bạn đam mê hoạt hình Minion, thì đây là nơi phù hợp cho bạn nha',
    totalChapter: 3,
    price: '100.000',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    title: 'Khóa học dạy vẽ Minion 8',
    description: 'Nếu bạn đam mê hoạt hình Minion, thì đây là nơi phù hợp cho bạn nha',
    totalChapter: 3,
    price: '100.000',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
]

const reviews = [
  {
    text: 'Dựa trên nền tảng khóa học vẽ, tôi đã tạo và quản lý nhiều khóa học vẽ nhà một cách thuận tiện. Tính linh hoạt và tiện lợi của nền tảng này đã giúp tôi chia sẻ kiến thức về vẽ nhà một cách hiệu quả. Tôi rất hài lòng với kết quả.',
    author: 'Nguyễn Hoàng Anh',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    text: 'Nền tảng khóa học vẽ là một công cụ mạnh mẽ để tạo và quản lý các khóa học về nghệ thuật vẽ nhà. Tôi đã sử dụng nó để xây dựng các khóa học và nó đã giúp tôi đạt được mục tiêu học tập của mình. Rất cảm ơn!',
    author: 'Nguyễn Hoàng Lộc',
    thumbnailUrl:
      'https://plus.unsplash.com/premium_photo-1687187499277-e1c59bd3032f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    text: 'Không gì có thể so sánh với nền tảng khóa học vẽ khi nói về việc tạo và quản lý các khóa học về vẽ nhà. Tôi đã học được rất nhiều thông qua nó và tôi xin chia sẻ lời khen ngợi đối với tính năng mạnh mẽ và dễ sử dụng của nó.',
    author: 'Nguyễn Phước Thọ',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
  },
]

const HomePageContainer = () => {
  const navigate = useNavigate()

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
              <Typography variant="inherit" component="span" sx={{ color: '#fff570' }}>
                &nbsp;trẻ em
              </Typography>
            </Typography>
            <Typography variant="body2" sx={{ color: 'GrayText', marginBottom: '20px' }}>
              Đây sẽ là nơi tốt nhất cho bất kỳ ai bán khóa học trực tuyến với tất cả các tính năng
              Thương mại điện tử cần thiết. Đây là Eduma - Chủ đề WordPress về giáo dục.
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
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80"
            />
          </Box>
        </Box>
        <Box sx={{ marginBottom: '100px' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: '600', fontSize: '35px', marginBottom: '20px' }}
          >
            Khóa học
            <Typography component="span" variant="inherit" sx={{ color: '#2ca4db' }}>
              &nbsp;phổ biến
            </Typography>
          </Typography>
          <CarouselCustom>
            {courses.map(course => (
              /* eslint-disable */
              <CourseBeautyCardView key={course.title} course={course as any} />
            ))}
          </CarouselCustom>
        </Box>
        <Box sx={{ marginBottom: '100px' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: '600', fontSize: '35px', marginBottom: '20px' }}
          >
            Thể loại
            <Typography component="span" variant="inherit" sx={{ color: '#2ca4db' }}>
              &nbsp;nổi bật
            </Typography>
          </Typography>
          <Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(9)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <CategoryBeautyCardView
                    category={{ active: true, id: '1', name: 'Khóa học mỹ thuật' }}
                    key={'1'}
                    numOfCourses={3}
                    thumbnailUrl="https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
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
              <Typography component="span" variant="inherit" sx={{ color: '#2ca4db' }}>
                &nbsp;khóa học vẽ?
              </Typography>
            </Typography>
            <Box>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <DoneIcon
                        sx={{
                          color: '#8b5cf6',
                          fontSize: '40px !important',
                          fontWeight: '600',
                          marginBottom: '20px',
                        }}
                      />
                      <Typography variant="h5" sx={{ fontWeight: '600' }}>
                        Đội ngủ chuyên nghiệp
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center', width: '70%' }}>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                        sed quia consequuntur
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
          {reviews.map(review => (
            <Card
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
