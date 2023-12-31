/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { CustomerConfirmRequest, CustomerSignupRequest, GuestLoginFormInput, Token } from '../types'

const api = makeApi(`${Env.API_BASE_URL as string}`)

const AUTH_BASE_URL = `/auth`

export const guestSignIn = (loginFormInput: GuestLoginFormInput): Promise<Token> =>
  api.post(`${AUTH_BASE_URL}/signin`, loginFormInput)

export const guestSignOut = (code: string, deviceToken: string): Promise<void> =>
  api.get(
    `${AUTH_BASE_URL}/signout?code=${code}${deviceToken ? `&deviceToken=${deviceToken}` : ''}`,
  )

export const customerSignUp = (body: CustomerSignupRequest): Promise<{ email: string }> =>
  api.post(`${AUTH_BASE_URL}/customer/signup`, body)

export const customerConfirm = (body: CustomerConfirmRequest): Promise<void> =>
  api.get(`${AUTH_BASE_URL}/customer/confirm?email=${body.email}&otp=${body.otp}`)

export const resendUserOTP = (email: string): Promise<void> =>
  api.get(`${AUTH_BASE_URL}/resend?email=${email}`)
