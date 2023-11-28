import { Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'
import { useNavigate } from 'react-router-dom'

import { getImage } from 'features/image/components/apis'
import { formatCurrency } from 'libs/utils/handle-price'

import { CartItem } from '../types'

interface Props {
  cartItem: CartItem
}

const CartCheckoutOrderDetailCardView = ({ cartItem }: Props) => {
  const navigate = useNavigate()

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      marginBottom="20px"
      onClick={() => navigate(`/detail-course/${cartItem.course.id}`)}
      sx={{
        cursor: 'pointer',
      }}
    >
      <Grid item md={2}>
        <Image
          src={getImage(cartItem.course.thumbnailUrl)}
          style={{ height: '50px', width: '80px', padding: 0 }}
          imageStyle={{ height: '50px', width: '80px' }}
        />
      </Grid>
      <Grid item md={8}>
        <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '12px' }}>
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
                  (cartItem.course.price * cartItem.promotionCourse.promotion.discountPercent) /
                    100,
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
}

export default CartCheckoutOrderDetailCardView
