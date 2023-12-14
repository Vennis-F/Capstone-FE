import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { toastWarn } from 'libs/utils/handle-toast'

import { CreateStaffFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: CreateStaffFormInput
  onSubmitClick(data: CreateStaffFormInput, reset: UseFormReset<CreateStaffFormInput>): void
  openDialog: boolean
  handleOpenDialog: () => void
  handleCloseDialog: () => void
  isLoading: boolean
  // otherValues: { url?: string; StaffId: string }
}

const CreateStaffDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick } = props

  const newValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Không được để trống tên'),
    lastName: Yup.string().required('Không được để trống họ'),
    middleName: Yup.string().required('Không được để trống tên đệm'),
    userName: Yup.string()
      .required('Tên đăng nhập không được để trống')
      .min(5, 'Tên đăng nhập có độ dài nhỏ nhất là 5'),
    password: Yup.string()
      .required('Không được để trống mật khẩu')
      .min(8, 'Mật khẩu phải có độ dài nhỏ nhất là 8')
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Mật khẩu phải bao gồm ít nhất 1 ký tự thường, ký tự in hoa và số hoặc ký tự đặc biệt',
      )
      .max(32, 'Mật khẩu phải có độ dài tối đa là 32'),
    phoneNumber: Yup.string()
      .required('Không được để trống số điện thoại')
      .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  })

  const methods = useForm<CreateStaffFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: CreateStaffFormInput) => {
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
        Tạo nhân viên
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Họ
          </Typography>
          <FormTextField name="firstName" control={control} size="small" />
        </Box>
        <Box sx={{ height: '85px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tên đệm
          </Typography>
          <FormTextField name="middleName" control={control} size="small" />
        </Box>
        <Box sx={{ height: '85px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tên
          </Typography>
          <FormTextField name="lastName" control={control} size="small" />
        </Box>
        <Box sx={{ height: '85px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tên đăng nhập
          </Typography>
          <FormTextField name="userName" control={control} size="small" />
        </Box>
        <Box sx={{ height: '85px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Mật khẩu
          </Typography>
          <FormTextField name="password" type="password" control={control} size="small" />
        </Box>
        <Box sx={{ height: '85px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Số điện thoại
          </Typography>
          <FormTextField name="phoneNumber" control={control} size="small" />
        </Box>
        <Box sx={{ height: '15px' }} />
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

export default CreateStaffDialogForm
