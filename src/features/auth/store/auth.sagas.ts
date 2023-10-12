import { SagaIterator } from '@redux-saga/core'
import { PayloadAction } from '@reduxjs/toolkit'
import { take, fork, call, delay, put } from 'redux-saga/effects'

import decodeToken from 'libs/utils/decode-token'
import { ResponseError } from 'types'

import { guestSignIn } from '../api'
import { GuestLoginFormInputPayload, Token, UserInfor } from '../types'

import { authActions } from './auth.slice'

function* handleLogin(payload: GuestLoginFormInputPayload) {
  yield delay(3000)
  try {
    console.log('[SAGA LOGGGING]')
    const { accessToken }: Token = yield call(guestSignIn, payload.guessLoginFormInput)
    yield call(() => localStorage.setItem('access_token', accessToken))
    const decoded = decodeToken(accessToken)
    const userInfor: UserInfor = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
    }
    yield put(authActions.loginSuccess(userInfor))
    payload.callbackSuccess()
    // redirect to homepage
  } catch (error) {
    const errorResponse = error as ResponseError
    const msgError = errorResponse?.response?.data?.message || 'Không thể đăng nhập'
    payload.callbackFail(msgError)
    yield put(authActions.loginFailed(msgError))
  }
}

function* handleLogout() {
  console.log('[SAGA LOGOUT]')
  yield delay(1000)
  localStorage.removeItem('access_token')
  // redirect to login page
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'))
    console.log('WATCH LOGIN')
    if (!isLoggedIn) {
      const action: PayloadAction<GuestLoginFormInputPayload> = yield take(authActions.login.type)
      yield fork(handleLogin, action.payload)
    }

    yield take([authActions.logout.type, authActions.loginFailed.type])
    if (localStorage.getItem('access_token')) yield call(handleLogout)
  }
}

export function* authWatcherSaga(): SagaIterator {
  yield fork(watchLoginFlow)
}

export default authWatcherSaga
