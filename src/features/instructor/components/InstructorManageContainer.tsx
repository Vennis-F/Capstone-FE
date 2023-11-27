/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
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
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { calcTotalPaymentAmount, formatCurrency } from 'libs/utils/handle-price'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'
import { UserRole } from 'types'

/* eslint-disable @typescript-eslint/indent */
import { getInstructorsByAdmin, updateInstructorStatusByAdmin } from '../api'
import { InstructorFilterResponse, InstructorStatus } from '../types'

import EditInstructorDialogForm from './EditInstructorDialogForm'
import TableInstructors from './TableInstructors'

const InstructorManageContainer = () => {
  const [instructors, setInstructors] = useState<InstructorFilterResponse[]>([])
  const [currentInstructor, setCurrentInstructor] = useState<InstructorFilterResponse | null>(null)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenApprove, setIsOpenApprove] = useState(false)
  const [isOpenReject, setIsOpenReject] = useState(false)
  const [reasonReject, setReasonReject] = useState('')
  const [currInstructorApproveOrRejectId, setCurrInstructorApproveOrReject] = useState<
    string | null
  >(null)
  const [currTransactionOrderDetail, setCurrTransactionOrderDetail] = useState<
    TransactionOrderDetailResponse[] | null
  >(null)
  const [openCurrTransactionOrderDetail, setOpenCurrTransactionOrderDetail] = useState(false)
  const [currentInstructorPayment, setCurrentInstructorPayment] =
    useState<InstructorFilterResponse | null>(null)

  const fetchInstructors = async () => {
    try {
      const fetchedInstructors = await getInstructorsByAdmin()
      setInstructors(fetchedInstructors)
    } catch (error) {
      console.error('Error fetching Instructors:', error)
    }
  }

  const handleSetStatusForInstructor = async () => {
    setIsLoading(true)
    try {
      if (isOpenApprove)
        await updateInstructorStatusByAdmin({
          instructorId: currInstructorApproveOrRejectId as string,
          status: InstructorStatus.Approved,
        })
      else {
        await updateInstructorStatusByAdmin({
          instructorId: currInstructorApproveOrRejectId as string,
          status: InstructorStatus.Reject,
          reason: reasonReject,
        })
      }
      toastSuccess({ message: 'Đã cập nhật trạng thái thành công' })
      fetchInstructors()
    } catch (error) {
      toastError({ message: 'Không thể cập nhật trạng thái được' })
      console.log(error)
    }
    setCurrInstructorApproveOrReject(null)
    setIsOpenApprove(false)
    setIsOpenReject(false)
    setReasonReject('')
    return setIsLoading(false)
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
      showErrorResponseSaga({ error, defaultMessage: 'Không thể thanh toán cho giảng viên được' })
    }
    return setIsLoading(false)
  }

  useEffect(() => {
    fetchInstructors()
  }, [])

  return (
    <Container maxWidth="lg">
      <TitleTypography title="Danh sách giảng viên" />

      <Paper elevation={10}>
        <TableInstructors
          instructors={instructors}
          onEditRow={instructorId => {
            const instructor = instructors.find(
              currInstructor => currInstructor.id === instructorId,
            ) as InstructorFilterResponse
            setCurrentInstructor(instructor)
            setIsOpenForm(true)
          }}
          onApproveOrRejectInstructor={(instructorId, status) => {
            setCurrInstructorApproveOrReject(instructorId)
            if (status === InstructorStatus.Approved) {
              setIsOpenApprove(true)
            } else if (status === InstructorStatus.Reject) {
              setReasonReject('')
              setIsOpenReject(true)
            }
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
      </Paper>

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
                    {formatCurrency(calcTotalPaymentAmount(currTransactionOrderDetail))}VND
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
              disable={calcTotalPaymentAmount(currTransactionOrderDetail) <= 0 || isLoading}
            >
              {!isLoading ? 'Đã Thanh toán' : <CircularProgress size="26px" />}
            </CustomButton>
          </DialogActions>
        </Dialog>
      )}

      <DialogBinaryQuestion
        titleText="Duyệt giáo viên vào nền tảng"
        contentText="Bạn có chắc muốn duyệt giáo viên này vào nền tảng?"
        open={isOpenApprove}
        clickAcceptAction={handleSetStatusForInstructor}
        clickCloseModal={() => {
          setCurrInstructorApproveOrReject(null)
          setIsOpenApprove(false)
        }}
        isLoading={isLoading}
      />

      <Dialog
        open={isOpenReject}
        onClose={() => {
          setIsOpenReject(false)
          setCurrInstructorApproveOrReject(null)
          setReasonReject('')
        }}
      >
        <DialogTitle>Bạn có chắc từ chối giáo viên này không?</DialogTitle>
        <DialogContent>
          <DialogContentText>Ghi rõ lý do</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            multiline
            value={reasonReject}
            onChange={e => setReasonReject(e.target.value)}
            disabled={isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpenReject(false)
              setCurrInstructorApproveOrReject(null)
              setReasonReject('')
            }}
          >
            Không
          </Button>
          <Button
            onClick={() => {
              if (!reasonReject || reasonReject.trim().length === 0)
                return toastError({ message: 'Bạn phải điền lý do bị loại bỏ' })
              return handleSetStatusForInstructor()
            }}
          >
            {!isLoading ? 'Loại bỏ' : <CircularProgress size="26px" />}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default InstructorManageContainer
