import {
  AccessTimeOutlined,
  AllInclusiveOutlined,
  PersonalVideoOutlined,
  SmartphoneOutlined,
} from '@material-ui/icons'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

import { useCartService } from 'features/cart/hooks'
import { checkPromotionCourseApply } from 'features/promotion/api'
import { PromotionCourse } from 'features/promotion/types'
import CustomButton from 'libs/ui/components/CustomButton'
import { toastError, toastSuccess, toastWarn } from 'libs/utils/handle-toast'
import { getAccessToken } from 'libs/utils/handle-token'

import { GetCourseDetailResponse } from '../types'

interface Props {
  courseDetail: GetCourseDetailResponse
}

const CourseCartBougthCardView = ({ courseDetail }: Props) => {
  const [coupon, setCoupon] = useState('')
  const [showInputCoupon, setShowInputCoupon] = useState(false)
  const [activeInput, setActiveInput] = useState(true)
  const { createCartItem } = useCartService()
  const [currPromotionCourseId, setCurrPromotionCourseId] = useState<string | null>(
    courseDetail.promotionCourseByStaffId,
  )
  const [promotionCourseApply, setPromotionCourseApply] = useState<PromotionCourse | null>(null)

  const handleAddCartItem = () => {
    const token = getAccessToken()
    if (token) {
      createCartItem({
        promotionCourseId: currPromotionCourseId,
        courseId: courseDetail.id,
      })
    } else {
      toastWarn({ message: 'Hãy đăng nhập trước khi thêm vào giỏ hàng' })
    }
  }

  const handleClickApplyCoupon = async () => {
    if (!coupon) return toastError({ message: 'Ơ ô trống kìa em' })

    setActiveInput(false)
    const { promotionCourse } = await checkPromotionCourseApply({
      code: coupon,
      courseId: courseDetail.id,
    })

    if (promotionCourse) {
      setCoupon('')
      setShowInputCoupon(false)
      setCurrPromotionCourseId(promotionCourse.id)
      setPromotionCourseApply(promotionCourse)
      toastSuccess({
        message: `Áp mã giảm giá thành công! Bạn được giảm ${promotionCourse.promotion.discountPercent}%`,
      })
    } else {
      setActiveInput(true)
      toastError({ message: 'Không thể áp dụng mã giảm giá' })
    }
    return true
  }

  return (
    <Card sx={{ width: '100%', position: 'absolute', top: 0, right: 0 }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://img-c.udemycdn.com/course/240x135/3959106_03de_6.jpg"
        title="green iguana"
      />

      <CardContent sx={{ padding: '20px', paddingBottom: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!courseDetail.promotionCourseByStaffId && !promotionCourseApply && (
            <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: 32, marginRight: 2 }}>
              ₫{courseDetail.price}
            </Typography>
          )}
          {courseDetail.promotionCourseByStaffId && (
            <>
              <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: 32, marginRight: 2 }}>
                ₫{courseDetail.discountPrice}
              </Typography>
              <Typography sx={{ color: 'gray', fontSize: 14, textDecorationLine: 'line-through' }}>
                ₫{courseDetail.price}
              </Typography>
            </>
          )}
          {promotionCourseApply && (
            <>
              <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: 32, marginRight: 2 }}>
                ₫
                {courseDetail.price -
                  (promotionCourseApply.promotion.discountPercent / 100) * courseDetail.price}
              </Typography>
              <Typography sx={{ color: 'gray', fontSize: 14, textDecorationLine: 'line-through' }}>
                ₫{courseDetail.price}
              </Typography>
            </>
          )}
        </Box>

        <CustomButton onClick={handleAddCartItem}>Thêm vào giỏ hàng</CustomButton>

        <Button
          variant="outlined"
          disableElevation
          sx={{
            borderColor: 'black',
            color: 'black',
            width: '100%',
            fontWeight: '600',
            '&:hover': {
              borderColor: 'black',
            },
            marginTop: '10px',
          }}
        >
          Mua ngay
        </Button>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', marginTop: '10px', fontSize: '12px' }}
        >
          Đảm bảo hoàn tiền trong 30 ngày
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: '12px',
            marginBottom: '8px',
          }}
        >
          Khóa học này bao gồm
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <AccessTimeOutlined fontSize="small" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', marginLeft: '18px' }}
          >
            {courseDetail.totalLength} giờ video theo yêu cầu
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <PersonalVideoOutlined fontSize="small" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', marginLeft: '18px' }}
          >
            {courseDetail.totalChapter} video bài giảng
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <SmartphoneOutlined fontSize="small" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', marginLeft: '18px' }}
          >
            Truy cập trên thiết bị di động và máy tính
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <AllInclusiveOutlined fontSize="small" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', marginLeft: '18px' }}
          >
            Quyền truy cập suốt đời
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      <CardActions
        sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Button
          sx={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '10px' }}
          size="small"
          onClick={() => {
            if (!courseDetail.promotionCourseByStaffId) {
              setShowInputCoupon(!showInputCoupon)
              setCoupon('')
            } else toastWarn({ message: 'Khóa học đã được giảm giá!' })
          }}
        >
          Áp mã giảm giá
        </Button>
        {showInputCoupon && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Nhập mã giảm giá"
              value={coupon}
              disabled={!activeInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCoupon(event.target.value)
              }}
            />
            <Button
              sx={{
                textTransform: 'capitalize',
                backgroundColor: '#a78bfa',
                color: 'white',
                fontWeight: '600',
              }}
              disabled={!activeInput}
              onClick={handleClickApplyCoupon}
            >
              Áp dụng
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  )
}

export default CourseCartBougthCardView
