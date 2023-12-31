import { Grid, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import Image from 'material-ui-image'
import React from 'react'

import { CustomerDrawing } from 'features/customer-drawing/types'
import { getImage } from 'features/image/components/apis'
import { getStringDayMonthYear } from 'libs/utils/handle-date'

type Props = {
  customerDrawing: CustomerDrawing
}

const LearnerDrawingCardView = ({ customerDrawing }: Props) => {
  console.log(123)
  return (
    <Grid container spacing={0} style={{ marginBottom: 50 }}>
      <Grid item xs={6}>
        <Image
          src={getImage(customerDrawing.imageUrl)}
          style={{ height: '125px', width: '120px', padding: 0 }}
          imageStyle={{ height: '125px', width: '120px', elevation: 5, borderRadius: 3 }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography style={{ fontSize: 15, fontWeight: '500' }}>{customerDrawing.title}</Typography>
        <Divider style={{ marginTop: 8, marginBottom: 8 }} />
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 10, color: '#666666' }}>Ngày đăng:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 10 }}>
              {getStringDayMonthYear(customerDrawing.insertedDate)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 10, color: '#666666' }}>Số lượng bình chọn:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 10 }}>{customerDrawing.totalVotes}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LearnerDrawingCardView
