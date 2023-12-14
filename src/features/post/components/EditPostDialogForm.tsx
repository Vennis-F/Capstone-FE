import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React, { useEffect } from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import UploadImage from 'libs/ui/components/UploadImage'
import FormReactQuillField from 'libs/ui/form-components/FormReactQuillField'
import FormSwitchField from 'libs/ui/form-components/FormSwitchField'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { textFromHTMLCode } from 'libs/utils/handle-html-data'
import { toastWarn } from 'libs/utils/handle-toast'

import { updatePostThumbnailByStaff } from '../apis'
import { UpdatePostFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: UpdatePostFormInput
  onSubmitClick(data: UpdatePostFormInput, reset: UseFormReset<UpdatePostFormInput>): void
  openDialog: boolean
  handleOpenDialog: () => void
  handleCloseDialog: () => void
  isLoading: boolean
  otherValues: { url?: string; postId: string }
}

const EditPostDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick, otherValues } = props
  console.log(defaultValues)

  const newValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Không được để trống tiêu đề')
      .max(100, 'Tiêu đề không được quá 100 ký tự'),
    description: Yup.string().required('Không được để trống miêu tả'),
    resources: Yup.string().required('Không được để trống bài viét'),
  })

  const methods = useForm<UpdatePostFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields, isSubmitting }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: UpdatePostFormInput) => {
    console.log('[submit]', isDirty, dirtyFields, data)
    if (!isDirty || (data.resources && textFromHTMLCode(data.resources).length === 0)) {
      toastWarn({ message: 'Cập nhật dữ liệu trước khi tiến hành cập nhật!' })
    } else {
      onSubmitClick(data, reset)
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
        Cập nhật Bài viết
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tiêu đề
          </Typography>
          <FormTextField name="title" control={control} size="small" />
        </Box>
        <Box sx={{ height: '60px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Miêu tả
          </Typography>
          <FormTextField name="description" control={control} size="small" />
        </Box>
        <Box sx={{ height: '20px' }} />
        <Box>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Bài viết
          </Typography>
          <FormReactQuillField
            isFull={true}
            name="resources"
            label={'Bài viết'}
            control={control}
          />
        </Box>
        <Box sx={{ height: '60px' }}></Box>
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Hoạt động
          </Typography>
          <FormSwitchField name="active" control={control} />
        </Box>
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <UploadImage
            url={otherValues.url}
            onUploadToServer={async formData => {
              await updatePostThumbnailByStaff(otherValues.postId, formData)
            }}
          />
        </Box>
        <Box sx={{ height: '100px' }} />
        <Grid container>
          <Grid item>
            <Button
              onClick={() => reset()}
              variant={'outlined'}
              size="large"
              sx={{
                marginRight: '20px',
                width: '140px',
                borderColor: MainColor.RED_500,
                color: MainColor.RED_500,
                fontWeight: '600',
                '&:hover': {
                  borderColor: MainColor.RED_500,
                  color: MainColor.RED_500,
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
                width: '140px',
                backgroundColor: MainColor.RED_500,
                fontWeight: '600',
                '&:hover': {
                  backgroundColor: MainColor.RED_600,
                },
              }}
              disabled={props.isLoading}
            >
              {!props.isLoading ? 'Cập nhật' : <CircularProgress size="26px" />}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Dialog>
  )
}

export default EditPostDialogForm
