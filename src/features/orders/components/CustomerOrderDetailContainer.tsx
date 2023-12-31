/* eslint-disable @typescript-eslint/indent */
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { convertTransactionStatus } from 'features/transaction/types'
import { MainColor } from 'libs/const/color'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { getStringDayMonthYear } from 'libs/utils/handle-date'
import { formatCurrency } from 'libs/utils/handle-price'

import { findOrderByOrderId } from '../api'
import { Order, convertOrderStatus } from '../types'

import CustomerOrderDetailCardView from './CustomerOrderDetailCardView'

type Props = {
  orderId: string
}

const CustomerOrderDetailContainer = ({ orderId }: Props) => {
  const [order, setOrder] = useState<Order | null>(null)

  const handleGetOrder = async () => {
    const orderRes = await findOrderByOrderId(orderId)
    setTimeout(() => {
      setOrder(orderRes)
    }, 1000)
  }

  useEffect(() => {
    handleGetOrder()
  }, [orderId])

  const convertOrderStatusName = order ? convertOrderStatus(order.orderStatus) : null

  return (
    <Container maxWidth="lg">
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={order === null}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {order && (
        <>
          <Breadcrumbs sx={{ marginBottom: '10px' }}>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', color: MainColor.YELLOW_500 }}
              color="inherit"
              href="/user/order-list"
            >
              <KeyboardBackspaceIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Quay trở lại danh sách đơn hàng
            </Link>
          </Breadcrumbs>
          <TitleTypography title="Đơn hàng chi tiết" />
          <Paper elevation={5} sx={{ padding: '20px', borderRadius: '10px' }}>
            <Box marginTop="20px">
              <Grid container>
                <Grid item xs={6} marginBottom="20px">
                  <Typography variant="h5" sx={{ fontWeight: '600', marginBottom: '10px' }}>
                    Thông tin đơn hàng
                  </Typography>

                  <Typography fontWeight="bold">
                    Đơn đặt hàng số:
                    <Typography component="span" marginLeft="10px" color="GrayText">
                      {order.id}
                    </Typography>
                  </Typography>
                  <Typography fontWeight="bold">
                    Ngày:
                    <Typography component="span" marginLeft="10px" color="GrayText">
                      {getStringDayMonthYear(order?.insertedDate)}
                    </Typography>
                  </Typography>
                  <Typography fontWeight="bold">
                    Khách hàng:
                    <Typography component="span" marginLeft="10px" color="GrayText">
                      {`${order.user.lastName} ${order.user.middleName} ${order.user.firstName}`}
                    </Typography>
                  </Typography>
                  <Typography fontWeight="bold">
                    Tổng tiền đã thanh toán:
                    <Typography
                      component="span"
                      marginLeft="10px"
                      // fontWeight="bold"
                      fontSize="20px"
                    >
                      {formatCurrency(order.totalPriceAfterPromotion)} VND
                    </Typography>
                  </Typography>
                  <Typography fontWeight="bold">
                    Trạng thái:
                    <Typography
                      component="span"
                      marginLeft="10px"
                      color={convertOrderStatusName?.color}
                      fontSize="20px"
                      fontWeight="bold"
                    >
                      {convertOrderStatusName?.vietnamse}
                    </Typography>
                  </Typography>
                </Grid>
                {order.transaction && (
                  <Grid item xs={6}>
                    <Typography variant="h5" sx={{ fontWeight: '600', marginBottom: '10px' }}>
                      Thông tin giao dịch ngân hàng
                    </Typography>
                    <Typography fontWeight="bold">
                      Mã giao dịch ngân hàng:
                      <Typography component="span" marginLeft="10px" color="GrayText">
                        {order?.transaction?.bankTranNo}
                      </Typography>
                    </Typography>
                    <Typography fontWeight="bold">
                      Thanh toán thông qua:
                      <Typography component="span" marginLeft="10px" color="GrayText">
                        {'VNPAY'}
                      </Typography>
                    </Typography>
                    <Typography fontWeight="bold">
                      Ngày:
                      <Typography component="span" marginLeft="10px" color="GrayText">
                        {getStringDayMonthYear(order?.insertedDate)}
                      </Typography>
                    </Typography>
                    <Typography fontWeight="bold">
                      Thanh toán bằng ngân hàng:
                      <Typography component="span" marginLeft="10px" color="GrayText">
                        {order?.transaction?.bankCode}
                      </Typography>
                    </Typography>
                    <Typography fontWeight="bold">
                      Trạng thái:
                      <Typography
                        component="span"
                        marginLeft="10px"
                        color={convertTransactionStatus(order?.transaction?.status).color}
                      >
                        {convertTransactionStatus(order?.transaction?.status).vietnamse}
                      </Typography>
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: '600' }}>
                Chi tiết đơn hàng
              </Typography>
              <Grid container>
                <Grid item xs={10}>
                  {order?.orderDetails.map(orderDetail => (
                    <CustomerOrderDetailCardView
                      handleGetOrder={handleGetOrder}
                      orderDetail={orderDetail}
                      key={orderDetail.id}
                      order={order}
                    />
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </>
      )}
    </Container>
  )
}

export default CustomerOrderDetailContainer
