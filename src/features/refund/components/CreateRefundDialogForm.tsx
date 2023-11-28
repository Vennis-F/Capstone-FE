import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { toastWarn } from 'libs/utils/handle-toast'

import { CreateRefundFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: CreateRefundFormInput
  onSubmitClick(data: CreateRefundFormInput, reset: UseFormReset<CreateRefundFormInput>): void
  openDialog: boolean
  // handleOpenDialog: () => void
  handleCloseDialog: () => void
  isLoading: boolean
  // otherValues: { url?: string; postId: string }
}

const CreateRefundDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick } = props

  const newValidationSchema = Yup.object().shape({
    bank: Yup.string().required('Không được để trống tên ngân hàng'),
    accountNumber: Yup.string().required('Không được để số tài khoản'),
    accountName: Yup.string().required('Không được để trống tên chủ tài khoản'),
    refundReason: Yup.string().required('Không được để trống lý do hoàn tiền'),
  })

  const methods = useForm<CreateRefundFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: CreateRefundFormInput) => {
    console.log('[submit]', isDirty, dirtyFields, data)
    if (!isDirty) {
      toastWarn({
        message: 'Hãy Điền đầy đủ thông tin!',
      })
    } else {
      onSubmitClick(data, reset)
    }
  }
  console.log('[defaultValues]', defaultValues)

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
      sx={{ fontFamily: 'sans-serif !important' }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Hoàn tiền
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '50px', marginBottom: '25px' }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontSize="18px"
            sx={{ fontFamily: 'sans-serif !important' }}
          >
            Ngân hàng
          </Typography>
          <FormTextField name="bank" control={control} size="small" />
        </Box>
        <Box sx={{ height: '50px' }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontSize="18px"
            sx={{ fontFamily: 'sans-serif !important' }}
          >
            Số tài khoản
          </Typography>
          <FormTextField name="accountNumber" control={control} size="small" />
        </Box>
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '50px', marginBottom: '25px' }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontSize="18px"
            sx={{ fontFamily: 'sans-serif !important' }}
          >
            Tên chủ tài khoản
          </Typography>
          <FormTextField name="accountName" control={control} size="small" />
        </Box>
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '50px' }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontSize="18px"
            sx={{ fontFamily: 'sans-serif !important' }}
          >
            Lý do hoàn tiền
          </Typography>
          <FormTextField name="refundReason" control={control} size="small" />
        </Box>
        <Box sx={{ height: '60px' }} />
        <Button
          onClick={handleSubmit(submitHandler)}
          variant={'contained'}
          size="large"
          sx={{
            width: '250px',
            backgroundColor: MainColor.RED_500,
            fontWeight: '600',
            '&:hover': {
              backgroundColor: MainColor.RED_600,
            },
          }}
          disabled={props.isLoading}
        >
          {!props.isLoading ? 'Gửi yêu cầu' : <CircularProgress size="26px" />}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default CreateRefundDialogForm
