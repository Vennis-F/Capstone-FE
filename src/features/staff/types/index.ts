import { UserRole } from '../../../types/index'

export type CreateStaffBodyRequest = {
  firstName: string
  lastName: string
  middleName: string
  userName: string
  password: string
  phoneNumber: string
  role: UserRole
}

export type UpdateStaffBodyRequest = {
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
}

export type StaffFilterResponse = {
  id: string
  firstName: string
  lastName: string
  middleName: string

  userName: string
  password: string
  avatar: string | null
  phoneNumber: string
  status: string
  email: string
  active: boolean
}
