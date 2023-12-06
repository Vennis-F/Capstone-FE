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

export const FormDateField = ({
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
      // Chuyển đổi giá trị ngày giờ từ string sang múi giờ Việt Nam
      const vietnamTime = value
        ? moment.tz(value, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm')
        : ''

      return (
        <TextField
          helperText={error ? error.message : null}
          size={size}
          error={!!error}
          onChange={e => {
            // Chuyển đổi giá trị ngược lại sang múi giờ UTC để lưu vào state của React-hook-form
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
