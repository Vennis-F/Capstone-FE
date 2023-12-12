import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import Image from 'material-ui-image'
import { useEffect, useState } from 'react'

import { getCustomerDrawingsInContestByCustomer } from 'features/customer-drawing/api'
import { getImage } from 'features/image/components/apis'

import { CustomerDrawingNotFilter } from '../../customer-drawing/types/index'
import { Contest } from '../types'

type Props = {
  contest: Contest
}

const ContestCustomerPaints = ({ contest }: Props) => {
  const [customerDrawings, setCustomerDrawings] = useState<CustomerDrawingNotFilter[]>([])

  const fetchCustomerDrawings = async () => {
    try {
      const res = await getCustomerDrawingsInContestByCustomer(contest.id)
      setCustomerDrawings(res)
    } catch (error) {
      console.error('Error fetching customer drawings:', error)
    }
  }

  useEffect(() => {
    fetchCustomerDrawings()
  }, [contest.id])

  return (
    <Container maxWidth="lg" style={{ paddingTop: 10, height: "100vh" }}>
      <Paper elevation={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>

        <Grid container spacing={5} >
          {customerDrawings.map(customerDrawing => (
            <Grid item xs={3} key={customerDrawing.id} sx={{ marginLeft: "10px" }}>
              <Image
                src={getImage(customerDrawing.imageUrl)}
                style={{ height: '220px', width: '250px', padding: 0 }}
                imageStyle={{ height: '220px', width: '250px' }}
              />
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <Typography style={{ fontSize: 14, fontWeight: 'bold', color: 'inherit' }}>
                  {customerDrawing.title}
                </Typography>
                <Typography style={{ color: '#666666', fontSize: 12 }}>
                  Trạng thái: {customerDrawing.status}
                </Typography>
                <Typography style={{ color: '#666666', fontSize: 12 }}>
                  Số lượng bình chọn: {customerDrawing.votes.length}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>


    </Container>
  )
}
export default ContestCustomerPaints
