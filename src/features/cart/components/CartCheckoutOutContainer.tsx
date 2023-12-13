import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { createOrder } from 'features/orders/api'
import { createPaymentURL } from 'features/payment/api'
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

  const handleCompleteCheckout = async () => {
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
      console.log('INHERE', paymentURL)
      window.location.href = paymentURL
    } catch (error) {
      console.log('[handleCompleteCheckout_in_CartCheckoutContainer]', error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCart()
    getCartPrice()
  }, [fetchCart])

  return (
    <Container maxWidth="lg">
      <TitleTypography title="Thanh toán" />
      <Grid container columns={{ xs: 4, md: 12 }}>
        <Grid item xs={4} md={6} sx={{ paddingRight: '40px' }}>
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: '600' }}>
              Phương thức thanh toán
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={'https://vntravelgroup.vn/wp-content/uploads/2021/02/Group-1234.png'}
                style={{ height: '40px', width: '60px', padding: 0 }}
                imageStyle={{ height: '40px', width: '60px' }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: 'bold', fontSize: '16px', marginLeft: '10px' }}
              >
                VnPay
              </Typography>
            </Box>
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
              {isLoading ? <CircularProgress size="26px" /> : 'Hoàn thành thanh toán'}
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
