import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TitleTypography from 'libs/ui/components/TitleTypography'
import { getStringDayMonthYear } from 'libs/utils/handle-date'
import { formatCurrency } from 'libs/utils/handle-price'
import { OrderType } from 'types'

import { findOrdersByUser } from '../api'
import { FindOrdersByUserBodyRequest, NameOrderStatus, Order, convertOrderStatus } from '../types'

// import CustomerOrderListEmptyContainer from './CustomerOrderListEmptyContainer'

const Row = (props: { order: Order }) => {
  const { order } = props
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const converOrderStatus = convertOrderStatus(order.orderStatus)
  const convertPrice = formatCurrency(order.totalPriceAfterPromotion)

  const handleNavigateOrderDetailPage = (id: string) => {
    navigate(`/user/order/oder-detail/${id}`)
  }

  return (
    <>
      {order.orderDetails.length > 1 ? (
        <>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              <Box
                sx={{ color: '#146C94', fontWeight: '600', display: 'flex', alignItems: 'center' }}
              >
                <ShoppingCartOutlinedIcon />
                <Typography sx={{ fontWeight: '600', marginLeft: '10px' }}>
                  {order.orderDetails.length} Khóa học đã mua
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="right" sx={{ color: '#6A6F73' }}>
              {getStringDayMonthYear(order.insertedDate)}
            </TableCell>
            <TableCell align="right" sx={{ color: '#373a3d', fontSize: '20px' }}>
              ₫{convertPrice}
            </TableCell>
            <TableCell align="right" sx={{ color: '#6A6F73' }}>
              <Typography fontWeight="bold" fontSize="18px" color={converOrderStatus.color}>
                {converOrderStatus.vietnamse}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                disableElevation
                onClick={() => handleNavigateOrderDetailPage(order.id)}
                sx={{
                  backgroundColor: '#19A7CE',
                  fontWeight: '500',
                  width: '60%',
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: '#146C94',
                  },
                }}
              >
                chi tiết
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0, padding: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                  <Table size="small" aria-label="purchases">
                    {order.orderDetails.map(orderDetail => (
                      <TableRow key={orderDetail.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell sx={{ width: '5%' }} />
                        <TableCell component="th" scope="row" sx={{ width: '30%' }}>
                          <Link
                            sx={{ color: '#146C94', cursor: 'pointer', textDecorationLine: 'none' }}
                            onClick={() => navigate(`/detail-course/${orderDetail.course.id}`)}
                          >
                            {orderDetail.course.title}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ width: '20%' }} />
                        <TableCell sx={{ width: '15%', color: '#373a3d' }} align="right">
                          ₫{formatCurrency(orderDetail.priceAfterPromotion)}
                        </TableCell>
                        <TableCell sx={{ width: '15%' }} />
                        <TableCell sx={{ width: '15%' }} />
                      </TableRow>
                    ))}
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      ) : (
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell />
          <TableCell component="th" scope="row">
            <Box
              sx={{ color: '#146C94', fontWeight: '600', display: 'flex', alignItems: 'center' }}
            >
              <ShoppingCartOutlinedIcon />
              <Link
                sx={{ color: '#146C94', cursor: 'pointer', textDecorationLine: 'none' }}
                onClick={() => navigate(`/detail-course/${order.orderDetails[0].course.id}`)}
              >
                {order.orderDetails[0].course.title}
              </Link>
            </Box>
          </TableCell>
          <TableCell align="right" sx={{ color: '#6A6F73' }}>
            {getStringDayMonthYear(order.insertedDate)}
          </TableCell>
          <TableCell align="right" sx={{ color: '#373a3d', fontSize: '20px' }}>
            ₫{convertPrice}
          </TableCell>
          <TableCell align="right" sx={{ color: '#6A6F73' }}>
            <Typography fontWeight="bold" fontSize="18px" color={converOrderStatus.color}>
              {converOrderStatus.vietnamse}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Button
              variant="contained"
              disableElevation
              onClick={() => handleNavigateOrderDetailPage(order.id)}
              sx={{
                backgroundColor: '#19A7CE',
                fontWeight: '500',
                width: '60%',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: '#146C94',
                },
              }}
            >
              chi tiết
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

const CustomerOrderListContainer = () => {
  const [listOrders, setListOrders] = useState<Order[]>([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [orderType, setOrderType] = useState<OrderType>(OrderType.DESC)
  const [orderStatus, setOrderStatus] = useState<NameOrderStatus | undefined>(undefined)

  const getListOrders = async () => {
    const bodyRequest: FindOrdersByUserBodyRequest = {
      pageOptions: {
        order: orderType,
        page,
        take: 6,
      },
      orderStatus,
    }

    const responses = await findOrdersByUser(bodyRequest)
    setListOrders(responses.data)
    setPageCount(responses.meta.pageCount)
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setOrderStatus(event.target.value as NameOrderStatus)
    setPage(1)
  }

  const handleChangeOrderType = (event: SelectChangeEvent) => {
    setOrderType(event.target.value as OrderType)
    setPage(1)
  }

  useEffect(() => {
    getListOrders()
  }, [page, orderStatus, orderType])

  return (
    <Container>
      <TitleTypography title="Lịch sử đơn hàng" />
      <Grid container marginBottom="20px">
        <Grid item xs={2}>
          <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
            <InputLabel id="label-order-status">Trạng thái đơn hàng</InputLabel>
            <Select
              labelId="label-order-status"
              id="select-order-status"
              onChange={handleChangeStatus}
              label="order-status"
              value={orderStatus}
            >
              <MenuItem value={undefined}>{'Tất cả'}</MenuItem>
              {Object.values(NameOrderStatus).map(currOrderStatus => {
                const statusInfor = convertOrderStatus(currOrderStatus)
                return (
                  <MenuItem key={currOrderStatus} value={currOrderStatus}>
                    {statusInfor.vietnamse}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} marginLeft="14px">
          <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
            <InputLabel id="label-order">Sắp xếp</InputLabel>
            <Select
              labelId="label-order"
              id="select-order"
              onChange={handleChangeOrderType}
              label="order"
              value={orderType}
            >
              <MenuItem value={OrderType.DESC}>{'Mới nhất'}</MenuItem>
              <MenuItem value={OrderType.ASC}>{'Cũ nhất'}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* {listOrders.length === 0 && <CustomerOrderListEmptyContainer />} */}
      {listOrders.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '5%' }} />
                  <TableCell sx={{ width: '30%' }} />
                  <TableCell
                    sx={{ width: '20%', color: 'gray', fontSize: '16px', fontWeight: '600' }}
                    align="right"
                  >
                    Ngày
                  </TableCell>
                  <TableCell
                    sx={{ width: '15%', color: 'gray', fontSize: '16px', fontWeight: '600' }}
                    align="right"
                  >
                    Tổng tiền
                  </TableCell>
                  <TableCell
                    sx={{ width: '15%', color: 'gray', fontSize: '16px', fontWeight: '600' }}
                    align="right"
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    sx={{ width: '15%', color: 'gray', fontSize: '16px', fontWeight: '600' }}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrders.map(order => (
                  <Row key={order.id} order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {pageCount > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '40px' }}>
              <Stack spacing={2}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handleChange}
                  color="secondary"
                />
              </Stack>
            </Box>
          )}
        </>
      )}
    </Container>
  )
}

export default CustomerOrderListContainer
