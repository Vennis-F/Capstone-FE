import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {
  titleLeft: string
  titleRight: string | null
}

const EqualTitle = (props: Props) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Typography sx={{ width: '40%', color: 'GrayText' }}>{props.titleLeft}</Typography>
    <Typography sx={{ width: '60%', textAlign: 'right', fontWeight: '600' }}>
      {props.titleRight}
    </Typography>
  </Box>
)

export default EqualTitle
