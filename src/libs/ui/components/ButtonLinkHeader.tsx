import { Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

import { StyleSxProps } from 'types'

type ButtonLinkHeaderProps = {
  title: string
  to: string
}

const style: StyleSxProps = {
  link: {
    paddingBottom: 2,
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
  },
} as const

const ButtonLinkHeader = (props: ButtonLinkHeaderProps) => {
  const { title, to } = props

  return (
    <>
      <Link
        component={RouterLink}
        to={to}
        variant="button"
        color="white"
        sx={style.link}
        underline="none"
      >
        <Typography sx={style.title} variant="button">
          {title}
        </Typography>
      </Link>
    </>
  )
}

export default ButtonLinkHeader
