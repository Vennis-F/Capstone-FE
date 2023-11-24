import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'

import { ChangePasswordUserFormInput } from '../types/form.type'

export type Props = {
  onSubmitClick?: (
    data: ChangePasswordUserFormInput,
    reset: UseFormReset<ChangePasswordUserFormInput>,
  ) => void
  isLoading: boolean
}

export const CustomerChangePasswordForm = (props: Props) => {
  const { onSubmitClick } = props
  const defaultValues: ChangePasswordUserFormInput = {
    newPassword: '',
    confirmNewPassword: '',
    currentPassword: '',
  }

  const newValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Không được để trống mật khẩu hiện tại'),
    newPassword: Yup.string()
      .required('Không được để trống mật khẩu mới')
      .min(8, 'Mật khẩu mới phải có độ dài nhỏ nhất là 8')
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Mật khẩu mới phải bao gồm ít nhất 1 ký tự thường, ký tự in hoa và số hoặc ký tự đặc biệt',
      )
      .max(32, 'Mật khẩu mới phải có độ dài tối đa là 32')
      .test(
        'not-same',
        'Mật khẩu mới và mật khẩu hiện tại không được giống nhau',
        function (value) {
          return value !== this.parent.currentPassword
        },
      ),
    confirmNewPassword: Yup.string()
      .required('Không được để trống xác nhận mật khẩu mới')
      .oneOf(
        [Yup.ref('newPassword'), null],
        'Mật khẩu mới và xác nhận mật khẩu mới phải giống nhau',
      ),
  })

  const methods = useForm<ChangePasswordUserFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const { control, reset, handleSubmit } = methods

  const submitHandler = (data: ChangePasswordUserFormInput) => {
    if (onSubmitClick) onSubmitClick(data, reset)
  }

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <Box sx={{ height: '60px' }}>
        <FormTextField
          name="currentPassword"
          label={'Mật khẩu hiện tại'}
          control={control}
          size="small"
          type="password"
        />
      </Box>
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
      <Button
        onClick={handleSubmit(submitHandler)}
        variant={'contained'}
        size="large"
        sx={{
          backgroundColor: MainColor.RED_500,
          fontWeight: '600',
          '&:hover': {
            backgroundColor: MainColor.RED_600,
          },
        }}
        disabled={props.isLoading}
      >
        {!props.isLoading ? 'Đổi mật khẩu' : <CircularProgress size="26px" />}
      </Button>
    </Stack>
  )
}
