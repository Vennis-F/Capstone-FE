import { Box, Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'
import React from 'react'

import { getImage } from 'features/image/components/apis'

import { ViewWinner } from '../types'

type Props = {
  winner: ViewWinner
}

const WinnerCardView = ({ winner }: Props) => {
  console.log(123)
  return (
    <Grid container spacing={0} key={winner.id}>
      <Grid item xs={4}>
        <Box
          sx={{
            width: '40%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100px',
            border: '2px solid #ccc',
            marginLeft: 10,
            paddingBottom: 1,
            paddingTop: 1,
          }}
        >
          <Typography style={{ fontWeight: 'bold', fontSize: 30 }}>{winner.position}</Typography>
          {/* <Image
            src={getImage(winner.imageUrl)}
            style={{ height: '50px', width: '50px', padding: 0 }}
            imageStyle={{
              height: '50px',
              width: '50px',
              borderRadius: 40,
              marginLeft: 15,
            }}
          /> */}
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ color: '#333' }}>
          <Typography style={{ fontWeight: 'bold', fontSize: 15 }}>{winner.winnerName}</Typography>
          {/* <Typography style={{ fontSize: 15 }}>{winner.} lượt bình chọn</Typography> */}
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Image
          src={getImage(winner.imageUrl)}
          style={{ height: '70px', width: '120px', padding: 0 }}
          imageStyle={{ height: '70px', width: '120px', borderRadius: 10 }}
        />
      </Grid>
    </Grid>
  )
}

export default WinnerCardView
