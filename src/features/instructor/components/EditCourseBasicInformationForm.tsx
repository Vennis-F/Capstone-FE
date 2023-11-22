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
import { getUserRole } from 'libs/utils/handle-token'
import { UserRole } from 'types'

import { UpdateCourseFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: UpdateCourseFormInput
  // otherValues: { email?: string }
  onSubmitClick(data: UpdateCourseFormInput, reset: UseFormReset<UpdateCourseFormInput>): void
  levels: Level[]
  categories: Category[]
}

const EditCourseBasicInformationForm = (props: Props) => {
  const {
    // otherValues,
    defaultValues,
    onSubmitClick,
    levels,
    categories,
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
        <FormTextField
          name="title"
          control={control}
          size="small"
          disable={getUserRole() === UserRole.STAFF}
        />
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
          disable={getUserRole() === UserRole.STAFF}
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
          disable={getUserRole() === UserRole.STAFF}
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
              disable={getUserRole() === UserRole.STAFF}
            />
          </Grid>
          <Grid item xs={4}>
            <FormSelectField<Category>
              name="categoryId"
              control={control}
              label="Thể loại"
              formInputOptions={categories}
              disable={getUserRole() === UserRole.STAFF}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: '60px' }}></Box>
      {getUserRole() === UserRole.INSTRUCTOR && (
        <>
          <Button
            onClick={() => reset()}
            variant={'contained'}
            size="large"
            sx={{
              marginTop: '100px',
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
        </>
      )}
    </Stack>
  )
}

export default EditCourseBasicInformationForm
