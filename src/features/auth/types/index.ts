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
  role: string
}

export type Token = {
  accessToken: string
}
