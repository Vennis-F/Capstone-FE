/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { TransactionOrderDetailResponse, TransactionPayOffResponse } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const TRANSACTION_PAY_OFF_BASE_URL = `/transaction-pay-off`

export const createTractionPayOffByAdmin = (instructorId: string): Promise<void> =>
  api.post(`${TRANSACTION_PAY_OFF_BASE_URL}/payment/${instructorId}`)

export const getTransactionPayOffsByInstructor = (): Promise<TransactionPayOffResponse[]> =>
  api.get(`${TRANSACTION_PAY_OFF_BASE_URL}`)

export const getTransactionPayOffByIdByInstructor = (
  transactionPayOffId: string,
): Promise<TransactionPayOffResponse> =>
  api.get(`${TRANSACTION_PAY_OFF_BASE_URL}/${transactionPayOffId}`)

// ------------------------

const TRANSACTION_ORDER_DETAIL_BASE_URL = `/transaction-order-detail`

export const getTransactionOrderDetailForInstructorByAdmin = (
  instructorId: string,
): Promise<TransactionOrderDetailResponse[]> =>
  api.get(`${TRANSACTION_ORDER_DETAIL_BASE_URL}/instructor/${instructorId}`)

export const getTransactionOrderDetailByTransacionPayOffByInstructor = (
  transactionPayOffId: string,
): Promise<TransactionOrderDetailResponse[]> =>
  api.get(`${TRANSACTION_ORDER_DETAIL_BASE_URL}/transaction-pay-off/${transactionPayOffId}`)
