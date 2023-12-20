import { Grid, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import Image from 'material-ui-image'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { getImage } from 'features/image/components/apis'
import { getStringDayMonthYear } from 'libs/utils/handle-date'

import { Contest } from '../types'

type Props = {
  contest: Contest
}

const ContestCardView = ({ contest }: Props) => {
  console.log(123)
  const navigate = useNavigate()
  return (
    <Grid
      container
      spacing={0}
      style={{ marginBottom: 50, cursor: 'pointer' }}
      onClick={() => navigate(`/contest/detail/${contest.id}`)}
    >
      <Grid item xs={6}>
        <Image
          src={getImage(contest.thumbnailUrl)}
          style={{ height: '125px', width: '120px', padding: 0 }}
          imageStyle={{ height: '125px', width: '120px', elevation: 5, borderRadius: 3 }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography style={{ fontSize: 15, fontWeight: '500' }}>{contest.title}</Typography>
        <Divider style={{ marginTop: 8, marginBottom: 8 }} />
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 10, color: '#666666' }}>Bắt đầu:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 10 }}>
              {getStringDayMonthYear(contest.startedDate)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 10, color: '#666666' }}>Kết thúc:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 10 }}>
              {getStringDayMonthYear(contest.expiredDate)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ContestCardView
