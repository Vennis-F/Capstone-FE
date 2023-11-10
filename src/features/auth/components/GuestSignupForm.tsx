import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'

import { CustomerSignupRequest } from '../types'

export type Props = {
  isLogging: boolean
  defaultValues?: CustomerSignupRequest
  onSubmitClick(body: CustomerSignupRequest, reset: UseFormReset<CustomerSignupRequest>): void
}

export const GuestSignupForm = (props: Props) => {
  const {
    defaultValues = {
      firstName: '',
      lastName: '',
      middleName: '',
      password: '',
      phoneNumber: '',
      email: '',
    },
    onSubmitClick,
  } = props

  const newCharacterValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Không được để trống tên'),
    lastName: Yup.string().required('Không được để trống họ'),
    middleName: Yup.string().required('Không được để trống tên đệm'),
    password: Yup.string()
      .required('Không được để trống mật khẩu')
      .min(8, 'Mật khẩu phải có độ dài nhỏ nhất là 8')
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Mật khẩu phải bao gồm ít nhất 1 ký tự thường, ký tự in hoa và số hoặc ký tự đặc biệt',
      )
      .max(32, 'Mật khẩu phải có độ dài tối đa là 32'),
    phoneNumber: Yup.string()
      .required('Không được để trống số điện thoại')
      .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
    email: Yup.string().required('Không được để trống Email').email('Email không hợp lệ'),
  })

  const methods = useForm<CustomerSignupRequest>({
    defaultValues,
    resolver: yupResolver(newCharacterValidationSchema),
  })

  const { control, reset, handleSubmit } = methods
  const submitHandler = (body: CustomerSignupRequest) => {
    onSubmitClick(body, reset)
  }

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <Box sx={{ height: '60px' }}>
        <FormTextField name="firstName" label={'Tên'} control={control} />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="lastName" label={'Họ'} control={control} />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="middleName" label={'Tên đệm'} control={control} />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="phoneNumber" label={'Số điện thoại'} control={control} />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="email" label={'Email'} control={control} type="email" />
      </Box>
      <Box sx={{ height: '80px' }}>
        <FormTextField name="password" label={'Mật khẩu'} control={control} type="password" />
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
        disabled={props.isLogging}
      >
        {!props.isLogging ? 'Đăng ký' : <CircularProgress size="26px" />}
      </Button>
    </Stack>
  )
}
