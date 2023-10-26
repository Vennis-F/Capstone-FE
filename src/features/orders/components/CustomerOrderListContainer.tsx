import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Button, Container, Link } from '@mui/material'
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

import { findOrdersByUser } from '../api'
import { Order } from '../types'

import CustomerOrderListEmptyContainer from './CustomerOrderListEmptyContainer'

const Row = (props: { order: Order }) => {
  const { order } = props
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

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
              {order.insertedDate}
            </TableCell>
            <TableCell align="right" sx={{ color: '#6A6F73' }}>
              ₫{order.totalPriceAfterPromotion}
            </TableCell>
            <TableCell align="right" sx={{ color: '#6A6F73' }}>
              {order.orderStatus.statusName}
            </TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                disableElevation
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
                            onClick={() =>
                              navigate('/detail-course', { state: { id: orderDetail.course.id } })
                            }
                          >
                            {orderDetail.course.title}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ width: '20%' }} />
                        <TableCell sx={{ width: '15%', color: '#6A6F73' }} align="right">
                          ₫{orderDetail.priceAfterPromotion}
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
                onClick={() =>
                  navigate('/detail-course', { state: { id: order.orderDetails[0].id } })
                }
              >
                {order.orderDetails[0].course.title}
              </Link>
            </Box>
          </TableCell>
          <TableCell align="right" sx={{ color: '#6A6F73' }}>
            {order.insertedDate}
          </TableCell>
          <TableCell align="right" sx={{ color: '#6A6F73' }}>
            ₫{order.totalPriceAfterPromotion}
          </TableCell>
          <TableCell align="right" sx={{ color: '#6A6F73' }}>
            {order.orderStatus.statusName}
          </TableCell>
          <TableCell align="right">
            <Button
              variant="contained"
              disableElevation
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

  const getListOrders = async () => {
    const orders = await findOrdersByUser()
    setListOrders(orders)
  }

  useEffect(() => {
    getListOrders()
  }, [])

  return (
    <Container>
      <TitleTypography title="Lịch sử đơn hàng" />
      {listOrders.length === 0 && <CustomerOrderListEmptyContainer />}
      {listOrders.length > 0 && (
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
      )}
    </Container>
  )
}

export default CustomerOrderListContainer
