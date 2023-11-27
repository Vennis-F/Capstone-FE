import { UserRole } from 'types'

export type UserFilterResponse = {
  id: string
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  userName?: string
  avatar?: string
  email?: string
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
