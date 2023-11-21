import { TextField, MenuItem } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'

import { FormInputOptions } from 'types'

export interface FormInputProps {
  name: string
  control: Control<any> // eslint-disable-line
  label: string
  formInputOptions: FormInputOptions
}

export const FormSelectField = ({ name, control, label, formInputOptions }: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={formInputOptions[0][0]}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        fullWidth
        select
        error={!!error}
        label={`Select ${label}`}
        onChange={onChange}
        value={value}
        helperText={error ? error.message : null}
      >
        {formInputOptions.map(role => (
          <MenuItem key={role[0]} value={role[1]}>
            {role[1]}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
)

export default FormSelectField
