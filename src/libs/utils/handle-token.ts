import jwt_decode from 'jwt-decode'

import { UserInfor } from 'features/auth/types'

const TOKEN = 'access_token'

const DEVICE_TOKEN = 'device_token'

export const decodeToken = (accessToken: string): UserInfor => jwt_decode(accessToken)

export const getAccessToken = () => localStorage.getItem(TOKEN)

export const setAccessToken = (token: string) => localStorage.setItem(TOKEN, token)

export const removeAccessToken = () => localStorage.removeItem(TOKEN)

export const getUserRole = () => decodeToken(getAccessToken() as string).role

export const getUserRoleOrNull = () => {
  const accessToken = getAccessToken()
  if (!accessToken) return null
  return decodeToken(accessToken).role
}

export const getUserInforOrNull = () => {
  const accessToken = getAccessToken()
  if (!accessToken) return null
  return decodeToken(accessToken)
}

// ----------------------------------------------------------------

export const setDeviceToken = (token: string) => localStorage.setItem(DEVICE_TOKEN, token)

export const getDeviceToken = () => localStorage.getItem(DEVICE_TOKEN)

export const removeDeviceToken = () => localStorage.removeItem(DEVICE_TOKEN)
