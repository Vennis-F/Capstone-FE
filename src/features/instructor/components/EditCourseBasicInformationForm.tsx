/* eslint-disable @typescript-eslint/indent */
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { Category } from 'features/category/types'
import { Level } from 'features/level/types'
import { MainColor } from 'libs/const/color'
import FormReactQuillField from 'libs/ui/form-components/FormReactQuillField'
import FormSelectField from 'libs/ui/form-components/FormSelectField'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { toastWarn } from 'libs/utils/handle-toast'

import { UpdateCourseFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: UpdateCourseFormInput
  // otherValues: { email?: string }
  onSubmitClick(data: UpdateCourseFormInput, reset: UseFormReset<UpdateCourseFormInput>): void
  levels: Level[]
  categories: Category[]
  isEditable: boolean
}

const EditCourseBasicInformationForm = (props: Props) => {
  const {
    // otherValues,
    defaultValues,
    onSubmitClick,
    levels,
    categories,
    isEditable,
  } = props

  const newValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Không được để trống tiêu đề')
      .max(100, 'Tiêu đề không được quá 100 ký tự'),
  })

  const methods = useForm<UpdateCourseFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: UpdateCourseFormInput) => {
    console.log('[submit]', isDirty, dirtyFields, data)
    if (!isDirty) {
      toastWarn({ message: 'Cập nhật dữ liệu trước khi tiến hành cập nhật!' })
    } else {
      onSubmitClick(data, reset)
    }
  }
  console.log('[defaultValues]', defaultValues)

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <Box sx={{ height: '60px', marginBottom: '40px' }}>
        <Typography variant="h6" fontWeight="bold" fontSize="18px">
          Tiêu đề
        </Typography>
        <FormTextField name="title" control={control} size="small" disable={!isEditable} />
        <Typography fontSize="12px" color="grayText" marginTop="5px">
          Tiêu đề của bạn phải là sự kết hợp giữa thu hút sự chú ý, mang tính thông tin và được tối
          ưu hóa cho tìm kiếm
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" fontWeight="bold" fontSize="18px">
          Miêu tả
        </Typography>
        <FormReactQuillField
          name="description"
          label={'Miêu tả'}
          control={control}
          disable={!isEditable}
        />
      </Box>
      <Box sx={{ height: '60px' }}></Box>
      <Box>
        <Typography variant="h6" fontWeight="bold" fontSize="18px">
          Yêu cầu cần thiết
        </Typography>
        <FormReactQuillField
          name="prepareMaterial"
          label={'Miêu tả'}
          control={control}
          disable={!isEditable}
        />
      </Box>
      <Box sx={{ height: '60px' }}></Box>
      <Box sx={{ height: '60px', marginBottom: '40px' }}>
        <Typography variant="h6" fontWeight="bold" fontSize="18px">
          Thông tin cơ bản
        </Typography>
        <Grid container width="100%" columnSpacing="20px">
          <Grid item xs={4}>
            <FormSelectField<Level>
              name="levelId"
              control={control}
              label="Cấp độ"
              formInputOptions={levels}
              disable={!isEditable}
            />
          </Grid>
          <Grid item xs={4}>
            <FormSelectField<Category>
              name="categoryId"
              control={control}
              label="Thể loại"
              formInputOptions={categories}
              disable={!isEditable}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: '60px' }}></Box>
      {isEditable && (
        <Grid container>
          <Grid item>
            <Button
              onClick={() => reset()}
              variant={'outlined'}
              size="large"
              sx={{
                // marginTop: '100px',
                borderColor: MainColor.RED_500,
                color: MainColor.RED_500,
                fontWeight: '600',
                width: '140px',
                '&:hover': {
                  borderColor: MainColor.RED_500,
                  backgroundColor: '#d1d0d0',
                },
              }}
            >
              {'Đặt lại'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleSubmit(submitHandler)}
              variant={'contained'}
              size="large"
              sx={{
                backgroundColor: MainColor.RED_500,
                fontWeight: '600',
                width: '140px',
                marginLeft: '10px',
                '&:hover': {
                  backgroundColor: MainColor.RED_600,
                },
              }}
              // disabled={props.isLogging}
            >
              {/* {!props.isLogging ? 'Đăng nhập' : <CircularProgress size="26px" />} */}
              {'Cập nhật'}
            </Button>
          </Grid>
        </Grid>
      )}
    </Stack>
  )
}

export default EditCourseBasicInformationForm
