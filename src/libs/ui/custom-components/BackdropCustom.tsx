import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

type Props = {
  open: boolean
}

const BackdropCustom = ({ open }: Props) => (
  <Backdrop sx={{ color: '#fff', zIndex: 10 }} open={open}>
    {/* <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open}> */}
    <CircularProgress color="inherit" />
  </Backdrop>
)

export default BackdropCustom
