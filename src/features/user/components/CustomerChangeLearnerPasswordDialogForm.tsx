import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, Dialog, DialogTitle, Paper, Avatar, CircularProgress } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { ChangePasswordLearnerFormInput } from 'features/learner/types/form.type'
import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { StyleSxProps } from 'types'

const style: StyleSxProps = {
  container: {
    bgcolor: '#FFFFFF',
    padding: '20px',
  },
  formInput: { height: '60px' },
  btnSubmit: {
    backgroundColor: MainColor.RED_500,
    fontWeight: '600',
    '&:hover': {
      backgroundColor: MainColor.RED_600,
    },
    width: '180px',
  },
} as const

export type Props = {
  defaultValues?: ChangePasswordLearnerFormInput
  openDialog: boolean
  isLoading: boolean
  onSubmitClick(
    data: ChangePasswordLearnerFormInput,
    reset: UseFormReset<ChangePasswordLearnerFormInput>,
  ): void
  handleCloseDialog: () => void
}

export const CustomerChangeLearnerPasswordDialogForm = (props: Props) => {
  const {
    openDialog,
    handleCloseDialog,
    isLoading,
    defaultValues = {
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmitClick,
  } = props

  const newValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Không được để trống Mật khẩu')
      .min(5, 'Mật khẩu không có độ dài nhỏ nhất là 5')
      .max(32, 'Mật khẩu có độ dài tối đa là 32'),
    confirmNewPassword: Yup.string()
      .required('Không được để trống xác nhận mật khẩu mới')
      .oneOf(
        [Yup.ref('newPassword'), null],
        'Mật khẩu mới và xác nhận mật khẩu mới phải giống nhau',
      ),
  })

  const methods = useForm<ChangePasswordLearnerFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const { control, reset, handleSubmit } = methods

  const submitHandler = (data: ChangePasswordLearnerFormInput) => {
    if (onSubmitClick) onSubmitClick(data, reset)
  }

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth={true}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Thay đổi mật khẩu tài khoản của bé
      </DialogTitle>

      <Paper square={false} variant="outlined" sx={{ margin: '20px 60px', padding: '40px' }}>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Avatar
              sx={{ height: '250px !important', width: '250px' }}
              src="https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Box>
          <Stack
            sx={{ pt: 0, width: '50%' }}
            direction="column"
            spacing={1}
            justifyContent="center"
          >
            <Box sx={{ height: '60px' }}>
              <FormTextField
                name="newPassword"
                label={'Mật khẩu mới'}
                control={control}
                size="small"
                type="password"
              />
            </Box>
            <Box sx={{ height: '60px' }}>
              <FormTextField
                name="confirmNewPassword"
                label={'Xác nhận mật khẩu mới'}
                control={control}
                size="small"
                type="password"
              />
            </Box>
          </Stack>
        </Stack>
      </Paper>
      <Box sx={{ textAlign: 'right', marginBottom: '20px', marginRight: '60px' }}>
        <Button
          onClick={handleSubmit(submitHandler)}
          variant={'contained'}
          size="large"
          sx={style.btnSubmit}
          disabled={isLoading}
        >
          {!isLoading ? 'Đổi mật khẩu' : <CircularProgress size="26px" />}
        </Button>
      </Box>
    </Dialog>
  )
}

export default CustomerChangeLearnerPasswordDialogForm
