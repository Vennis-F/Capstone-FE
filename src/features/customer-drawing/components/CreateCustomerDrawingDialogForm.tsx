import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React, { useEffect, useState } from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import UploadImageControl from 'libs/ui/components/UploadImageControl'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { toastWarn } from 'libs/utils/handle-toast'

import { CreateCustomerDrawingFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: CreateCustomerDrawingFormInput
  onSubmitClick(
    data: CreateCustomerDrawingFormInput,
    file: File,
    reset: UseFormReset<CreateCustomerDrawingFormInput>,
  ): void
  openDialog: boolean
  handleCloseDialog: () => void
  isLoading: boolean
  //   otherValues?: { url?: string; contestId: string }
}

const CreateCustomerDrawingDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick } = props
  const [previewFile, setPreviewFile] = useState<File | null>(null)

  const newValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Không được để trống tiêu đề')
      .max(100, 'Tiêu đề không được quá 100 ký tự'),
    description: Yup.string().required('Không được để trống miêu tả'),
  })

  const methods = useForm<CreateCustomerDrawingFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields, isSubmitting }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: CreateCustomerDrawingFormInput) => {
    console.log('[submit]', isDirty, dirtyFields, data)
    if (
      !isDirty ||
      !previewFile
      //   !isDirty ||
      //   (data.description && textFromHTMLCode(data.description).length === 0) ||
      //   (data.prize && textFromHTMLCode(data.prize).length === 0)
    ) {
      toastWarn({ message: 'Điền đầy đủ thông tin trước khi tiến hành đăng tải!' })
    } else {
      onSubmitClick(data, previewFile, reset)
    }
  }

  useEffect(() => {
    if (!isSubmitting) methods.reset(props.defaultValues)
  }, [props.defaultValues])

  console.log('[defaultValues]', defaultValues, isSubmitting)

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Đăng tải bài vẽ
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tiêu đề
          </Typography>
          <FormTextField name="title" control={control} size="small" />
        </Box>
        <Box sx={{ height: '60px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Miêu tả
          </Typography>
          <FormTextField name="description" control={control} size="small" rows={3} />
        </Box>
        <Box sx={{ height: '100px' }} />
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <UploadImageControl
            onChangeFile={file => {
              setPreviewFile(file)
            }}
          />
        </Box>
        <Box sx={{ height: '100px' }} />
        <Grid container>
          <Grid item>
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
              {!props.isLoading ? 'Đăng tải' : <CircularProgress size="26px" />}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Dialog>
  )
}

export default CreateCustomerDrawingDialogForm
