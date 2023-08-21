import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'

import { StyleSxProps } from 'types'

type ButtonDropdownHeaderProps = {
  title: string
  handlerClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const style: StyleSxProps = {
  link: {
    color: 'white',
    borderBottom: '3px solid #111111',
    ':hover': {
      borderBottomColor: '#047C8F',
    },
  },
  title: {
    width: '100%',
    fontSize: 14,
    fontWeight: '500',
    paddingX: 2,
    paddingY: 1,
    ':hover': {
      backgroundColor: '#303030',
      borderRadius: 2,
    },
    display: 'flex',
  },
} as const

const ButtonDropdownHeader = (props: ButtonDropdownHeaderProps) => {
  const { title, handlerClick } = props

  return (
    <>
      <Button
        variant="text"
        sx={style.link}
        id="basic-button"
        aria-haspopup="true"
        onClick={handlerClick}
      >
        <Typography sx={style.title} variant="button">
          {title}
          <ArrowDropDownIcon />
        </Typography>
      </Button>
    </>
  )
}

export default ButtonDropdownHeader
