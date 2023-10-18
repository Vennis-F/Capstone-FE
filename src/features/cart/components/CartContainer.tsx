import DeleteIcon from '@mui/icons-material/Delete'
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp'
import {
  Container,
  Typography,
  Box,
  Stack,
  Divider,
  Button,
  //   Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'

import { getCartTotalPrice } from '../api'
import { useCartService } from '../hooks'
import { CartTotalPrice } from '../types'

import CartItemCardView from './CartItemCardView'

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

  useEffect(() => {
    fetchCart()
    getCartPrice()
  }, [cart?.cartItems.length])

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: '600' }}>
        Giỏ hàng
      </Typography>

      {cart?.cartItems?.length ? (
        <>
          <Box sx={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
            <Typography variant="h5" sx={{ flex: 5, fontWeight: '600', fontSize: '14px' }}>
              {cart ? cart?.cartItems.length : 0} Khóa học trong giỏ hàng
            </Typography>
            <Box sx={{ flex: 2, textAlign: 'right' }}>
              {cart?.cartItems.length !== 0 && (
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
              <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                  {cart?.cartItems.map(cartItem => (
                    <CartItemCardView key={cartItem.id} cartItem={cartItem} />
                  ))}
                </Stack>
              </Box>
            </Box>
            <Box sx={{ flex: 3 }}>
              <Box sx={{ paddingLeft: '20px' }}>
                <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                  <Typography sx={{ flex: 1 }}>Giá gốc:</Typography>
                  <Typography sx={{ flex: 1, textAlign: 'right' }}>
                    ₫{cartPrice.totalPrice}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                  <Typography sx={{ flex: 1 }}>Tổng số tiền giảm:</Typography>
                  <Typography sx={{ flex: 1, textAlign: 'right' }}>
                    -₫{cartPrice.totalPriceDiscount}
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
                    ₫{cartPrice.totalPriceAfterPromotion}
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
        </>
      ) : (
        <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <ShoppingBasketSharpIcon sx={{ fontSize: '300px !important', color: '#B0DAFF' }} />
          <Typography variant="h6">Giỏ hàng của bạn đang trống, hãy đi mua sắm nào</Typography>
          <Box sx={{ width: '150px', marginTop: '20px' }}>
            <CustomButton onClick={() => navigate('/')}>Mua sắm</CustomButton>
          </Box>
        </Container>
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
