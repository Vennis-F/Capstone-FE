/* eslint-disable @typescript-eslint/indent */
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

import {
  createTractionPayOffByAdmin,
  getTransactionOrderDetailForInstructorByAdmin,
} from 'features/transaction-pay-off/api'
import TableTransactionOrderDetailsInAdmin from 'features/transaction-pay-off/components/TableTransactionOrderDetailsInAdmin'
import { TransactionOrderDetailResponse } from 'features/transaction-pay-off/types'
import CustomButton from 'libs/ui/components/CustomButton'
import {
  calcTotalPaymentAmount,
  calcTotalRefundAmount,
  formatCurrency,
} from 'libs/utils/handle-price'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { getInstructorsByAdmin } from '../api'
import { InstructorFilterResponse, InstructorStatus } from '../types'

import EditInstructorDialogForm from './EditInstructorDialogForm'
import TableInstructorsApproved from './TableInstructorsApproved'

const ManageApprovedInstructor = () => {
  const [instructors, setInstructors] = useState<InstructorFilterResponse[]>([])
  const [currentInstructor, setCurrentInstructor] = useState<InstructorFilterResponse | null>(null)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currTransactionOrderDetail, setCurrTransactionOrderDetail] = useState<
    TransactionOrderDetailResponse[] | null
  >(null)
  const [openCurrTransactionOrderDetail, setOpenCurrTransactionOrderDetail] = useState(false)
  const [currentInstructorPayment, setCurrentInstructorPayment] =
    useState<InstructorFilterResponse | null>(null)

  const fetchInstructors = async () => {
    try {
      const fetchedInstructors = await getInstructorsByAdmin(InstructorStatus.Approved)
      setInstructors(fetchedInstructors)
    } catch (error) {
      console.error('Error fetching Instructors:', error)
    }
  }

  const handleGetTransactionOrderDetail = async (instructorId: string) => {
    const transactionOrderDetailRes = await getTransactionOrderDetailForInstructorByAdmin(
      instructorId,
    )

    setCurrTransactionOrderDetail(transactionOrderDetailRes)
  }

  const handleCreateTransactionPayoffByAdmin = async () => {
    setIsLoading(true)
    try {
      if (!currentInstructorPayment)
        return toastError({ message: 'Hiện không thấy giáo viên nào được chọn để thanh toán' })
      await createTractionPayOffByAdmin(currentInstructorPayment.id)
      toastSuccess({ message: 'Thanh toán cho giáo viên thành công' })
      setCurrTransactionOrderDetail(null)
      setOpenCurrTransactionOrderDetail(false)
      setCurrentInstructorPayment(null)
      // currentInstructorPayment()
    } catch (error) {
      showErrorResponseSaga({ error, defaultMessage: 'Không thể thanh toán cho giáo viên được' })
    }
    return setIsLoading(false)
  }

  useEffect(() => {
    fetchInstructors()
  }, [])

  return (
    <Box>
      <TableInstructorsApproved
        instructors={instructors}
        onEditRow={instructorId => {
          const instructor = instructors.find(
            currInstructor => currInstructor.id === instructorId,
          ) as InstructorFilterResponse
          setCurrentInstructor(instructor)
          setIsOpenForm(true)
        }}
        onPaymentInstructor={(instructorId: string) => {
          handleGetTransactionOrderDetail(instructorId)
          setOpenCurrTransactionOrderDetail(true)
          const instructor = instructors.find(
            currInstructor => currInstructor.id === instructorId,
          ) as InstructorFilterResponse
          setCurrentInstructorPayment(instructor)
        }}
      />

      {currentInstructor && (
        <EditInstructorDialogForm
          defaultValues={currentInstructor}
          openDialog={isOpenForm}
          // isLoading={isLoading}
          handleOpenDialog={() => setIsOpenForm(true)}
          handleCloseDialog={() => setIsOpenForm(false)}
        />
      )}

      {currTransactionOrderDetail && (
        <Dialog
          open={openCurrTransactionOrderDetail}
          onClose={() => {
            setOpenCurrTransactionOrderDetail(false)
            setCurrTransactionOrderDetail(null)
          }}
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle>Bản chi tiết giao dịch</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>Ghi rõ lý do</DialogContentText> */}
            <TableTransactionOrderDetailsInAdmin
              transactionOrderDetailsResponse={currTransactionOrderDetail}
            />
            <Grid container sx={{ marginTop: '20px' }} alignItems="center">
              <Grid item>
                {calcTotalPaymentAmount(currTransactionOrderDetail) > 0 && (
                  <Paper elevation={5} sx={{ padding: '20px' }}>
                    <Typography fontWeight="bold" fontSize="20px">
                      Thông tin ngân hàng của giáo viên
                    </Typography>
                    <Typography>{`Ngân hàng: ${currentInstructorPayment?.bank}`}</Typography>
                    <Typography>{`Số tài khoản: ${currentInstructorPayment?.accountNumber}`}</Typography>
                    <Typography>{`Tên chủ tải khoản: ${currentInstructorPayment?.accountHolderName}`}</Typography>
                  </Paper>
                )}
              </Grid>
              <Grid item marginLeft="auto">
                <Typography fontWeight="bold" color="GrayText">
                  Tổng tiền cần thanh toán:
                  <Typography
                    fontWeight="bold"
                    fontSize="26px"
                    component="span"
                    color="black"
                    marginLeft="20px"
                  >
                    {formatCurrency(
                      calcTotalPaymentAmount(currTransactionOrderDetail) -
                        calcTotalRefundAmount(currTransactionOrderDetail),
                    )}
                    VND
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenCurrTransactionOrderDetail(false)
                setCurrTransactionOrderDetail(null)
              }}
            >
              Đóng
            </Button>
            <CustomButton
              sxCustom={{ width: '160px' }}
              onClick={handleCreateTransactionPayoffByAdmin}
              disable={
                calcTotalPaymentAmount(currTransactionOrderDetail) -
                  calcTotalRefundAmount(currTransactionOrderDetail) <=
                  0 || isLoading
              }
            >
              {!isLoading ? 'Đã Thanh toán' : <CircularProgress size="26px" />}
            </CustomButton>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}

export default ManageApprovedInstructor
