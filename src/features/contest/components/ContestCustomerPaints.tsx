/* eslint-disable @typescript-eslint/indent */
import { Box, Container, Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'
import { useEffect, useState } from 'react'

import { getCustomerDrawingsInContestByCustomer } from 'features/customer-drawing/api'
import { getImage } from 'features/image/components/apis'
import { getUserRoleOrNull } from 'libs/utils/handle-token'
import { UserRole } from 'types'

import {
  CustomerDrawingNotFilter,
  convertCustomerDrawingStatus,
  CustomerDrawingStatus,
} from '../../customer-drawing/types/index'
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
    <Container maxWidth="lg" style={{ paddingTop: 10, height: '100vh' }}>
      <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
        {getUserRoleOrNull() &&
        (getUserRoleOrNull() === UserRole.CUSTOMER || getUserRoleOrNull() === UserRole.LEARNER) ? (
          <Grid container spacing={5}>
            {customerDrawings.map(customerDrawing => (
              <Grid item xs={3} key={customerDrawing.id} sx={{ marginLeft: '10px' }}>
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
                  <Typography
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: convertCustomerDrawingStatus(
                        customerDrawing.status as CustomerDrawingStatus,
                      ).color,
                    }}
                  >
                    Trạng thái:{' '}
                    {
                      convertCustomerDrawingStatus(customerDrawing.status as CustomerDrawingStatus)
                        .vietnamse
                    }
                  </Typography>
                  <Typography style={{ color: '#666666', fontSize: 12 }}>
                    Số lượng bình chọn: {customerDrawing.votes.length}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Image
              src={
                'https://3.bp.blogspot.com/-iQbj739PtnM/WaOsHL57OWI/AAAAAAAAAEo/P1Tr5Km8FKA-znjaKXKj1KsP6w2yVedYQCLcBGAs/s1600/Painting%2BCanvas.jpg'
              }
              style={{
                height: '250px',
                width: '250px',
                padding: 0,
                marginBottom: '20px',
              }}
              imageStyle={{
                height: '250px',
                width: '250px',
                marginBottom: '20px',
              }}
            />
            <Typography variant="h6" style={{ fontWeight: 'bold', color: 'rgba(0,0,0,.4)' }}>
              Chỉ khi bạn đăng nhập với tài khoản khách hàng hoặc người học thì mới được phép xem
            </Typography>
          </Container>
        )}
      </Box>
    </Container>
  )
}
export default ContestCustomerPaints
