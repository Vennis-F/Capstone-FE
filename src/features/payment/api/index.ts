/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { CreatePaymentURLBody } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const PAYMENT_BASE_URL = `/payment`

export const createPaymentURL = (body: CreatePaymentURLBody): Promise<string> =>
  api.post(`${PAYMENT_BASE_URL}/create`, body)
