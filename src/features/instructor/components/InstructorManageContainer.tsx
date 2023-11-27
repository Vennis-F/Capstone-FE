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
  Paper,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import TitleTypography from 'libs/ui/components/TitleTypography'
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
        />
      </Paper>

      {currentInstructor && (
        <EditInstructorDialogForm
          defaultValues={currentInstructor}
          // onSubmitClick={async data => {
          //   setIsLoading(true)
          //   try {
          //     await updateInstructorByInstructor({
          //       InstructorId: currentInstructor.id,
          //       active: data.active,
          //       description: data.description,
          //       resources: data.resources,
          //       title: data.title,
          //     })
          //     fetchInstructors()
          //     setCurrentInstructor(null)
          //     setIsOpenForm(false)
          //     toastSuccess({ message: 'Cập nhật bài đăng thành công' })
          //   } catch (error) {
          //     showErrorResponseSaga({ defaultMessage: 'Không thể cập nhật bài đăng', error })
          //   }
          //   setIsLoading(false)
          // }}
          openDialog={isOpenForm}
          // isLoading={isLoading}
          handleOpenDialog={() => setIsOpenForm(true)}
          handleCloseDialog={() => setIsOpenForm(false)}
        />
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
