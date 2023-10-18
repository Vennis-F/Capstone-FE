import { Navigate, Outlet } from 'react-router-dom'

import { decodeToken, getAccessToken } from 'libs/utils/handle-token'
import { UserRole } from 'types'

type Props = {
  roles: UserRole[]
}

export const PrivateRoute = ({ roles }: Props) => {
  const token = getAccessToken()
  const isLoggedIn = Boolean(token)
  if (!isLoggedIn) return <Navigate to="/guest-login" replace />

  const { role } = decodeToken(token as string)
  const isAuthorized = roles.indexOf(role as UserRole) !== -1
  console.log('[privateRoute]', isAuthorized)
  return isAuthorized ? <Outlet /> : <Navigate to="/" replace />
}
