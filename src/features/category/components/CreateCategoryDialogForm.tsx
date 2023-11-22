import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { toastWarn } from 'libs/utils/handle-toast'

import { CreateCategoryFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: CreateCategoryFormInput
  onSubmitClick(data: CreateCategoryFormInput, reset: UseFormReset<CreateCategoryFormInput>): void
  openDialog: boolean
  handleOpenDialog: () => void
  handleCloseDialog: () => void
  isLoading: boolean
}

const CreateCategoryDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick } = props

  const newValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Không được để trống tiêu đề')
      .max(100, 'Tiêu đề không được quá 100 ký tự'),
  })

  const methods = useForm<CreateCategoryFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: CreateCategoryFormInput) => {
    console.log('[submit]', isDirty, dirtyFields, data)
    if (!isDirty) {
      toastWarn({
        message: 'Điền đầy đủ thông tin trước khi khởi tạo!',
      })
    } else {
      onSubmitClick(data, reset)
    }
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
        Tạo thể loại
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tiêu đề
          </Typography>
          <FormTextField name="name" control={control} size="small" />
        </Box>
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

export default CreateCategoryDialogForm
