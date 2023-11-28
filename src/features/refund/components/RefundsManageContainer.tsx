/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'
import { OrderType, PageOptions } from 'types'

import { approveRefundByAdmin, getRefundsByAdmin } from '../apis'
import { RefundFilterResponse } from '../types'

import TableRefundsInAdmin from './TableRefunds'

const RefundsManageContainer = () => {
  const [refunds, setRefunds] = useState<RefundFilterResponse[]>([])
  const [currentRefund, setCurrentRefund] = useState<RefundFilterResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const fetchRefunds = async () => {
    try {
      const fetchedRefundsRes = await getRefundsByAdmin()
      setRefunds(fetchedRefundsRes)
    } catch (error) {
      console.error('Error fetching refunds:', error)
    }
  }

  useEffect(() => {
    fetchRefunds()
  }, [])

  return (
    <Container maxWidth="xl">
      <TitleTypography title="Danh sách yêu cầu hoàn tiền" />
      <Paper elevation={10}>
        <TableRefundsInAdmin
          refunds={refunds}
          onEditRow={refundId => {
            const refund = refunds.find(
              currRefund => currRefund.id === refundId,
            ) as RefundFilterResponse
            setCurrentRefund(refund)
            setIsOpen(true)
          }}
        />
      </Paper>

      {currentRefund && (
        <DialogBinaryQuestion
          open={isOpen}
          isLoading={isLoading}
          clickCloseModal={() => {
            setIsOpen(false)
            setCurrentRefund(null)
          }}
          titleText="Hoàn tiền khách hàng"
          contentText="Bạn có chắc đã hoàn tiền cho khách hàng này chưa?"
          clickAcceptAction={async () => {
            setIsLoading(true)
            try {
              await approveRefundByAdmin(currentRefund.id)
              setIsOpen(false)
              setCurrentRefund(null)
              fetchRefunds()
              toastSuccess({ message: 'Hoàn tiền cho khách hàng thành công' })
            } catch (error) {
              toastError({ message: 'Không thể hoàn tiền cho khách hàng' })
            }
            setIsLoading(false)
          }}
        />
      )}
    </Container>
  )
}

export default RefundsManageContainer
