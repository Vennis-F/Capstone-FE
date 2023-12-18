/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken, onMessage } from 'firebase/messaging'

import { Env } from 'config/Env'
import { messaging } from 'config/firebase/firebase'
import makeApi from 'libs/core/configureAxios'
import { toastError } from 'libs/utils/handle-toast'

import { CreateDeviceTokenBodyRequest, NotificationResponse } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)

const DEVICE_BASE_URL = `/device`
const DYNAMODB_BASE_URL = `/dynamodb`

export const saveDevice = (body: CreateDeviceTokenBodyRequest): Promise<void> =>
  api.post(`${DEVICE_BASE_URL}/save`, body)

export const getNotifications = (): Promise<NotificationResponse[]> =>
  api.get(`${DYNAMODB_BASE_URL}/notifications`)

export const requestPermission = async () => {
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey:
        'BLzqxKvgO3Rkx0jqR4QZeuwXNRaaKaTQFb4RWpTqI0mal9nfmTMqdkYSayD0wgfnZ6q1oXF3uFVGlbBbGWTJ17I',
    })

    console.log('Token Gen', token)

    return token
  }

  if (permission === 'denied') {
    toastError({ message: 'Hãy mở cho phép thông báo trên trình duyệt' })
    return null
  }
  return null
}

export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload)
    })
  })

export const updateNotificationSeen = (createdDate: string): Promise<void> =>
  api.put(`${DYNAMODB_BASE_URL}/notification/seen?createdDate=${createdDate}`)
