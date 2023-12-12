import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import Image from 'material-ui-image'
import React, { useEffect, useState } from 'react'

import { getCustomerDrawingsByContest } from 'features/customer-drawing/api'
import { CustomerDrawing, CustomerDrawingSortField } from 'features/customer-drawing/types'
import { getImage } from 'features/image/components/apis'
import { MainColor } from 'libs/const/color';
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { OrderType } from 'types'

import { createVoteCustomerDrawing } from '../api'
import { Contest } from '../types'

type Props = {
  contest: Contest
}

const ContestPaint = ({ contest }: Props) => {
  const [customerDrawings, setCustomerDrawings] = useState<CustomerDrawing[]>([])
  const [loading, setLoading] = useState(false)
  const [currCustomerDrawing, setCurrCustomerDrawing] = useState<CustomerDrawing | null>(null)

  const fetchCustomerDrawings = async () => {
    try {
      const res = await getCustomerDrawingsByContest(contest.id, {
        customerDrawingSortField: CustomerDrawingSortField.VOTE,
        pageOptions: {
          order: OrderType.DESC,
          page: 1,
          take: 1000,
        },
      })
      setCustomerDrawings(res.data)
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
                <Typography style={{ fontSize: 14, fontWeight: 'bold', color: 'inherit' }}>
                  Số lượng vote: {customerDrawing.totalVotes}
                </Typography>
                {!customerDrawing.isOwned && !customerDrawing.isVoted && (
                  <Button
                    onClick={() => {
                      setCurrCustomerDrawing(customerDrawing)
                    }}
                  >
                    <FavoriteIcon sx={{ mr: 0.5, color: MainColor.RED_450 }} fontSize="large" />
                  </Button>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
        {currCustomerDrawing && (
          <DialogBinaryQuestion
            clickAcceptAction={async () => {
              setLoading(true)
              try {
                await createVoteCustomerDrawing(currCustomerDrawing.id)
                toastSuccess({ message: 'Vote bài vẽ thành công' })
                setCurrCustomerDrawing(null)
                fetchCustomerDrawings()
              } catch (error) {
                showErrorResponseSaga({ error, defaultMessage: 'Không thể vote cho bài vẽ này được' })
              }
              setLoading(false)
            }}
            clickCloseModal={() => setCurrCustomerDrawing(null)}
            titleText="Vote bài vẽ"
            open={Boolean(currCustomerDrawing)}
            contentText="Bạn có chắc muốn vote cho bài vẽ này không?"
            isLoading={loading}
          />
        )}
      </Paper>
    </Container>
  )
}
export default ContestPaint
