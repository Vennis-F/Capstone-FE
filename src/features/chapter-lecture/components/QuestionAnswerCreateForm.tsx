import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { CreateQuestionAnswerFormInput } from 'features/question-topic/types/form.type'
import { MainColor } from 'libs/const/color'
import FormReactQuillField from 'libs/ui/form-components/FormReactQuillField'
import { textFromHTMLCode } from 'libs/utils/handle-html-data'
import { toastError } from 'libs/utils/handle-toast'

export type Props = {
  isLoading: boolean
  defaultValues?: CreateQuestionAnswerFormInput
  onSubmitClick(
    data: CreateQuestionAnswerFormInput,
    reset: UseFormReset<CreateQuestionAnswerFormInput>,
  ): void
}

export const QuestionAnswerCreateForm = (props: Props) => {
  const {
    defaultValues = {
      description: '',
    },
    onSubmitClick,
    isLoading,
  } = props

  const newValidationSchema = Yup.object().shape({
    description: Yup.string().required('Không được để trống phản hồi'),
  })

  const methods = useForm<CreateQuestionAnswerFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const { control, reset, handleSubmit } = methods

  const submitHandler = (data: CreateQuestionAnswerFormInput) => {
    console.log(textFromHTMLCode(data.description.trim()).length)
    if (textFromHTMLCode(data.description.trim()).length === 0)
      return toastError({ message: 'Phản hồi không được trống' })
    return onSubmitClick(data, reset)
  }

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Viết phản hồi của bạn</Typography>
      <FormReactQuillField
        name="description"
        control={control}
        placeholder="Viết phản hồi của bạn"
        disable={isLoading}
        isFull={true}
      />

      <Box height="40px" />
      <Box textAlign="right">
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
          {!props.isLoading ? 'Thêm câu trả lời' : <CircularProgress size="26px" />}
        </Button>
      </Box>
      <Box height="40px" />
    </Stack>
  )
}
