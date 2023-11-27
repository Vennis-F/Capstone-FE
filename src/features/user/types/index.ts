import { UserRole } from 'types'

export type UserFilterResponse = {
  id: string
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  email?: string
  userName?: string
  avatar?: string
  role: UserRole
}

export type UpdateProfileBodyRequest = {
  firstName?: string
  lastName?: string
  middleName?: string
  phoneNumber?: string
  userName?: string
}

export type ChangePasswordUserBodyRequest = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export type User = {
  id: string
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  email?: string
  userName?: string
  avatar?: string
  role: UserRole
  status: string
  active: boolean
}
