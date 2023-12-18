/* eslint-disable @typescript-eslint/indent */

import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React, { useEffect } from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import UploadImage from 'libs/ui/components/UploadImage'
import FormDateField from 'libs/ui/form-components/FormDateField'
import FormReactQuillField from 'libs/ui/form-components/FormReactQuillField'
import FormSwitchField from 'libs/ui/form-components/FormSwitchField'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { textFromHTMLCode } from 'libs/utils/handle-html-data'
import { toastWarn } from 'libs/utils/handle-toast'

import { updateContestThumbnailByStaff } from '../api'
import { Contest, ContestStatus } from '../types'
import { EditContestFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: EditContestFormInput
  onSubmitClick(data: EditContestFormInput, reset: UseFormReset<EditContestFormInput>): void
  openDialog: boolean
  handleCloseDialog: () => void
  isLoading: boolean
  otherValues: { url?: string; contestId: string; contest: Contest }
}

const EditContestDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick, otherValues } = props
  console.log(defaultValues)

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

  const methods = useForm<EditContestFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields, isSubmitting }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: EditContestFormInput) => {
    if (
      !isDirty ||
      textFromHTMLCode(data.description).length === 0 ||
      textFromHTMLCode(data.prize).length === 0
    ) {
      toastWarn({
        message: 'Điền đầy đủ thông tin trước khi khởi tạo!',
      })
    } else if (
      (new Date(data.startedDate).getTime() < new Date().getTime() &&
        new Date(data.startedDate).getTime() !==
          new Date(otherValues.contest.startedDate).getTime()) ||
      (new Date(data.expiredDate).getTime() < new Date().getTime() &&
        new Date(data.expiredDate).getTime() !==
          new Date(otherValues.contest.expiredDate).getTime())
    ) {
      toastWarn({
        message:
          'Thời gian bắt đầu hoặc thời gian kết thúc cuộc thi phải lớn hơn thời gian hiện tại!',
      })
    } else if (new Date(data.startedDate).getTime() >= new Date(data.expiredDate).getTime()) {
      toastWarn({
        message: 'Thời gian bắt đầu phải bé hơn thời gian kết thúc!',
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
      onSubmitClick(data, reset)
      // console.log(data, reset, onSubmitClick)
    }
  }

  useEffect(() => {
    console.log(dirtyFields)
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
        Cập nhật Cuộc thi
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px', marginBottom: '25px' }}>
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
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Phát hành
          </Typography>
          <FormSwitchField name="isVisible" control={control} />
        </Box>
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <UploadImage
            url={otherValues.url}
            onUploadToServer={async formData => {
              await updateContestThumbnailByStaff(otherValues.contestId, formData)
            }}
          />
        </Box>
        <Box sx={{ height: '100px' }} />
        {otherValues.contest.status === ContestStatus.ACTIVE &&
          otherValues.contest.status === ContestStatus.ACTIVE && (
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
          )}
      </Stack>
    </Dialog>
  )
}

export default EditContestDialogForm
