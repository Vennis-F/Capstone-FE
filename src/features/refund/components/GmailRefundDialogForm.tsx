import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { toastWarn } from 'libs/utils/handle-toast'

import { GmailRefundFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: GmailRefundFormInput
  onSubmitClick(data: GmailRefundFormInput, reset: UseFormReset<GmailRefundFormInput>): void
  openDialog: boolean
  handleCloseDialog: () => void
  isLoading: boolean
}

const GmailRefundDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick } = props

  const newValidationSchema = Yup.object().shape({
    body: Yup.string().required('Không được để trống nội dung'),
  })

  const methods = useForm<GmailRefundFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods

  const submitHandler = (data: GmailRefundFormInput) => {
    if (!isDirty) {
      toastWarn({
        message: 'Hãy Điền đầy đủ thông tin!',
      })
    } else {
      onSubmitClick(data, reset)
    }
  }

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleCloseDialog}
      maxWidth="sm"
      fullWidth={true}
      sx={{ fontFamily: 'sans-serif !important' }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '20px' }}>
        Gửi gmail về hoàn tiền cho khách hàng
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '50px' }}>
          <FormTextField name="body" control={control} size="small" rows={4} label="Nội dung" />
        </Box>
        <Box sx={{ height: '60px' }} />
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={handleSubmit(submitHandler)}
            variant={'contained'}
            size="large"
            sx={{
              width: '200px',
              backgroundColor: MainColor.RED_500,
              fontWeight: '600',
              '&:hover': {
                backgroundColor: MainColor.RED_600,
              },
            }}
            disabled={props.isLoading}
          >
            {!props.isLoading ? 'Gửi' : <CircularProgress size="26px" />}
          </Button>
        </Box>
      </Stack>
    </Dialog>
  )
}

export default GmailRefundDialogForm
