import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React, { useState } from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import ReactQuillCustom from 'libs/ui/custom-components/ReactQuillCustom'
import { FormTextField } from 'libs/ui/form-components/FormTextField'

import { CreateQuestionTopicFormInput } from '../types/form.type'

export type Props = {
  isLoading: boolean
  defaultValues?: CreateQuestionTopicFormInput
  onSubmitClick(
    data: CreateQuestionTopicFormInput,
    comment: string,
    reset: UseFormReset<CreateQuestionTopicFormInput>,
  ): void
}

export const CreateQuestionTopicForm = (props: Props) => {
  const [comment, setComment] = useState('')
  const {
    defaultValues = {
      title: '',
    },
    onSubmitClick,
  } = props

  const newValidationSchema = Yup.object().shape({
    title: Yup.string().required('Không được để trống tên').max(100, 'Độ dài tối đa là 100'),
  })

  const methods = useForm<CreateQuestionTopicFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const { control, reset, handleSubmit } = methods

  const submitHandler = (data: CreateQuestionTopicFormInput) => {
    onSubmitClick(data, comment, reset)
  }

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <Box sx={{ height: '60px' }}>
        <FormTextField name="title" label={'Tiêu đề hoặc tóm tắt'} control={control} size="small" />
      </Box>

      <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Chi tiết (tùy chọn)</Typography>
      <ReactQuillCustom value={comment} handleChangeValue={setComment} placeholder="" />

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
        {!props.isLoading ? 'Đặt câu hỏi' : <CircularProgress size="26px" />}
      </Button>
    </Stack>
  )
}
