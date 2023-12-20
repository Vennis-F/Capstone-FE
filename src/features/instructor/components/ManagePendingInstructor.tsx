/* eslint-disable @typescript-eslint/indent */
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { getInstructorsByAdmin, updateInstructorStatusByAdmin } from '../api'
import { InstructorFilterResponse, InstructorStatus } from '../types'

import EditInstructorDialogForm from './EditInstructorDialogForm'
import TableInstructorsPending from './TableInstructorsPending'

const ManagePendingInstructor = () => {
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
      const fetchedInstructors = await getInstructorsByAdmin(InstructorStatus.Pending)
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
    <Box>
      <TableInstructorsPending
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

      {currentInstructor && (
        <EditInstructorDialogForm
          defaultValues={currentInstructor}
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
            rows={3}
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
            {!isLoading ? 'Từ chối' : <CircularProgress size="26px" />}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ManagePendingInstructor
