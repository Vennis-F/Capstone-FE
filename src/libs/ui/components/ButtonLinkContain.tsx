import { Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

import { StyleSxProps } from 'types'

type ButtonLinkHeaderProps = {
  children: React.ReactNode
  to: string
}

const style: StyleSxProps = {
  link: {
    color: '#fde047',
    ':hover': {
      color: '#f0d136',
    },
  },
  title: {
    textTransform: 'capitalize',
    width: '100%',
    fontSize: 14,
    paddingX: 2,
    fontWeight: 'bold',
  },
} as const

const ButtonLinkHeader = ({ children, to }: ButtonLinkHeaderProps) => (
  <Link
    component={RouterLink}
    to={to}
    variant="button"
    color="white"
    sx={style.link}
    underline="none"
  >
    <Typography sx={style.title} variant="button">
      {children}
    </Typography>
  </Link>
)

export default ButtonLinkHeader
