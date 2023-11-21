import { Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'

import { formatCurrency } from 'libs/utils/handle-price'

import { CartItem } from '../types'

interface Props {
  cartItem: CartItem
}

const CartCheckoutOrderDetailCardView = ({ cartItem }: Props) => (
  <Grid container spacing={2} alignItems="center">
    <Grid item md={1}>
      <Image
        src={'https://img-c.udemycdn.com/course/100x100/5152322_9a81_3.jpg'}
        style={{ height: '40px', width: '40px', padding: 0 }}
        imageStyle={{ height: '40px', width: '40px' }}
      />
    </Grid>
    <Grid item md={9}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 'bold', fontSize: '12px', marginLeft: '10px' }}
      >
        {cartItem.course.title}
      </Typography>
    </Grid>
    <Grid item md={2} sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
      {/* eslint-disable @typescript-eslint/indent */}
      <Typography
        variant="caption"
        sx={{ fontWeight: 'bold', fontSize: '16px', marginLeft: '10px' }}
      >
        ₫
        {cartItem.promotionCourse
          ? formatCurrency(
              cartItem.course.price -
                (cartItem.course.price * cartItem.promotionCourse.promotion.discountPercent) / 100,
            )
          : formatCurrency(cartItem.course.price)}
      </Typography>
      {cartItem.promotionCourse && (
        <Typography
          variant="caption"
          sx={{
            // fontWeight: 'bold',
            fontSize: '12px',
            marginLeft: '10px',
            textDecoration: 'line-through',
          }}
        >
          ₫{formatCurrency(cartItem.course.price)}
        </Typography>
      )}
    </Grid>
  </Grid>
)

export default CartCheckoutOrderDetailCardView
