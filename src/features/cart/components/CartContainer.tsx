import CircleSharpIcon from '@mui/icons-material/CircleSharp'
import DeleteIcon from '@mui/icons-material/Delete'
import DiscountIcon from '@mui/icons-material/Discount'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import {
  Container,
  Typography,
  Box,
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Rating,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CardActions,
  //   Button,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ReadMoreText from 'libs/ui/components/ReadMoreText'

export const CartContainer = () => {
  const [openModalDeleteAll, setOpenModalDeleteAll] = useState(false)
  const navigate = useNavigate()

  const cart = {
    id: '123',
    totalPrice: '50000',
    totalPricePromotion: '100000',
    totalPriceAfterPromotion: '5000',
    cartItems: [
      {
        id: '1',
        course: {
          id: '1',
          title: 'Working with Microservices in Go (Golang)',
          author: 'Nguyễn Hoàng Anh',
          rating: 4.6,
          numOfRating: 1000,
          price: '10000',
          priceAfterPromotion: '8000',
          totalChapter: 199,
          totalContentLength: 45,
          totalBought: 2322,
          level: {
            name: 'Ngu',
          },
          thumbnailUrl: 'https://img-c.udemycdn.com/course/240x135/4606320_764e_2.jpg',
        },
      },
      {
        id: '2',
        course: {
          title: 'JavaScript Algorithms and Data Structures Masterclass',
          author: 'Nguyễn Hoàng Lộc',
          rating: 3,
          numOfRating: 3000,
          price: '299000',
          priceAfterPromotion: '1090000',
          totalChapter: 29,
          totalContentLength: 4,
          totalBought: 1000,
          level: {
            name: 'Dốt',
          },
          thumbnailUrl: 'https://img-c.udemycdn.com/course/240x135/1406344_1d65_3.jpg',
        },
      },
    ],
  }
  const handleOpenModalDeleteAll = () => {
    setOpenModalDeleteAll(true)
  }

  const handleCloseDeleteAll = () => {
    setOpenModalDeleteAll(false)
  }
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: '600' }}>
        Giỏ hàng
      </Typography>

      <Box sx={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
        <Typography variant="h5" sx={{ flex: 5, fontWeight: '600', fontSize: '14px' }}>
          {2} Khóa học trong giỏ hàng
        </Typography>
        <Box sx={{ flex: 2, textAlign: 'right' }}>
          <Button sx={{ color: 'red' }} onClick={handleOpenModalDeleteAll}>
            Xóa toàn bộ
            <DeleteIcon />
          </Button>
        </Box>
        <Box sx={{ flex: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: '600', fontSize: '20px', paddingLeft: '20px', textAlign: 'center' }}
          >
            Tổng kết
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 7 }}>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              {cart.cartItems.map(({ course, id }) => (
                <Card key={id} sx={{ display: 'flex' }}>
                  <CardActionArea
                    sx={{ display: 'flex', alignItems: 'stretch' }}
                    onClick={() => navigate('/detail-course', { state: { id: course.id } })}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 151, flex: 1 }}
                      image={course.thumbnailUrl}
                      alt="Hình ảnh"
                    />
                    <Box sx={{ flex: 5, display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <ReadMoreText
                          text={course.title}
                          isTruncatedText={true}
                          maxCharacterCount={40}
                          sxCustom={{ fontSize: '18px', fontWeight: '600' }}
                        />

                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          Bởi {course.author}
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
                            sx={{
                              fontWeight: 'bold',
                              marginRight: 1,
                              color: '#FAAF00',
                              fontSize: '16px',
                            }}
                          >
                            {course.rating}
                          </Typography>
                          <Rating
                            name="read-only"
                            value={course.rating}
                            readOnly
                            sx={{ fontSize: '16px', marginRight: '10px' }}
                          />
                          <Typography component="span" sx={{ fontSize: '14px' }}>
                            ({course.numOfRating} đánh giá)
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography component="span" sx={{ fontSize: '13px', color: 'GrayText' }}>
                            {course.totalContentLength} Tổng số giờ học
                          </Typography>
                          <CircleSharpIcon
                            sx={{
                              fontSize: '8px !important',
                              margin: '0 10px',
                              color: 'gray',
                            }}
                          />
                          <Typography component="span" sx={{ fontSize: '13px', color: 'GrayText' }}>
                            {course.totalChapter} Bài giảng
                          </Typography>
                          <CircleSharpIcon
                            sx={{
                              fontSize: '8px !important',
                              margin: '0 10px',
                              color: 'gray',
                            }}
                          />
                          <Typography component="span" sx={{ fontSize: '13px', color: 'GrayText' }}>
                            {course.level.name}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <CardContent>
                        <Typography
                          sx={{
                            color: '#19A7CE',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          ₫299,000 <DiscountIcon sx={{ fontSize: '16px', marginLeft: '5px' }} />
                        </Typography>
                        <Typography sx={{ color: 'black', textDecorationLine: 'line-through' }}>
                          ₫299,000
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                  <CardActions>
                    <Box>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Button
                          onClick={handleOpenModalDeleteAll}
                          sx={{
                            color: 'black',
                            '&:hover': {
                              color: 'red',
                            },
                          }}
                        >
                          <RemoveShoppingCartIcon />
                        </Button>
                      </CardContent>
                    </Box>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
        <Box sx={{ flex: 3 }}>
          <Box sx={{ paddingLeft: '20px' }}>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <Typography sx={{ flex: 1 }}>Giá gốc:</Typography>
              <Typography sx={{ flex: 1, textAlign: 'right' }}>₫{cart.totalPrice}</Typography>
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <Typography sx={{ flex: 1 }}>Tổng số tiền giảm:</Typography>
              <Typography sx={{ flex: 1, textAlign: 'right' }}>
                -₫{cart.totalPriceAfterPromotion}
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: '10px' }} />
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <Typography sx={{ flex: 1, fontWeight: '600' }}>Tổng:</Typography>
              <Typography
                sx={{
                  flex: 1,
                  textAlign: 'right',
                  color: '#146C94',
                  fontWeight: '600',
                  fontSize: '22px',
                }}
              >
                ₫{cart.totalPrice}
              </Typography>
            </Box>
            <Button
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: '#19A7CE',
                fontWeight: '500',
                width: '100%',
                '&:hover': {
                  backgroundColor: '#146C94',
                },
              }}
            >
              Thanh toán
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openModalDeleteAll}
        onClose={handleCloseDeleteAll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xóa tất cả'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thăng ngu này, mẹ mày có muốn xóa tất cả không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteAll} sx={{ color: '#19A7CE', fontWeight: '600' }}>
            Đéo
          </Button>
          <Button
            onClick={handleCloseDeleteAll}
            autoFocus
            sx={{ color: '#19A7CE', fontWeight: '600' }}
          >
            Yeah baby
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
