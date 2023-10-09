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
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

const orders = [
  {
    id: '1',
    totalPriceAfterPromotion: '300000',
    purchasedDate: 'Oct 6, 2023',
    orderDetail: [
      {
        id: 'o1',
        priceAfterPromotion: '19000',
        course: { id: 'c1', title: 'JavaScript Algorithms and Data Structures Masterclass' },
      },
      {
        id: 'o2',
        priceAfterPromotion: '1000',
        course: { id: 'c2', title: 'Working with Microservices in Go (Golang)' },
      },
      {
        id: 'o3',
        priceAfterPromotion: '4000',
        course: { id: 'c3', title: 'Backend Master Class [Golang + Postgres + Kubernetes + gRPC]' },
      },
    ],
  },
  {
    id: '2',
    totalPriceAfterPromotion: '400000',
    purchasedDate: 'Oct 10, 2023',
    orderDetail: [
      {
        id: 'o4',
        priceAfterPromotion: '40000',
        course: { id: 'c4', title: 'The Complete Korean Course for Beginners | 7 courses in 1!' },
      },
    ],
  },
  {
    id: '3',
    totalPriceAfterPromotion: '500000',
    purchasedDate: 'Oct 11, 2023',
    orderDetail: [
      {
        id: 'o5',
        priceAfterPromotion: '20000',
        course: { id: 'c5', title: `SQL and PostgreSQL: The Complete Developer's Guide` },
      },
    ],
  },
]

type Order = {
  id: string
  totalPriceAfterPromotion: string
  purchasedDate: string
  orderDetail: {
    id: string
    priceAfterPromotion: string
    course: { id: string; title: string }
  }[]
}

const Row = (props: { order: Order }) => {
  const { order } = props
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  return (
    <>
      {order.orderDetail.length > 1 ? (
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
                  {order.orderDetail.length} Khóa học đã mua
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="right" sx={{ color: '#6A6F73' }}>
              {order.purchasedDate}
            </TableCell>
            <TableCell align="right" sx={{ color: '#6A6F73' }}>
              ₫{order.totalPriceAfterPromotion}
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
                    {order.orderDetail.map(orderDetail => (
                      <TableRow key={orderDetail.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell sx={{ width: '10%' }} />
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
                        <TableCell sx={{ width: '20%', color: '#6A6F73' }} align="right">
                          ₫{orderDetail.priceAfterPromotion}
                        </TableCell>
                        <TableCell sx={{ width: '20%' }} />
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
                  navigate('/detail-course', { state: { id: order.orderDetail[0].id } })
                }
              >
                {order.orderDetail[0].course.title}
              </Link>
            </Box>
          </TableCell>
          <TableCell align="right" sx={{ color: '#6A6F73' }}>
            {order.purchasedDate}
          </TableCell>
          <TableCell align="right" sx={{ color: '#6A6F73' }}>
            ₫{order.totalPriceAfterPromotion}
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
  console.log(132)
  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          fontWeight: '600',
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        Lịch sử đơn hàng
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '10%' }} />
              <TableCell sx={{ width: '30%' }} />
              {/* <TableCell sx={{ width: '30%', color: 'gray', fontSize: '16px', fontWeight: '600' }}>
                Tên khóa học
              </TableCell> */}
              <TableCell
                sx={{ width: '20%', color: 'gray', fontSize: '16px', fontWeight: '600' }}
                align="right"
              >
                Ngày
              </TableCell>
              <TableCell
                sx={{ width: '20%', color: 'gray', fontSize: '16px', fontWeight: '600' }}
                align="right"
              >
                Tổng tiền
              </TableCell>
              <TableCell
                sx={{ width: '20%', color: 'gray', fontSize: '16px', fontWeight: '600' }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <Row key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default CustomerOrderListContainer
