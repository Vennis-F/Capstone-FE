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

export const getRefundsByAdmin = (
  status?: 'approved' | 'not-approved',
): Promise<RefundFilterResponse[]> =>
  api.get(`${REFUND_BASE_URL}${status ? `?status=${status}` : ''}`)

export const getRefundsCustomerByCustomerId = (
  customerId: string,
): Promise<RefundFilterResponse[]> => api.get(`${REFUND_BASE_URL}/customer/${customerId}`)

export const getRefundById = (refundId: string): Promise<RefundFilterResponse> =>
  api.get(`${REFUND_BASE_URL}/${refundId}`)

export const approveRefundByAdmin = (refundId: string): Promise<void> =>
  api.get(`${REFUND_BASE_URL}/approve/${refundId}`)

export const checkRefund = (orderDetailId: string): Promise<boolean> =>
  api.get(`${REFUND_BASE_URL}/isRefund/${orderDetailId}`)

export const askRefund = (refundId: string, question: string): Promise<void> =>
  api.get(`${REFUND_BASE_URL}/ask/question?id=${refundId}&question=${question}`)
