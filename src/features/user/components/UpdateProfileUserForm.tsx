import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, TextField } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { toastWarn } from 'libs/utils/handle-toast'

import { UpdateProfileUserFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: UpdateProfileUserFormInput
  otherValues: { email?: string }
  onSubmitClick(
    data: UpdateProfileUserFormInput,
    reset: UseFormReset<UpdateProfileUserFormInput>,
  ): void
}

export const UpdateProfileUserForm = (props: Props) => {
  const {
    defaultValues = {
      firstName: '',
      lastName: '',
      middleName: '',
      phoneNumber: '',
      userName: '',
    },
    otherValues,
    onSubmitClick,
  } = props

  const newCharacterValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Không được để trống tên'),
    lastName: Yup.string().required('Không được để trống họ'),
    middleName: Yup.string().required('Không được để trống tên đệm'),
    phoneNumber: Yup.string().required('Không được để trống số điện thoại'),
    userName: Yup.string()
      .when('conditionFieldName', {
        is: defaultValues.userName !== '',
        then: Yup.string().required('Không được để trống tên đăng nhập'),
      })
      .nullable(true),
  })

  const methods = useForm<UpdateProfileUserFormInput>({
    defaultValues,
    resolver: yupResolver(newCharacterValidationSchema),
  })

  const { control, reset, handleSubmit, formState } = methods

  const submitHandler = (data: UpdateProfileUserFormInput) => {
    console.log(formState.isDirty)
    if (!formState.isDirty) {
      toastWarn({ message: 'Cập nhật dữ liệu trước khi tiến hành cập nhật!' })
    } else {
      onSubmitClick(data, reset)
    }
  }

  console.log('[defaultValue] ', defaultValues, formState)

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <Box sx={{ height: '60px' }}>
        <TextField
          defaultValue={otherValues.email}
          disabled={true}
          size="small"
          fullWidth
          variant="outlined"
          label="email"
        />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="userName" label={'Tên đăng nhập'} control={control} size="small" />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="firstName" label={'Tên'} control={control} size="small" />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="middleName" label={'Tên đệm'} control={control} size="small" />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="lastName" label={'Họ'} control={control} size="small" />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="phoneNumber" label={'Số điện thoại'} control={control} size="small" />
      </Box>
      <Button
        onClick={() => reset()}
        variant={'contained'}
        size="large"
        sx={{
          backgroundColor: MainColor.RED_500,
          fontWeight: '600',
          '&:hover': {
            backgroundColor: MainColor.RED_600,
          },
        }}
      >
        {'Reset'}
      </Button>
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
        // disabled={props.isLogging}
      >
        {/* {!props.isLogging ? 'Đăng nhập' : <CircularProgress size="26px" />} */}
        {'Cập nhật'}
      </Button>
    </Stack>
  )
}
