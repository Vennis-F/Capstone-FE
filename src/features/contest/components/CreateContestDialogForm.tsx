import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React, { useState } from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import UploadImageControl from 'libs/ui/components/UploadImageControl'
import FormDateField from 'libs/ui/form-components/FormDateField'
import FormReactQuillField from 'libs/ui/form-components/FormReactQuillField'
import FormSwitchField from 'libs/ui/form-components/FormSwitchField'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { textFromHTMLCode } from 'libs/utils/handle-html-data'
import { toastWarn } from 'libs/utils/handle-toast'

import { CreateContestFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: CreateContestFormInput
  onSubmitClick(
    data: CreateContestFormInput,
    file: File,
    reset: UseFormReset<CreateContestFormInput>,
  ): void
  openDialog: boolean
  handleOpenDialog: () => void
  handleCloseDialog: () => void
  isLoading: boolean
  // otherValues: { url?: string; postId: string }
}

const CreateContestDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick } = props
  const [previewFile, setPreviewFile] = useState<File | null>(null)

  const newValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Không được để trống tiêu đề')
      .max(100, 'Tiêu đề không được quá 100 ký tự'),
    startedDate: Yup.string().required('Không được để trống ngày bắt đầu'),
    expiredDate: Yup.string().required('Không được để trống ngày kết thúc'),
    discountPercentFirst: Yup.number()
      .required('Không được để trống ngày kết thúc')
      .min(1, 'Nhỏ nhất là 1')
      .max(100, 'Lớn nhất là 100'),
    discountPercentSecond: Yup.number()
      .required('Không được để trống ngày kết thúc')
      .min(1, 'Nhỏ nhất là 1')
      .max(100, 'Lớn nhất là 100'),
    discountPercentThird: Yup.number()
      .required('Không được để trống ngày kết thúc')
      .min(1, 'Nhỏ nhất là 1')
      .max(100, 'Lớn nhất là 100'),
  })

  const methods = useForm<CreateContestFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods

  const submitHandler = (data: CreateContestFormInput) => {
    if (
      !isDirty ||
      textFromHTMLCode(data.description).length === 0 ||
      textFromHTMLCode(data.prize).length === 0 ||
      !previewFile
    ) {
      toastWarn({
        message: 'Điền đầy đủ thông tin trước khi khởi tạo!',
      })
    } else if (
      new Date(data.startedDate).getTime() < new Date().getTime() ||
      new Date(data.expiredDate).getTime() < new Date().getTime()
    ) {
      toastWarn({
        message:
          'Thời gian bắt đầu cuộc thi hoặc thời gian kết thúc cuộc thi phải lớn hơn thời gian hiện tại!',
      })
    } else if (new Date(data.startedDate).getTime() >= new Date(data.expiredDate).getTime()) {
      toastWarn({
        message: 'Thời gian bắt đầu cuộc thi phải bé hơn thời gian kết thúc cuộc thi!',
      })
    } else if (
      !(
        data.discountPercentFirst > data.discountPercentSecond &&
        data.discountPercentSecond > data.discountPercentThird &&
        data.discountPercentFirst > data.discountPercentThird
      )
    ) {
      toastWarn({
        message: 'Mã giảm giá giải nhất phải lớn hơn giải hai và giải hai phải lớn hơn giải ba!',
      })
    } else {
      onSubmitClick(data, previewFile, reset)
    }
  }

  console.log('[defaultValues]', defaultValues)

  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        reset({
          title: '',
          description: '',
          prize: '',
          startedDate: new Date().toUTCString(),
          expiredDate: new Date().toUTCString(),
          discountPercentFirst: 50,
          discountPercentSecond: 40,
          discountPercentThird: 30,
          isVisible: true,
        })
        props.handleCloseDialog()
        setPreviewFile(null)
      }}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Tạo cuộc thi
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px', marginBottom: '35px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tiêu đề
          </Typography>
          <FormTextField name="title" control={control} size="small" />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Miêu tả
          </Typography>
          <FormReactQuillField
            isFull={true}
            name="description"
            label={'Miêu tả'}
            control={control}
          />
        </Box>
        <Box sx={{ height: '60px' }} />
        <Box>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Giải thưởng
          </Typography>
          <FormReactQuillField isFull={true} name="prize" label={'Giải thưởng'} control={control} />
        </Box>
        <Box sx={{ height: '60px' }} />
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Thời gian bắt đầu
          </Typography>
          <FormDateField name="startedDate" control={control} />
        </Box>
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Thời gian kết thúc
          </Typography>
          <FormDateField name="expiredDate" control={control} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Phần trăm giảm giá cho các hạng
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography color="GrayText" fontSize="14px" fontWeight="bold">
                Giải nhất
              </Typography>
              <Box display="flex" alignItems="center" width="80%">
                <FormTextField type="number" name="discountPercentFirst" control={control} />
                <Typography marginLeft="5px">%</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography color="GrayText" fontSize="14px" fontWeight="bold">
                Giải nhì
              </Typography>
              <Box display="flex" alignItems="center" width="80%">
                <FormTextField type="number" name="discountPercentSecond" control={control} />
                <Typography marginLeft="5px">%</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography color="GrayText" fontSize="14px" fontWeight="bold">
                Giải ba
              </Typography>
              <Box display="flex" alignItems="center" width="80%">
                <FormTextField type="number" name="discountPercentThird" control={control} />
                <Typography marginLeft="5px">%</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ height: '10px' }}></Box>
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Hình ảnh
          </Typography>
          <UploadImageControl
            onChangeFile={file => {
              setPreviewFile(file)
            }}
          />
        </Box>

        <Box sx={{ height: '130px' }}></Box>
        <Box sx={{ height: '60px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Phát hành
          </Typography>
          <FormSwitchField name="isVisible" control={control} />
        </Box>
        <Box sx={{ height: '20px' }} />
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

export default CreateContestDialogForm
