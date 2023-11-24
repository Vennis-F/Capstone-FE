import DeleteIcon from '@mui/icons-material/Delete'
import {
  Container,
  Typography,
  Box,
  Stack,
  Button,
  //   Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { toastError } from 'libs/utils/handle-toast'

import { checkCartIsValid, getCartTotalPrice } from '../api'
import { useCartService } from '../hooks'
import { CartTotalPrice } from '../types'

import CartEmptyContainer from './CartEmptyContainer'
import CartItemCardView from './CartItemCardView'
import TotalPriceCartCardView from './TotalPriceCartCardView'

export const CartContainer = () => {
  const [cartPrice, setCartPrice] = useState<CartTotalPrice>({
    totalPrice: 0,
    totalPriceAfterPromotion: 0,
    totalPriceDiscount: 0,
  })
  const [openModalDeleteAll, setOpenModalDeleteAll] = useState(false)
  const navigate = useNavigate()
  const { cart, fetchCart, deleteAllCartItems } = useCartService()

  // Handle
  const handleOpenModalDeleteAll = () => {
    setOpenModalDeleteAll(true)
  }
  const handleCloseDeleteAll = () => {
    setOpenModalDeleteAll(false)
  }
  const handleDeleteAll = () => {
    handleCloseDeleteAll()
    deleteAllCartItems()
  }
  const getCartPrice = async () => {
    const response = await getCartTotalPrice()
    setCartPrice(response)
  }
  const handleCheckout = async () => {
    try {
      const errorsResponse = await checkCartIsValid()
      if (errorsResponse.length === 0) {
        // navigate toi trang thanh toan
        navigate('/cart/checkout')
      } else {
        fetchCart()
        errorsResponse.forEach(error => {
          toastError({ message: error })
        })
      }
    } catch (error) {
      console.log('[error in CartContainer]', error)
      toastError({ message: 'Không thể thanh toán đơn hàng' })
    }
  }

  useEffect(() => {
    fetchCart()
    getCartPrice()
  }, [cart?.cartItems.length])

  return (
    <Container maxWidth="lg">
      <TitleTypography title="Giỏ hàng" />

      {cart?.cartItems?.length ? (
        <>
          <Box sx={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
            <Typography variant="h5" sx={{ flex: 5, fontWeight: '600', fontSize: '14px' }}>
              {cart ? cart?.cartItems.length : 0} Khóa học trong giỏ hàng
            </Typography>
            <Box sx={{ flex: 2, textAlign: 'right' }}>
              {cart?.cartItems.length > 1 && (
                <Button sx={{ color: 'red' }} onClick={handleOpenModalDeleteAll}>
                  Xóa toàn bộ
                  <DeleteIcon />
                </Button>
              )}
            </Box>
            <Box sx={{ flex: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: '600',
                  fontSize: '20px',
                  paddingLeft: '20px',
                  textAlign: 'center',
                }}
              >
                Tổng kết
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 7 }}>
              <Box>
                <Stack spacing={2}>
                  {cart?.cartItems.map(cartItem => (
                    <CartItemCardView key={cartItem.id} cartItem={cartItem} />
                  ))}
                </Stack>
              </Box>
            </Box>
            <Box sx={{ flex: 3 }}>
              <Box sx={{ paddingLeft: '20px' }}>
                <TotalPriceCartCardView cartPrice={cartPrice} />
                <CustomButton onClick={handleCheckout}>Thanh toán</CustomButton>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <CartEmptyContainer />
      )}

      <DialogBinaryQuestion
        titleText="Xóa tất cả"
        contentText="Bạn có muốn xóa tất cả không?"
        open={openModalDeleteAll}
        clickCloseModal={handleCloseDeleteAll}
        clickAcceptAction={handleDeleteAll}
      />
    </Container>
  )
}
