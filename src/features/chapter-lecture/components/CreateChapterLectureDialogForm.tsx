import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Paper,
  Avatar,
  CircularProgress,
  Grid,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { toastWarn } from 'libs/utils/handle-toast'
import { StyleSxProps } from 'types'

import { CreateChapterLectureFormInput } from '../types/form.type'

const style: StyleSxProps = {
  container: {
    bgcolor: '#FFFFFF',
    padding: '20px',
  },
  formInput: { height: '60px' },
  btnSubmit: {
    backgroundColor: MainColor.RED_500,
    fontWeight: '600',
    '&:hover': {
      backgroundColor: MainColor.RED_600,
    },
    width: '180px',
  },
} as const

export type Props = {
  defaultValues?: CreateChapterLectureFormInput
  onSubmitClick(
    data: CreateChapterLectureFormInput,
    reset: UseFormReset<CreateChapterLectureFormInput>,
  ): void
  openDialog: boolean
  handleOpenDialog: () => void
  handleCloseDialog: () => void
  isLoading: boolean
  type: 'create' | 'update'
}

export const CreateChapterLectureDialogForm = (props: Props) => {
  const {
    openDialog,
    // handleOpenDialog,
    handleCloseDialog,
    isLoading,
    onSubmitClick,
    defaultValues = {
      title: '',
      description: '',
    },
  } = props

  const newValidationSchema = Yup.object().shape({
    title: Yup.string().required('Không được để trống tiêu đề'),
    description: Yup.string().required('Không được để mô tả'),
  })

  const methods = useForm<CreateChapterLectureFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods

  const submitHandler = (data: CreateChapterLectureFormInput) => {
    if (props.type === 'update') {
      if (!isDirty) {
        toastWarn({ message: 'Cập nhật dữ liệu trước khi tiến hành cập nhật!' })
      } else {
        onSubmitClick(data, reset)
      }
    } else onSubmitClick(data, reset)
  }

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth={true}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        {props.type === 'create' ? 'Tạo bài giảng mới' : 'Cập nhật bài giảng'}
      </DialogTitle>

      <Paper
        square={false}
        variant="outlined"
        sx={{ margin: '20px 60px', padding: '40px' }}
        // elevation={20}
      >
        <Stack direction="row" spacing={2}>
          <Box
            sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Avatar
              sx={{ height: '250px !important', width: '250px' }}
              src="https://images.unsplash.com/photo-1493804714600-6edb1cd93080?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Box>
          <Stack
            sx={{ pt: 0, width: '50%' }}
            direction="column"
            spacing={1}
            justifyContent="center"
          >
            <Box sx={style.formInput}>
              <FormTextField name="title" label={'Tiêu đề'} control={control} size="small" />
            </Box>
            <Box sx={style.formInput}>
              <FormTextField
                name="description"
                label={'Mô tả'}
                control={control}
                size="small"
                rows={4}
              />
            </Box>
          </Stack>
        </Stack>
      </Paper>
      <Box
        sx={{
          marginBottom: '20px',
          marginRight: '60px',
        }}
      >
        <Grid container width="100%" justifyContent="flex-end">
          {props.type === 'update' && (
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
          )}
          <Grid item>
            <Button
              onClick={handleSubmit(submitHandler)}
              variant={'contained'}
              size="large"
              sx={style.btnSubmit}
              disabled={isLoading}
            >
              {!isLoading ? (
                `${props.type === 'create' ? 'Tạo mới' : 'Cập nhật'}`
              ) : (
                <CircularProgress size="26px" />
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
