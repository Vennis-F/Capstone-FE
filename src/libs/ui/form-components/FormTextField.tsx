import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'

export interface FormInputProps {
  name: string
  control: Control<any> // eslint-disable-line
  label?: string
  size?: 'small' | 'medium'
  type?: React.HTMLInputTypeAttribute
  disable?: boolean
  rows?: number
}

export const FormTextField = ({
  size = 'small',
  type = 'text',
  name,
  control,
  label,
  disable = false,
  rows = 1,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        rows={rows}
        multiline={rows > 1}
        helperText={error ? error.message : null}
        size={size}
        error={!!error}
        onChange={onChange}
        value={value}
        fullWidth
        label={label}
        variant="outlined"
        type={type}
        disabled={disable}
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'black',
          },
        }}
      />
    )}
  />
)

export default FormTextField
