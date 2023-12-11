/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { CreateRefundBodyRequest, RefundFilterResponse } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const REFUND_BASE_URL = `/refund`

export const createRefundByCustomer = (
  orderDetailId: string,
  body: CreateRefundBodyRequest,
): Promise<void> => api.post(`${REFUND_BASE_URL}/create?orderDetailId=${orderDetailId}`, body)

export const getRefundsByAdmin = (): Promise<RefundFilterResponse[]> =>
  api.get(`${REFUND_BASE_URL}`)

export const getRefundsCustomerByCustomerId = (
  customerId: string,
): Promise<RefundFilterResponse[]> => api.get(`${REFUND_BASE_URL}/customer/${customerId}`)

export const getRefundById = (refundId: string): Promise<RefundFilterResponse> =>
  api.get(`${REFUND_BASE_URL}/${refundId}`)

export const approveRefundByAdmin = (refundId: string): Promise<void> =>
  api.get(`${REFUND_BASE_URL}/approve/${refundId}`)