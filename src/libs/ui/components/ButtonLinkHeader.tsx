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
    paddingBottom: 2,
    // borderBottom: '3px solid #eab308',
    ':hover': {
      borderBottom: '3px solid #B0DAFF',
    },
  },
  title: {
    width: '100%',
    fontSize: 14,
    paddingX: 2,
    paddingY: 1,
    fontWeight: 'bold',
    // ':hover': {
    //   backgroundColor: '#303030',
    //   borderRadius: 2,
    // },
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
