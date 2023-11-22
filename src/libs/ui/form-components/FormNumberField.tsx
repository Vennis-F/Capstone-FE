/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { Control, Controller } from 'react-hook-form'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumericFormatCustom = (
  props: React.PropsWithChildren<CustomProps>,
  ref: React.ForwardedRef<NumericFormatProps>,
) => {
  const { onChange, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      valueIsNumericString
      suffix="VND"
    />
  )
}

const NumericFormatCustomProps = React.forwardRef<NumericFormatProps, CustomProps>(
  NumericFormatCustom,
)

export interface FormInputProps {
  name: string
  control: Control<any>
  label?: string
  size?: 'small' | 'medium'
  type?: React.HTMLInputTypeAttribute
  disable?: boolean
}

const FormNumberField = ({
  size = 'small',
  //   type = 'text',
  name,
  control,
  label,
  disable = false,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustomProps as any,
        }}
        variant="standard"
        // ---
        helperText={error ? error.message : null}
        size={size}
        error={!!error}
        fullWidth
        disabled={disable}
      />
    )}
  />
)

export default FormNumberField
