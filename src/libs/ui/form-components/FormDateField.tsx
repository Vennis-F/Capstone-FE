import { TextField } from '@mui/material'
import moment from 'moment-timezone' // Import thư viện moment-timezone
import React from 'react'
import { Controller } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'

export interface FormInputProps {
  name: string
  control: Control<any> // eslint-disable-line
  label?: string
  size?: 'small' | 'medium'
  disable?: boolean
}

const FormDateField = ({
  size = 'small',
  name,
  control,
  label,
  disable = false,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => {
      const vietnamTime = value
        ? moment.tz(value, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm')
        : ''

      // Tính toán giá trị minDate là ngày hiện tại
      const minDate = moment().format('YYYY-MM-DDTHH:mm')

      return (
        <TextField
          helperText={error ? error.message : null}
          size={size}
          error={!!error}
          onChange={e => {
            const utcTime = e.target.value
              ? moment.tz(e.target.value, 'Asia/Ho_Chi_Minh').utc().format()
              : ''
            onChange(utcTime)
          }}
          value={vietnamTime}
          fullWidth
          label={label}
          variant="outlined"
          type="datetime-local"
          disabled={disable}
          inputProps={{ min: minDate }} // Giá trị tối thiểu cho ngày giờ
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
        />
      )
    }}
  />
)

export default FormDateField
