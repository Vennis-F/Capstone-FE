import { UserRole } from 'types'

export type GuestLoginFormInput = {
  emailOrUsername: string
  password: string
}

export type GuestLoginFormInputPayload = {
  callbackSuccess: any
  callbackFail: any
  guessLoginFormInput: GuestLoginFormInput
}

export type UserInfor = {
  id: string
  email?: string
  username?: string
  role: UserRole
  fullName: string
}

export type Token = {
  accessToken: string
}

export type CustomerSignupRequest = {
  firstName: string
  lastName: string
  middleName: string
  password: string
  phoneNumber: string
  email: string
  role: string
}

export type CustomerConfirmRequest = {
  email: string
  otp: string
}
