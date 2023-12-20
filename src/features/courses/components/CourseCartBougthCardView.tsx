import {
  AccessTimeOutlined,
  AllInclusiveOutlined,
  PersonalVideoOutlined,
  SmartphoneOutlined,
} from '@material-ui/icons'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCartService } from 'features/cart/hooks'
import { getImage } from 'features/image/components/apis'
import {
  checkPromotionCourseCanApplyByCode,
  findPromotionCoursesCanViewByCourseId,
} from 'features/promotion/api'
import { PromotionCourse } from 'features/promotion/types'
import CustomButton from 'libs/ui/components/CustomButton'
import { calcPriceDiscount, formatCurrency } from 'libs/utils/handle-price'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess, toastWarn } from 'libs/utils/handle-toast'
import { getAccessToken, getUserRole } from 'libs/utils/handle-token'
import { UserRole } from 'types'

import { formatSecondToHour } from '../../../libs/utils/handle-time'
import { checkCourseIsOwnedByCourseId } from '../api'
import { GetCourseDetailResponse } from '../types'

interface Props {
  courseDetail: GetCourseDetailResponse
}

const CourseCartBougthCardView = ({ courseDetail }: Props) => {
  const navigate = useNavigate()
  const [value, setValue] = useState<PromotionCourse | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [showInputCoupon, setShowInputCoupon] = useState(false)
  const [activeInput, setActiveInput] = useState(true)
  const { createCartItem } = useCartService()
  const [currPromotionCourseId, setCurrPromotionCourseId] = useState<string | null>(
    // courseDetail.promotionCourseByStaffId,
    null,
  )
  const [promotionCourseApply, setPromotionCourseApply] = useState<PromotionCourse | null>(null)
  const [isOwned, setIsOwned] = useState(false)
  const [promotionCouresView, setPromotionCouresView] = useState<PromotionCourse[]>([])

  const handleAddCartItem = () => {
    const token = getAccessToken()
    if (token) {
      if (getUserRole() !== UserRole.CUSTOMER)
        return toastError({ message: 'Bạn không được phép làm hành động này' })
      createCartItem({
        promotionCourseId: currPromotionCourseId,
        courseId: courseDetail.id,
      })
    } else {
      toastWarn({ message: 'Hãy đăng nhập trước khi thêm vào giỏ hàng' })
    }
    return null
  }

  const handleClickApplyCoupon = async () => {
    if (!value && !inputValue)
      return toastError({ message: 'Vui lòng nhập hoặc chọn mã khuyến mãi' })

    setActiveInput(false)

    try {
      const { promotionCourse } = await checkPromotionCourseCanApplyByCode(
        courseDetail.id,
        value ? value.promotion.code : inputValue,
      )

      if (promotionCourse) {
        setValue(null)
        setInputValue('')
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
    } catch (error) {
      showErrorResponseSaga({ defaultMessage: 'Không thể áp dụng mã giảm giá', error })
      setActiveInput(true)
    }

    return null
  }

  const handleCheckCourseIsOwned = async () => {
    const response = await checkCourseIsOwnedByCourseId(courseDetail.id)

    setIsOwned(response.status)
  }

  const handleGetPromotionCoursesView = async () => {
    const promotionCoursesView = await findPromotionCoursesCanViewByCourseId(courseDetail.id)
    setPromotionCouresView(promotionCoursesView)
  }

  useEffect(() => {
    if (getAccessToken() && getUserRole() === UserRole.CUSTOMER) handleGetPromotionCoursesView()
  }, [courseDetail])

  const handleNavigateChapterLecture = () => {
    navigate(`/course/${courseDetail.id}/chapter-lecture`)
  }

  useEffect(() => {
    if (getAccessToken()) handleCheckCourseIsOwned()
  }, [handleCheckCourseIsOwned])

  return (
    <Card sx={{ width: '100%', position: 'absolute', top: 0, right: 0 }}>
      {/* <div>{`value: ${value !== null ? `'${value.id}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br /> */}
      <Box marginTop="20px" />
      <CardMedia
        sx={{ height: 200 }}
        image={getImage(courseDetail.thumbnailUrl)}
        title="green iguana"
      />

      <CardContent sx={{ padding: '20px', paddingBottom: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {!courseDetail.promotionCourseByStaffId && !promotionCourseApply && ( */}
          {!promotionCourseApply && (
            <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: 32, marginRight: 2 }}>
              ₫{formatCurrency(courseDetail.price)}
            </Typography>
          )}
          {/* {courseDetail.promotionCourseByStaffId && (
            <>
              <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: 32, marginRight: 2 }}>
                ₫{formatCurrency(courseDetail.discountPrice)}
              </Typography>
              <Typography sx={{ color: 'gray', fontSize: 14, textDecorationLine: 'line-through' }}>
                ₫{formatCurrency(courseDetail.price)}
              </Typography>
            </>
          )} */}
          {promotionCourseApply && (
            <>
              <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: 32, marginRight: 2 }}>
                ₫
                {formatCurrency(
                  calcPriceDiscount(
                    courseDetail.price,
                    promotionCourseApply.promotion.discountPercent,
                  ),
                )}
              </Typography>
              <Typography sx={{ color: 'gray', fontSize: 14, textDecorationLine: 'line-through' }}>
                ₫{formatCurrency(courseDetail.price)}
              </Typography>
            </>
          )}
        </Box>

        {isOwned ? (
          <CustomButton onClick={handleNavigateChapterLecture}>Chuyển đến khóa học</CustomButton>
        ) : (
          <CustomButton onClick={handleAddCartItem}>Thêm vào giỏ hàng</CustomButton>
        )}

        {/* <Button
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
          onClick={handleAddCartItem}
        >
          Mua ngay
        </Button> */}

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
            {formatSecondToHour(courseDetail.totalLength)} giờ video theo yêu cầu
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
            Truy cập trên cả di động và máy tính
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

      {!isOwned && getAccessToken() && getUserRole() === UserRole.CUSTOMER && (
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
              // if (!courseDetail.promotionCourseByStaffId) {
              //   setShowInputCoupon(!showInputCoupon)
              //   setCoupon('')
              // } else toastWarn({ message: 'Khóa học đã được giảm giá!' })
              // if (!courseDetail.promotionCourseByStaffId) {
              setShowInputCoupon(!showInputCoupon)
              setValue(null)
              setInputValue('')
              // } else toastWarn({ message: 'Khóa học đã được giảm giá!' })
            }}
          >
            Áp mã giảm giá
          </Button>
          {showInputCoupon && (
            <Grid container>
              <Grid item xs={8}>
                <Autocomplete
                  freeSolo // Cho phép nhập mã giảm giá tự do
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue)
                  }}
                  options={promotionCouresView}
                  getOptionLabel={option =>
                    `Giảm ${option.promotion.discountPercent}% (${
                      option.promotion.amount - option.used
                    } lượt) ${option.isFull ? '- Cuộc thi' : ''}`
                  }
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue as PromotionCourse)
                  }}
                  renderInput={params => (
                    <TextField {...params} placeholder="Chọn hoặc nhập mã giảm giá" size="small" />
                  )}
                  disabled={!activeInput}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  sx={{
                    textTransform: 'capitalize',
                    backgroundColor: '#a78bfa',
                    color: 'white',
                    fontWeight: '600',
                    ':hover': {
                      backgroundColor: '#b4a0ee',
                    },
                    marginLeft: '10px',
                  }}
                  disabled={!activeInput}
                  onClick={handleClickApplyCoupon}
                >
                  Áp dụng
                </Button>
              </Grid>
            </Grid>
          )}
        </CardActions>
      )}
    </Card>
  )
}

export default CourseCartBougthCardView
