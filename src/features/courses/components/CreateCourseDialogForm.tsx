import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { Category } from 'features/category/types'
import { CreateCourseFormInput } from 'features/instructor/types/form.type'
import { Level } from 'features/level/types'
import { MainColor } from 'libs/const/color'
import FormSelectField from 'libs/ui/form-components/FormSelectField'
import { FormTextField } from 'libs/ui/form-components/FormTextField'

export type Props = {
  defaultValues?: CreateCourseFormInput
  onSubmitClick(data: CreateCourseFormInput, reset: UseFormReset<CreateCourseFormInput>): void
  openDialog: boolean
  handleOpenDialog: () => void
  handleCloseDialog: () => void
  isLoading: boolean
  levels: Level[]
  categories: Category[]
  // otherValues: { url?: string; postId: string }
}

const CreateCourseDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick, levels, categories } = props

  const newValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Không được để trống tiêu đề')
      .max(100, 'Tiêu đề không được quá 100 ký tự'),
    categoryId: Yup.string().required('Không được để trống thể loại'),
    levelId: Yup.string().required('Không được để trống cấp độ'),
  })

  const methods = useForm<CreateCourseFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    // formState: { isDirty, dirtyFields }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: CreateCourseFormInput) => {
    onSubmitClick(data, reset)
  }
  console.log('[defaultValues]', defaultValues)

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Tạo khóa học mới
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tiêu đề
          </Typography>
          <FormTextField name="title" control={control} size="small" />
        </Box>
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Thông tin cơ bản
          </Typography>
          <Grid container width="100%" columnSpacing="20px" marginTop="20px">
            <Grid item xs={4}>
              <FormSelectField<Level>
                name="levelId"
                control={control}
                label="Cấp độ"
                formInputOptions={levels}
              />
            </Grid>
            <Grid item xs={4}>
              <FormSelectField<Category>
                name="categoryId"
                control={control}
                label="Thể loại"
                formInputOptions={categories}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ height: '60px', marginBottom: '40px' }} />
        <Button
          onClick={handleSubmit(submitHandler)}
          variant={'contained'}
          size="large"
          sx={{
            width: '140px',
            backgroundColor: MainColor.RED_500,
            fontWeight: '600',
            '&:hover': {
              backgroundColor: MainColor.RED_600,
            },
          }}
          disabled={props.isLoading}
        >
          {!props.isLoading ? 'Tạo mới' : <CircularProgress size="26px" />}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default CreateCourseDialogForm
