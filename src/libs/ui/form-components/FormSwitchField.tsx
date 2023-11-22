import { Switch } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'

export interface FormSwitchProps {
  name: string
  control: Control<any> // eslint-disable-line
  label?: string
  disable?: boolean
}

export const FormSwitchField = ({ name, control, label, disable = false }: FormSwitchProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <Switch
        checked={value}
        onChange={e => onChange(e.target.checked)}
        disabled={disable}
        inputProps={{ 'aria-label': label }}
      />
    )}
  />
)

export default FormSwitchField
