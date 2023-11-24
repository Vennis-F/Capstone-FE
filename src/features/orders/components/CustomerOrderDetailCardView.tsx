import { Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'
import React from 'react'

import { formatCurrency } from 'libs/utils/handle-price'

import { OrderDetail } from '../types'

type Props = {
  orderDetail: OrderDetail
}

const CustomerOrderDetailCardView = ({ orderDetail }: Props) => {
  console.log(orderDetail)

  return (
    <Grid container alignItems="center" key={orderDetail.id} sx={{ marginTop: '15px' }}>
      <Grid item md={1}>
        <Image
          src={'https://img-c.udemycdn.com/course/100x100/5152322_9a81_3.jpg'}
          style={{ height: '80px', width: '130px', padding: 0 }}
          imageStyle={{ height: '80px', width: '130px' }}
        />
      </Grid>
      <Grid item md={9} padding={0}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 'bold', fontSize: '18px', marginLeft: '80px' }}
        >
          {orderDetail.course.title}
        </Typography>
      </Grid>
      <Grid item md={2} sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 'bold', fontSize: '16px', marginLeft: '10px' }}
        >
          ₫{formatCurrency(orderDetail.priceAfterPromotion)}
        </Typography>
        {orderDetail.promotionCourse && (
          <Typography
            variant="caption"
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              marginLeft: '10px',
              textDecoration: 'line-through',
            }}
          >
            ₫{formatCurrency(orderDetail.price)}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default CustomerOrderDetailCardView
