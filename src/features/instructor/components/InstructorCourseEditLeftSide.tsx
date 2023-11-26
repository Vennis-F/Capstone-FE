/* eslint-disable */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { checkCourseCreateValid, updateCourseStatus } from 'features/courses/api'
import { CourseFullInfor, CourseStatus } from 'features/courses/types'
import CustomButton from 'libs/ui/components/CustomButton'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'
import { getUserRole } from 'libs/utils/handle-token'
import { UserRole } from 'types'
import { TypeInstructorEditCourseParams } from 'types/params.enum'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'

interface Props {
  currentType: TypeInstructorEditCourseParams
  course: CourseFullInfor
  handleGetCourse: () => Promise<void>
}

const InstructorCourseEditLeftSide = ({ currentType, course, handleGetCourse }: Props) => {
  const [type, setType] = useState<TypeInstructorEditCourseParams>(currentType)
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [openApproval, setOpenApproval] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [reasonReject, setReasonReject] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setType(value as TypeInstructorEditCourseParams)
    navigate(`/course/edit/${courseId}/manage/${value}`)
  }

  const handleSendToVerify = async () => {
    try {
      const { msgErrors } = await checkCourseCreateValid(course.id)

      if (msgErrors.length === 0) {
        toastSuccess({ message: 'Đã gửi đi để Admin xem xét thành công' })
        handleGetCourse()
      } else {
        const renderMsgErrors = (
          <>
            {msgErrors.map(error => (
              <Typography key={error}>- {error}</Typography>
            ))}
          </>
        )
        toastError({ message: renderMsgErrors, postion: 'top-center' })
      }
      console.log(msgErrors)
    } catch (error) {
      showErrorResponseSaga({ error, defaultMessage: 'Không gửi đi để xem xét được' })
    }
  }

  const handleApprovalOrReject = async (courseStatus: CourseStatus) => {
    if (courseStatus === CourseStatus.APPROVED) {
      await updateCourseStatus({
        courseId: course.id,
        status: CourseStatus.APPROVED,
      })
    } else if (courseStatus === CourseStatus.REJECTED) {
      if (reasonReject.trim() === '') return toastError({ message: 'Không được để trống lý do' })
      await updateCourseStatus({
        courseId: course.id,
        status: CourseStatus.REJECTED,
      })
    }
    handleGetCourse()
    toastSuccess({
      message: 'Đã cập nhật trạng thái thành công',
    })
    setOpenApproval(false)
    setOpenReject(false)
  }

  const isCheckApproval = getUserRole() === UserRole.STAFF && course.status === CourseStatus.PENDING

  return (
    <>
      <FormControl sx={{ marginBottom: '15px' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
          Tạo nội dung khóa học
        </Typography>
        <RadioGroup value={type} onChange={handleChange}>
          <FormControlLabel
            value={TypeInstructorEditCourseParams.CURRICULUMN}
            control={<Radio />}
            label="Chương trình giảng dạy"
          />
        </RadioGroup>
        <Typography
          sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black', marginTop: '20px' }}
        >
          Xuât bản khóa học của bạn
        </Typography>
        <RadioGroup value={type} onChange={handleChange}>
          <FormControlLabel
            value={TypeInstructorEditCourseParams.BASICS}
            control={<Radio />}
            label="Trang chủ khóa học"
          />
          <FormControlLabel
            value={TypeInstructorEditCourseParams.THUMBNAIL}
            control={<Radio />}
            label="Ảnh khóa học"
          />
          <FormControlLabel
            value={TypeInstructorEditCourseParams.PRICING}
            control={<Radio />}
            label="Giá khóa học"
          />
          <FormControlLabel
            value={TypeInstructorEditCourseParams.PROMOTION}
            control={<Radio />}
            label="Khuyến mãi"
          />
        </RadioGroup>
      </FormControl>

      {(course.status === CourseStatus.CREATED || course.status === CourseStatus.REJECTED) &&
        getUserRole() === UserRole.INSTRUCTOR && (
          <CustomButton onClick={handleSendToVerify}>Gửi đi xem xét</CustomButton>
        )}

      {isCheckApproval && (
        <Grid container>
          <Grid item>
            <CustomButton
              onClick={() => setOpenApproval(true)}
              sxCustom={{
                backgroundColor: '#7c3aed',
                ':hover': {
                  backgroundColor: '#6d28d9',
                },
              }}
            >
              Chấp nhận
            </CustomButton>
          </Grid>
          <Grid item marginLeft="10px">
            <CustomButton onClick={() => handleApprovalOrReject(CourseStatus.REJECTED)}>
              Từ chối
            </CustomButton>
          </Grid>
        </Grid>
      )}

      <DialogBinaryQuestion
        titleText="Duyệt khóa học"
        contentText="Bạn có chắc là duyệt thành công khóa học này?"
        open={openApproval}
        clickCloseModal={() => setOpenApproval(false)}
        clickAcceptAction={() => handleApprovalOrReject(CourseStatus.APPROVED)}
      />

      <Dialog
        open={openReject}
        onClose={() => {
          setOpenReject(false)
          setReasonReject('')
        }}
      >
        <DialogTitle>Bạn có chắc khóa học xét duyệt không thành công?</DialogTitle>
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
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenReject(false)
              setReasonReject('')
            }}
          >
            Không
          </Button>
          <Button onClick={() => handleApprovalOrReject(CourseStatus.REJECTED)}>Chấp nhận</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default InstructorCourseEditLeftSide
