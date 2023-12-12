// import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp'
import { Box, Container, Typography } from '@mui/material'
import Image from 'material-ui-image'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { MainColor } from 'libs/const/color'
import CustomButton from 'libs/ui/components/CustomButton'

const CartEmptyContainer = () => {
  const navigate = useNavigate()

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {/* <ShoppingBasketSharpIcon sx={{ fontSize: '300px !important', color: MainColor.GRAY_300 }} /> */}
      <Image
        src={"https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png"}
        style={{ height: '250px', width: '250px', padding: 0, backgroundColor: "F0F2F5", marginBottom: '20px', }}
        imageStyle={{
          height: '250px',
          width: '250px',
          marginBottom: '20px',
          backgroundColor: "F0F2F5",

        }} />
      <Typography variant="h6" style={{ fontWeight: "bold", color: "rgba(0,0,0,.4)" }}>Giỏ hàng của bạn đang trống, hãy đi mua sắm nào!</Typography>
      <Box sx={{ width: '150px', marginTop: '20px' }}>
        <CustomButton onClick={() => navigate('/')} sxCustom={{ fontSize: "18px", fontWeight: "400" }}>Mua NGAY</CustomButton>
      </Box>
    </Container>
  )
}

export default CartEmptyContainer
