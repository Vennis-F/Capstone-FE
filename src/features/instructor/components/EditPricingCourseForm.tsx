import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import FormNumberField from 'libs/ui/form-components/FormNumberField'

import { UpdatePriceCourseFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: UpdatePriceCourseFormInput
  onSubmitClick(
    data: UpdatePriceCourseFormInput,
    reset: UseFormReset<UpdatePriceCourseFormInput>,
  ): void
  isLoading: boolean
  isEditable: boolean
}

const EditPricingCourseForm = (props: Props) => {
  const { defaultValues, onSubmitClick } = props

  const newValidationSchema = Yup.object().shape({
    price: Yup.number()
      .required('Không được để trống giá tiền')
      .min(10000, 'Nhỏ nhất là 10.000VND')
      .max(10000000, 'Tối đa là 10.000.000VND'),
  })

  const methods = useForm<UpdatePriceCourseFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const { control, reset, handleSubmit } = methods

  const submitHandler = (data: UpdatePriceCourseFormInput) => {
    onSubmitClick(data, reset)
  }

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <Box sx={{ height: '60px', marginBottom: '40px' }}>
        <Typography variant="h6" fontWeight="bold" fontSize="18px">
          Mức giá
        </Typography>
        <Box width="150px">
          <FormNumberField
            name="price"
            control={control}
            size="small"
            disable={!props.isEditable}
          />
        </Box>
      </Box>
      {props.isEditable && (
        <Button
          onClick={handleSubmit(submitHandler)}
          variant={'contained'}
          size="large"
          sx={{
            width: '100px',
            backgroundColor: MainColor.RED_500,
            fontWeight: '600',
            '&:hover': {
              backgroundColor: MainColor.RED_600,
            },
          }}
          disabled={props.isLoading}
        >
          {!props.isLoading ? 'Lưu' : <CircularProgress size="26px" />}
        </Button>
      )}
    </Stack>
  )
}

export default EditPricingCourseForm
