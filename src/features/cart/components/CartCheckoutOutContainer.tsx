import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import {
  Box,
  Breadcrumbs,
  Checkbox,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from '@mui/material'
import Image from 'material-ui-image'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { createOrder } from 'features/orders/api'
import { createPaymentURL } from 'features/payment/api'
import { MainColor } from 'libs/const/color'
import CustomButton from 'libs/ui/components/CustomButton'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { toastError } from 'libs/utils/handle-toast'

import { checkCartIsValid, getCartTotalPrice } from '../api'
import { useCartService } from '../hooks'
import { CartTotalPrice } from '../types'

import CartCheckoutOrderDetailCardView from './CartCheckoutOrderDetailCardView'
import TotalPriceCartCardView from './TotalPriceCartCardView'

const CartCheckoutOutContainer = () => {
  const { cart, fetchCart } = useCartService()
  const navigate = useNavigate()
  const [cartPrice, setCartPrice] = useState<CartTotalPrice>({
    totalPrice: 0,
    totalPriceAfterPromotion: 0,
    totalPriceDiscount: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isVNPAYorMomo, setisVNPAYorMomo] = useState(true)

  const handleToggleVNPAYorMomo = () => setisVNPAYorMomo(!isVNPAYorMomo)

  const getCartPrice = async () => {
    const response = await getCartTotalPrice()
    setCartPrice(response)
  }

  const handleCheckCartValid = async () => {
    try {
      const errorsResponse = await checkCartIsValid()
      if (errorsResponse.length === 0) return true

      errorsResponse.forEach(error => {
        toastError({ message: error })
      })
      navigate('/cart')
      return false
    } catch (error) {
      console.log('[error in CartContainer]', error)
      toastError({ message: 'Không thể thanh toán đơn hàng' })
      navigate('/cart')
      return false
    }
  }

  const handleCompleteCheckoutVNPAY = async () => {
    setIsLoading(true)
    if (!(await handleCheckCartValid())) return

    try {
      const order = await createOrder()
      const paymentURL = await createPaymentURL({
        amount: order.totalPriceAfterPromotion,
        language: 'vn',
        message: `Thanh toán cho order ${order.id}`,
        orderId: order.id,
        returnUrl: `${
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001'
            : 'https://vecungtreem.online/'
        }/payment/check`,
      })
      console.log('INHERE BY VNPAY', paymentURL)
      window.location.href = paymentURL
    } catch (error) {
      console.log('[handleCompleteCheckout_in_CartCheckoutContainer]', error)
    }
    setIsLoading(false)
  }

  const handleCompleteCheckoutMoMo = async () => {
    setIsLoading(true)
    if (!(await handleCheckCartValid())) return

    try {
      const order = await createOrder()
      const paymentURL = `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3001'
          : 'https://vecungtreem.online/'
      }/payment/check?paymentBy=MoMo&vnp_Amount=${order.totalPriceAfterPromotion}&vnp_TxnRef=${
        order.id
      }`
      console.log('INHERE BY MOMO', paymentURL)
      window.location.href = paymentURL
    } catch (error) {
      console.log('[handleCompleteCheckout_in_CartCheckoutContainer]', error)
    }
    setIsLoading(false)
  }

  const handleCompleteCheckout = () => {
    if (isVNPAYorMomo) {
      handleCompleteCheckoutVNPAY()
    } else {
      handleCompleteCheckoutMoMo()
    }
  }

  useEffect(() => {
    fetchCart()
    getCartPrice()
  }, [fetchCart])

  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ marginBottom: '10px' }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', color: MainColor.YELLOW_500 }}
          color="inherit"
          href="/cart"
        >
          <KeyboardBackspaceIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Quay trở lại giỏ hàng
        </Link>
      </Breadcrumbs>
      <TitleTypography title="Thanh toán" />
      <Grid container columns={{ xs: 4, md: 12 }}>
        <Grid item xs={4} md={6} sx={{ paddingRight: '40px' }}>
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: '600' }}>
              Phương thức thanh toán
            </Typography>

            <List sx={{ width: '100%', maxWidth: 360 }}>
              <ListItem
                key={1}
                secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  dense
                  onClick={() => {
                    if (!isVNPAYorMomo) handleToggleVNPAYorMomo()
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<RadioButtonCheckedIcon />}
                      checked={isVNPAYorMomo}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <Image
                    src={'https://vntravelgroup.vn/wp-content/uploads/2021/02/Group-1234.png'}
                    style={{ height: '40px', width: '60px', padding: 0 }}
                    imageStyle={{ height: '40px', width: '60px' }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                key={2}
                secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  dense
                  onClick={() => {
                    if (isVNPAYorMomo) handleToggleVNPAYorMomo()
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={!isVNPAYorMomo}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<RadioButtonCheckedIcon />}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <Image
                    src={
                      'https://developers.momo.vn/v3/assets/images/primary-momo-ddd662b09e94d85fac69e24431f87365.png'
                    }
                    style={{ height: '40px', width: '60px', padding: 0 }}
                    imageStyle={{ height: '40px', width: '60px' }}
                  />
                </ListItemButton>
              </ListItem>
              {!isVNPAYorMomo && (
                <>
                  <Image
                    src={`https://backend-loc-exe-99d262cc5568.herokuapp.com/image?path=categories/thumbnails/adf171a1-4119-4822-9ba0-3fff0c282554.jpg`}
                    style={{ height: '125px', width: '120px', padding: 0 }}
                    imageStyle={{ height: '125px', width: '120px', elevation: 5, borderRadius: 3 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      // color: 'GrayText',
                      color: 'red',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      marginTop: '20px',
                      marginBottom: '10px',
                    }}
                  >
                    LƯU Ý: Nếu nền tảng chúng tôi phát hiện bạn chưa chuyển tiền bằng phương thức
                    MoMo, chúng tôi sẽ khóa tài khoản của bạn
                  </Typography>
                </>
              )}
            </List>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: '600' }}>
              Chi tiết đơn hàng
            </Typography>
            {cart?.cartItems.map(cartItem => (
              <CartCheckoutOrderDetailCardView key={cartItem.id} cartItem={cartItem} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={4} md={6} sx={{ paddingLeft: '40px' }}>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            Tổng kết đơn hàng
          </Typography>
          <Box sx={{ width: '60%' }}>
            <TotalPriceCartCardView cartPrice={cartPrice} />
            <Typography
              variant="body2"
              sx={{
                color: 'GrayText',
                textAlign: 'center',
                fontSize: '12px',
                marginTop: '20px',
                marginBottom: '10px',
              }}
            >
              Bằng cách hoàn tất giao dịch mua của bạn, bạn đồng ý với các Điều khoản Dịch vụ này.
            </Typography>
            <CustomButton disable={isLoading} size="large" onClick={handleCompleteCheckout}>
              {isLoading ? (
                <CircularProgress size="26px" />
              ) : (
                `${isVNPAYorMomo ? 'Hoàn thành thanh toán' : 'Đã hoàn thanh toán MoMo'}`
              )}
            </CustomButton>
            <Typography
              variant="body2"
              sx={{ color: 'GrayText', textAlign: 'center', fontSize: '12px', marginTop: '10px' }}
            >
              Đảm bảo 30 ngày hoàn phí
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CartCheckoutOutContainer
