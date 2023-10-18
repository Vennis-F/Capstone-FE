import CircleSharpIcon from '@mui/icons-material/CircleSharp'
import DiscountIcon from '@mui/icons-material/Discount'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Rating,
  Button,
  CardActions,
  //   Button,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import ReadMoreText from 'libs/ui/components/ReadMoreText'

import { useCartService } from '../hooks'
import { CartItem } from '../types'

type Props = {
  cartItem: CartItem
}

const CartItemCardView = ({ cartItem: { course, id, promotionCourse } }: Props) => {
  const navigate = useNavigate()
  const [openModalDeleteAll, setOpenModalDeleteAll] = useState(false)
  const { deleteCartItem } = useCartService()

  const handleOpenModalDelete = () => {
    setOpenModalDeleteAll(true)
  }
  const handleCloseDelete = () => {
    setOpenModalDeleteAll(false)
  }
  const handleDelete = () => {
    handleCloseDelete()
    deleteCartItem(id)
  }

  return (
    <>
      <Card sx={{ display: 'flex' }}>
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
                  {course.ratedStar}
                </Typography>
                <Rating
                  name="read-only"
                  value={course.ratedStar}
                  readOnly
                  sx={{ fontSize: '16px', marginRight: '10px' }}
                />
                <Typography component="span" sx={{ fontSize: '14px' }}>
                  ({course.totalBought} người học)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="span" sx={{ fontSize: '13px', color: 'GrayText' }}>
                  {course.totalLength} Tổng số giờ học
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
                  {course.level}
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
                ₫
                {!promotionCourse
                  ? course.price
                  : course.price - (promotionCourse.promotion.discountPercent / 100) * course.price}
                <DiscountIcon sx={{ fontSize: '16px', marginLeft: '5px' }} />
              </Typography>
              {promotionCourse && (
                <Typography sx={{ color: 'black', textDecorationLine: 'line-through' }}>
                  ₫{course.price}
                </Typography>
              )}
            </CardContent>
          </Box>
        </CardActionArea>
        <CardActions>
          <Box>
            <CardContent sx={{ textAlign: 'center' }}>
              <Button
                onClick={handleOpenModalDelete}
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
      <DialogBinaryQuestion
        titleText="Xóa khóa giỏi hàng"
        contentText="Bạn có muốn xóa khóa học này khỏi giỏ hàng?"
        open={openModalDeleteAll}
        clickCloseModal={handleCloseDelete}
        clickAcceptAction={handleDelete}
      />
    </>
  )
}

export default CartItemCardView
