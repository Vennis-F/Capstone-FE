import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

// import CustomButton from 'libs/ui/components/CustomButton'

import { formatCurrency } from '../../../libs/utils/handle-price'
import { CartTotalPrice } from '../types'

type Props = {
  cartPrice: CartTotalPrice
}

const TotalPriceCartCardView = ({ cartPrice }: Props) => (
  <>
    <Box sx={{ display: 'flex', marginBottom: '10px' }}>
      <Typography sx={{ flex: 1 }}>Giá gốc:</Typography>
      <Typography sx={{ flex: 1, textAlign: 'right' }}>
        ₫{formatCurrency(cartPrice.totalPrice)}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', marginBottom: '10px' }}>
      <Typography sx={{ flex: 1 }}>Tổng số tiền giảm:</Typography>
      <Typography sx={{ flex: 1, textAlign: 'right' }}>
        -₫{formatCurrency(cartPrice.totalPriceDiscount)}
      </Typography>
    </Box>
    <Divider sx={{ marginBottom: '10px' }} />
    <Box sx={{ display: 'flex', marginBottom: '10px' }}>
      <Typography sx={{ flex: 1, fontWeight: '600' }}>Tổng:</Typography>
      <Typography
        sx={{
          flex: 1,
          textAlign: 'right',
          color: '#eab308',
          fontWeight: '600',
          fontSize: '22px',
        }}
      >
        ₫{formatCurrency(cartPrice.totalPriceAfterPromotion)}
      </Typography>
    </Box>
  </>
)

export default TotalPriceCartCardView
