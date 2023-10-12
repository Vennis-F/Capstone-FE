import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormTextField } from 'libs/ui/components/FormTextField'

import { GuestLoginFormInput } from '../types'

export type GuestLoginFormProps = {
  isLogging: boolean
  defaultValues?: GuestLoginFormInput
  onSubmitClick(data: GuestLoginFormInput, reset: UseFormReset<GuestLoginFormInput>): void
}

export const GuestLoginForm = (props: GuestLoginFormProps) => {
  const { defaultValues = { emailOrUsername: '', password: '' }, onSubmitClick } = props

  const newCharacterValidationSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required('Không được để trống email hoặc tên đăng nhập'),
    password: Yup.string().required('Không được để trống mật khẩu'),
  })

  const methods = useForm<GuestLoginFormInput>({
    defaultValues,
    resolver: yupResolver(newCharacterValidationSchema),
  })

  const { control, reset, handleSubmit } = methods
  const submitHandler = (data: GuestLoginFormInput) => {
    onSubmitClick(data, reset)
  }

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <Box sx={{ height: '80px' }}>
        <FormTextField
          name="emailOrUsername"
          label={'Email hoặc Tên đăng nhập'}
          control={control}
        />
      </Box>
      <Box sx={{ height: '80px' }}>
        <FormTextField name="password" label={'Mật khẩu'} control={control} />
      </Box>
      <Button
        onClick={handleSubmit(submitHandler)}
        variant={'contained'}
        size="large"
        sx={{
          backgroundColor: '#19A7CE',
          fontWeight: '600',
          '&:hover': {
            backgroundColor: '#146C94',
          },
        }}
        disabled={props.isLogging}
      >
        {!props.isLogging ? 'Đăng nhập' : <CircularProgress size="26px" />}
      </Button>
    </Stack>
  )
}
