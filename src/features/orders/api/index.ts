/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { Order, UpdateOrderBodyRequest } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const ORDER_BASE_URL = `/order`

export const createOrder = (): Promise<Order> => api.post(`${ORDER_BASE_URL}/create`)

export const updateOrder = (body: UpdateOrderBodyRequest): Promise<Order> =>
  api.patch(`${ORDER_BASE_URL}/update`, body)

export const findOrdersByUser = (): Promise<Order[]> => api.get(`${ORDER_BASE_URL}/user`)
