import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Grid, MenuItem, TextField, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import Image from 'material-ui-image'
import React from 'react'
import { Controller, UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { Bank } from 'features/instructor/types'
import { UpdateBankForInstructorFormInput } from 'features/instructor/types/form.type'
import { MainColor } from 'libs/const/color'
import { FormTextField } from 'libs/ui/form-components/FormTextField'

export type Props = {
  listBanks: Bank[]
  isLoading: boolean
  defaultValues?: UpdateBankForInstructorFormInput
  onSubmitClick(
    body: UpdateBankForInstructorFormInput,
    reset: UseFormReset<UpdateBankForInstructorFormInput>,
  ): void
}

const InstructorUploadBankForm = (props: Props) => {
  const { defaultValues, onSubmitClick, listBanks } = props

  const newCharacterValidationSchema = Yup.object().shape({
    bank: Yup.string().required('Không được để trống tên ngân hàng'),
    accountNumber: Yup.string().required('Không được để trống số tài khoản ngân hàng'),
    accountHolderName: Yup.string().required('Không được để trống tên chủ tài khoản ngân hàng'),
  })

  const methods = useForm<UpdateBankForInstructorFormInput>({
    defaultValues,
    resolver: yupResolver(newCharacterValidationSchema),
  })

  const { control, reset, handleSubmit } = methods
  const submitHandler = (body: UpdateBankForInstructorFormInput) => {
    onSubmitClick(body, reset)
  }

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      {/* <Box sx={{ height: '60px' }}>
        <FormTextField name="bank" label={'Tên ngân hàng'} control={control} />
      </Box> */}
      <Box sx={{ height: '60px', width: '100%', marginBottom: '15px' }}>
        <Controller
          name="bank"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              select
              error={!!error}
              label={`Chọn ngân hàng`}
              onChange={e => onChange(e.target.value)}
              value={value}
              helperText={error ? error.message : null}
              // disabled={disable}
              sx={{ fontFamily: 'sans-serif' }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      width: '60px',
                      maxHeight: '300px',
                      marginTop: '8px',
                    },
                  },
                },
              }}
            >
              {listBanks.map(option => (
                <MenuItem key={option.id} value={option.code}>
                  <Grid container alignItems="center">
                    <Grid item xs={2}>
                      <Image
                        src={`${option.logo}`}
                        style={{ height: '40px', width: '60px', padding: 0 }}
                        imageStyle={{ height: '40px', width: '60px' }}
                      />
                    </Grid>
                    <Grid item xs={9} marginLeft="10px">
                      <Typography component="span" sx={{ fontFamily: 'sans-serif' }}>
                        {option.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="accountNumber" label={'Số tài khoản'} control={control} />
      </Box>
      <Box sx={{ height: '60px' }}>
        <FormTextField name="accountHolderName" label={'Tên chủ tài khoản'} control={control} />
      </Box>
      <Button
        onClick={handleSubmit(submitHandler)}
        variant={'contained'}
        size="large"
        sx={{
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
    </Stack>
  )
}

export default InstructorUploadBankForm
