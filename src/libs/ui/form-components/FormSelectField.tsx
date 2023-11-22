import { TextField, MenuItem } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'

// import { FormInputOptions } from 'types'

interface SelectOption {
  id: string
  name: string
  // If 'name' is a key in T, uncomment the line below
  // name: string;
}

export interface FormInputProps<T> {
  name: string
  control: Control<any> // eslint-disable-line
  label: string
  formInputOptions: T[]
  disable?: boolean
}

export const FormSelectField = <T extends SelectOption>({
  name,
  control,
  label,
  formInputOptions,
  disable,
}: FormInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        fullWidth
        select
        error={!!error}
        label={`Chọn ${label}`}
        onChange={e => onChange(e.target.value)}
        value={value}
        helperText={error ? error.message : null}
        disabled={disable}
      >
        {formInputOptions.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
)

export default FormSelectField
