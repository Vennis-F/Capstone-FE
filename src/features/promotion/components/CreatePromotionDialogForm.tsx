import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import FormDateField from 'libs/ui/form-components/FormDateField'
import { FormTextField } from 'libs/ui/form-components/FormTextField'

import { CreatePromotionFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: CreatePromotionFormInput
  onSubmitClick(data: CreatePromotionFormInput, reset: UseFormReset<CreatePromotionFormInput>): void
  openDialog: boolean
  handleCloseDialog: () => void
  isLoading: boolean
  // handleOpenDialog: () => void
  // otherValues: { url?: string; postId: string }
}

const CreatePromotionDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick } = props

  const newValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Không được để trống tiêu đề')
      .max(100, 'Tiêu đề không được quá 100 ký tự'),
    discountPercent: Yup.number()
      .required('Không được để trống giảm giá phần trăm')
      .min(10, 'Chiết khấu nhỏ nhất là 10%')
      .max(50, 'Chiết khấu tối đa là 50%'),
    note: Yup.string().required('Không được để trống ghi chú'),
    // .required('Không được để trống tiêu đề')
    // .max(100, 'Tiêu đề không được quá 100 ký tự'),
    code: Yup.string()
      .required('Không được để Mã')
      .min(6, 'Mã có độ dài nhỏ nhất là 6 ký tự')
      .max(10, 'Mã có độ dài tối đa 10 ký tự'),
    amount: Yup.number()
      .required('Không được để trống số lượng người sử dụng')
      .min(1, 'Số lượng người sử dụng nhỏ nhất là 1'),
    // .max(10, 'Mã có độ dài tối đa 10 ký tự'),
  })

  const methods = useForm<CreatePromotionFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    // formState: { isDirty, dirtyFields }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: CreatePromotionFormInput) => {
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
        Tạo mã giảm giá mới
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tiêu đề
          </Typography>
          <FormTextField name="title" control={control} size="small" />
        </Box>
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Phần trăm giảm giá
          </Typography>
          <FormTextField name="discountPercent" type="number" control={control} size="small" />
        </Box>
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Ghi chú
          </Typography>
          <FormTextField name="note" control={control} size="small" />
        </Box>
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Mã
          </Typography>
          <FormTextField name="code" control={control} size="small" />
        </Box>
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Số lượng
          </Typography>
          <FormTextField type="number" name="amount" control={control} size="small" />
        </Box>
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Ngày bắt đầu
          </Typography>
          <FormDateField name="effectiveDate" control={control} />
        </Box>
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Ngày kết thúc
          </Typography>
          <FormDateField name="expiredDate" control={control} />
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

export default CreatePromotionDialogForm
