import { Box, Container, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { approveRefundByAdmin, getRefundsByAdmin } from '../apis'
import { RefundFilterResponse } from '../types'

import TableRefundsInAdmin from './TableRefunds'

const RefundsManageContainer = () => {
  const [refunds, setRefunds] = useState<RefundFilterResponse[]>([])
  const [currentRefund, setCurrentRefund] = useState<RefundFilterResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(0)

  const fetchRefunds = async (newValue: number) => {
    let status: 'approved' | 'not-approved' | undefined
    try {
      switch (newValue) {
        case 0:
          status = undefined
          break
        case 1:
          status = 'not-approved'
          break
        case 2:
          status = 'approved'
          break
        default:
          status = undefined
          break
      }

      const fetchedRefundsRes = await getRefundsByAdmin(status)
      setRefunds(fetchedRefundsRes)
    } catch (error) {
      console.error('Error fetching refunds:', error)
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    fetchRefunds(newValue)
  }

  useEffect(() => {
    fetchRefunds(value)
  }, [])

  return (
    <Container maxWidth="xl">
      <LayoutBodyContainer title="Danh sách yêu cầu hoàn tiền">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Tất cả" id="all" />
              <Tab label="Chờ hoàn tiền" id="not-approved" />
              <Tab label="Đã hoàn tiền" id="approved" />
            </Tabs>
          </Box>
        </Box>

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
      </LayoutBodyContainer>

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
              fetchRefunds(value)
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
