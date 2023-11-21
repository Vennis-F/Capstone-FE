import { TextField, TextFieldProps } from '@mui/material'

import { StyleSxProps } from 'types'

export type MaxHeightTextAreaProps = TextFieldProps

const MaxHeightTextarea = (props: MaxHeightTextAreaProps) => {
  const styles: StyleSxProps = {
    '& .MuiInputBase-root': {
      width: '320px',
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      padding: '12px',
      borderRadius: '12px 12px 0 12px',
      color: 'grey',
      background: '#fff',
      border: '1px solid grey',
      boxShadow: '0px 2px 2px grey',
    },
  } as const

  // return <StyledTextarea {...props} />
  return <TextField sx={styles['& .MuiInputBase-root']} {...props} />
}

export default MaxHeightTextarea
