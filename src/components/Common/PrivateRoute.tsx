import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import decodeToken from 'libs/utils/decode-token'
import { UserRole } from 'types'

type Props = {
  roles: UserRole[]
}

export const PrivateRoute = ({ roles }: Props) => {
  const token = localStorage.getItem('access_token')
  const isLoggedIn = Boolean(token)
  if (!isLoggedIn) return <Navigate to="/guest-login" replace />

  const { role } = decodeToken(token as string)
  const isAuthorized = roles.indexOf(role as UserRole) !== -1
  console.log('[privateRoute]', isAuthorized)
  return isAuthorized ? <Outlet /> : <Navigate to="/" replace />
}
