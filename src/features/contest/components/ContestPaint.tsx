/* eslint-disable @typescript-eslint/indent */
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import Image from 'material-ui-image'
import React, { useEffect, useState } from 'react'

import { getCustomerDrawingsByContest } from 'features/customer-drawing/api'
import { CustomerDrawing, CustomerDrawingSortField } from 'features/customer-drawing/types'
import { getImage } from 'features/image/components/apis'
import { MainColor } from 'libs/const/color'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getUserRoleOrNull } from 'libs/utils/handle-token'
import { OrderType, UserRole } from 'types'

import { getCustomerDrawingsByContestForGuest } from '../../customer-drawing/api/index'
import { createVoteCustomerDrawing } from '../api'
import { Contest, CustomerDrawingSortOptions } from '../types'

type Props = {
  contest: Contest
}

const ContestPaint = ({ contest }: Props) => {
  const [customerDrawings, setCustomerDrawings] = useState<CustomerDrawing[]>([])
  const [loading, setLoading] = useState(false)
  const [currCustomerDrawing, setCurrCustomerDrawing] = useState<CustomerDrawing | null>(null)
  const [sortOptions, setSortOptions] = useState<CustomerDrawingSortOptions>(
    CustomerDrawingSortOptions.UPDATED_DATE_DESC,
  )
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const fetchCustomerDrawings = async () => {
    const userRole = getUserRoleOrNull()
    let currfield = CustomerDrawingSortField.UPDATED_DATE
    let currOrder = OrderType.DESC

    switch (sortOptions) {
      case CustomerDrawingSortOptions.UPDATED_DATE_ASC:
        currfield = CustomerDrawingSortField.UPDATED_DATE
        currOrder = OrderType.ASC
        break
      case CustomerDrawingSortOptions.UPDATED_DATE_DESC:
        currfield = CustomerDrawingSortField.UPDATED_DATE
        currOrder = OrderType.DESC
        break
      case CustomerDrawingSortOptions.VOTE_ASC:
        currfield = CustomerDrawingSortField.VOTE
        currOrder = OrderType.ASC
        break
      case CustomerDrawingSortOptions.VOTE_DESC:
        currfield = CustomerDrawingSortField.VOTE
        currOrder = OrderType.DESC
        break

      default:
        break
    }

    try {
      if (userRole && (userRole === UserRole.CUSTOMER || userRole === UserRole.LEARNER)) {
        const res = await getCustomerDrawingsByContest(contest.id, {
          customerDrawingSortField: currfield,
          pageOptions: {
            order: currOrder,
            page,
            take: 6,
          },
        })
        setCustomerDrawings(res.data)
        setPageCount(res.meta.pageCount)
      } else {
        const res = await getCustomerDrawingsByContestForGuest(contest.id, {
          customerDrawingSortField: currfield,
          pageOptions: {
            order: currOrder,
            page,
            take: 6,
          },
        })
        setCustomerDrawings(res.data)
        setPageCount(res.meta.pageCount)
      }
    } catch (error) {
      console.error('Error fetching customer drawings:', error)
    }
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleChangeOrderType = (event: SelectChangeEvent) => {
    setSortOptions(event.target.value as CustomerDrawingSortOptions)
    setPage(1)
  }

  useEffect(() => {
    fetchCustomerDrawings()
  }, [contest.id, page, sortOptions])

  return (
    <Container maxWidth="lg" style={{ paddingTop: 10, height: '100vh' }}>
      {customerDrawings.length > 0 && (
        <FormControl fullWidth sx={{ backgroundColor: 'white', width: '250px' }}>
          <InputLabel id="label-order">Sắp xếp</InputLabel>
          <Select
            labelId="label-order"
            id="select-order"
            onChange={handleChangeOrderType}
            label="order"
            value={sortOptions}
          >
            <MenuItem value={CustomerDrawingSortOptions.UPDATED_DATE_DESC}>
              {'Bài vẽ mới nhất'}
            </MenuItem>
            <MenuItem value={CustomerDrawingSortOptions.UPDATED_DATE_ASC}>
              {'Bài vẽ cũ nhất'}
            </MenuItem>
            <MenuItem value={CustomerDrawingSortOptions.VOTE_ASC}>
              {'Lượt bình chọn thấp nhất'}
            </MenuItem>
            <MenuItem value={CustomerDrawingSortOptions.VOTE_DESC}>
              {'Lượt bình chọn cao nhất '}
            </MenuItem>
          </Select>
        </FormControl>
      )}

      <Box sx={{ paddingTop: 2, paddingBottom: 2, marginTop: '20px' }}>
        <Grid container spacing={5}>
          {customerDrawings.length > 0 &&
            customerDrawings.map(customerDrawing => (
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
                  <Typography style={{ fontSize: 14, fontWeight: 'bold', color: 'inherit' }}>
                    Số lượng vote: {customerDrawing.totalVotes}
                  </Typography>
                  {getUserRoleOrNull() &&
                    getUserRoleOrNull() === UserRole.CUSTOMER &&
                    !customerDrawing.isOwned &&
                    !customerDrawing.isVoted && (
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

          {customerDrawings.length <= 0 && (
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
                Hiện chưa có bài vẽ nào
              </Typography>
            </Container>
          )}
        </Grid>

        {currCustomerDrawing && (
          <DialogBinaryQuestion
            clickAcceptAction={async () => {
              setLoading(true)
              try {
                await createVoteCustomerDrawing(currCustomerDrawing.id)
                toastSuccess({ message: 'Bình chọn bài vẽ thành công' })
                setCurrCustomerDrawing(null)
                fetchCustomerDrawings()
              } catch (error) {
                showErrorResponseSaga({
                  error,
                  defaultMessage: 'Bình chọn bài vẽ không thành công',
                })
              }
              setLoading(false)
            }}
            clickCloseModal={() => setCurrCustomerDrawing(null)}
            titleText="Bình chọn bài vẽ"
            open={Boolean(currCustomerDrawing)}
            contentText="Bạn có chắc muốn bình chọn cho bài vẽ này không?"
            isLoading={loading}
          />
        )}
      </Box>

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '40px' }}>
          <Stack spacing={2}>
            <Pagination count={pageCount} page={page} onChange={handleChange} color="secondary" />
          </Stack>
        </Box>
      )}
    </Container>
  )
}
export default ContestPaint
