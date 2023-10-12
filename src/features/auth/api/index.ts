/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { GuestLoginFormInput, Token } from '../types'

const api = makeApi(`${Env.API_BASE_URL as string}`)

const AUTH_BASE_URL = `/auth`

export const guestSignIn = (loginFormInput: GuestLoginFormInput): Promise<Token> =>
  api.post(`${AUTH_BASE_URL}/signin`, loginFormInput)
