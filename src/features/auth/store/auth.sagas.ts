import { SagaIterator } from '@redux-saga/core'
import { PayloadAction } from '@reduxjs/toolkit'
import { take, fork, call, delay, put } from 'redux-saga/effects'

import { ResponseError } from 'libs/utils/handle-saga-error'
import {
  decodeToken,
  getAccessToken,
  getDeviceToken,
  removeAccessToken,
  removeDeviceToken,
  setAccessToken,
} from 'libs/utils/handle-token'

import { guestSignIn, guestSignOut } from '../api'
import { GuestLoginFormInputPayload, Token, UserInfor } from '../types'

import { authActions } from './auth.slice'

function* handleLogin(payload: GuestLoginFormInputPayload) {
  yield delay(3000)
  try {
    console.log('[SAGA LOGGGING]')
    const { accessToken }: Token = yield call(guestSignIn, payload.guessLoginFormInput)
    yield call(() => setAccessToken(accessToken))
    const decoded = decodeToken(accessToken)
    const userInfor: UserInfor = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
      fullName: decoded.fullName,
    }
    yield put(authActions.loginSuccess(userInfor))
    payload.callbackSuccess(decoded.role)
    // redirect to homepage
  } catch (error) {
    const errorResponse = error as ResponseError
    const msgError = errorResponse?.response?.data?.message || 'Không thể đăng nhập'
    payload.callbackFail(msgError)
    yield put(authActions.loginFailed(msgError))
  }
}

function* handleLogout() {
  const accessToken = getAccessToken() as string
  const deviceToken = getDeviceToken() as string

  console.log('[SAGA LOGOUT]', accessToken)

  yield call(guestSignOut, accessToken, deviceToken)
  removeAccessToken()
  if (deviceToken) removeDeviceToken()
  yield delay(1000)
  /*
    Need to check access token is existed in components
  */
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(getAccessToken())
    console.log('WATCH LOGIN')
    if (!isLoggedIn) {
      const action: PayloadAction<GuestLoginFormInputPayload> = yield take(authActions.login.type)
      yield fork(handleLogin, action.payload)
    }

    yield take([authActions.logout.type, authActions.loginFailed.type])
    if (getAccessToken()) yield call(handleLogout)
  }
}

export function* authWatcherSaga(): SagaIterator {
  yield fork(watchLoginFlow)
}

export default authWatcherSaga
