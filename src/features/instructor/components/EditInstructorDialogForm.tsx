import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Dialog, DialogTitle, Link, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import RenderImage from 'material-ui-image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { getImage } from 'features/image/components/apis'
import FormSwitchField from 'libs/ui/form-components/FormSwitchField'
import { FormTextField } from 'libs/ui/form-components/FormTextField'

import { InstructorFilterResponse, instructorStatusInfors } from '../types'

export type Props = {
  defaultValues?: InstructorFilterResponse
  // onSubmitClick(data: UpdatePostFormInput, reset: UseFormReset<UpdatePostFormInput>): void
  openDialog: boolean
  handleOpenDialog: () => void
  handleCloseDialog: () => void
  // avatar: string | null
  // isLoading: boolean
  // otherValues: { url?: string; postId: string }
}

const EditInstructorDialogForm = (props: Props) => {
  // const { defaultValues, onSubmitClick, otherValues } = props
  const { defaultValues } = props
  // console.log(defaultValues)

  const newValidationSchema = Yup.object().shape({
    // title: Yup.string()
    //   .required('Không được để trống tiêu đề')
    //   .max(100, 'Tiêu đề không được quá 100 ký tự'),
    // description: Yup.string().required('Không được để trống miêu tả'),
    // resources: Yup.string().required('Không được để trống bài viét'),
  })

  const methods = useForm<InstructorFilterResponse>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    // reset,
    // handleSubmit,

    // formState: { isDirty, dirtyFields, isSubmitting }, // tự nhiêm làm bước này xong thì lại thành công vcl
    formState: { isSubmitting }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  // const submitHandler = (data: UpdatePostFormInput) => {
  //   console.log('[submit]', isDirty, dirtyFields, data)
  //   if (!isDirty || (data.resources && textFromHTMLCode(data.resources).length === 0)) {
  //     toastWarn({ message: 'Cập nhật dữ liệu trước khi tiến hành cập nhật!' })
  //   } else {
  //     onSubmitClick(data, reset)
  //   }
  // }

  const statusInfor = instructorStatusInfors.find(status => status.status === defaultValues?.status)

  useEffect(() => {
    if (!isSubmitting) methods.reset(props.defaultValues)
  }, [props.defaultValues])

  // console.log('[defaultValues]', defaultValues, isSubmitting)

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Thông tin cơ bản của giáo viên
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px' }}>
          <FormTextField name="firstName" label="Tên" disable control={control} size="small" />
        </Box>
        <Box sx={{ height: '60px' }}>
          <FormTextField name="middleName" label="Tên đêm" disable control={control} size="small" />
        </Box>
        <Box sx={{ height: '60px', marginBottom: '25px' }}>
          <FormTextField name="lastName" label="Nguyễn" disable control={control} size="small" />
        </Box>
        <Box sx={{ height: '60px' }}>
          <FormTextField
            name="userName"
            label="Tên đăng nhập"
            disable
            control={control}
            size="small"
          />
        </Box>
        <Box sx={{ height: '60px' }}>
          <FormTextField name="email" label="Email" disable control={control} size="small" />
        </Box>
        <Box sx={{ height: '60px' }}>
          <FormTextField
            name="phoneNumber"
            label="Số điện thoại"
            disable
            control={control}
            size="small"
          />
        </Box>
        <Box sx={{ height: '60px' }}>
          <FormTextField
            name="phoneNumber"
            label="Số điện thoại"
            disable
            control={control}
            size="small"
          />
        </Box>
        <Typography fontWeight="bold" fontSize="18px">
          Thông tin ngân hàng
        </Typography>
        <Box sx={{ height: '60px' }}>
          <FormTextField name="bank" label="Ngân hàng" disable control={control} size="small" />
        </Box>
        <Box sx={{ height: '60px' }}>
          <FormTextField
            name="accountNumber"
            label="Số tài khoản ngân hàng"
            disable
            control={control}
            size="small"
          />
        </Box>
        <Box sx={{ height: '60px' }}>
          <FormTextField
            name="accountHolderName"
            label="Tên chủ tài khoản ngân hàng"
            disable
            control={control}
            size="small"
          />
        </Box>
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Hoạt động
          </Typography>
          <FormSwitchField name="active" disable control={control} />
        </Box>
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Trạng thái:&nbsp;
            <Typography
              component="span"
              color={statusInfor?.color}
              fontWeight="bold"
              fontSize="24px"
            >
              {statusInfor?.vietnamese}
            </Typography>
          </Typography>
        </Box>
        <Link
          href={getImage(defaultValues?.certificateUrl as string)}
          target="_blank"
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            width: '200px',
            border: '2px solid',
            textDecoration: 'none',
            padding: '10px 14px',
            textAlign: 'center',
          }}
        >
          Xem chứng chỉ
        </Link>
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <RenderImage
            src={getImage(defaultValues?.avatar as string)}
            // src={''}
            alt="Preview"
            style={{ height: '148px', width: '244px', padding: 0 }}
            imageStyle={{ height: '148px', width: '244px' }}
          />
        </Box>
        <Box sx={{ height: '100px' }} />
      </Stack>
    </Dialog>
  )
}

export default EditInstructorDialogForm
