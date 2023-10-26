import FeedIcon from '@mui/icons-material/Feed'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MainColor } from 'libs/const/color'
import CustomButton from 'libs/ui/components/CustomButton'

const CustomerOrderListEmptyContainer = () => {
  const navigate = useNavigate()

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <FeedIcon sx={{ fontSize: '300px !important', color: MainColor.GRAY_300 }} />
      <Typography variant="h6">Bạn chưa có đơn hàng nào, hãy đi mua sắm nào!</Typography>
      <Box sx={{ width: '150px', marginTop: '20px' }}>
        <CustomButton onClick={() => navigate('/')}>Mua sắm</CustomButton>
      </Box>
    </Container>
  )
}

export default CustomerOrderListEmptyContainer
