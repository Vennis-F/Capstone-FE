import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from 'store/store' // eslint-disable-line

import { GuestLoginFormInputPayload, UserInfor } from '../types'

export interface AuthState {
  isLoggedIn: boolean
  isLogging: boolean
  currentUser?: UserInfor
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLogging: false,
  currentUser: undefined,
}

// slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    login(state, action: PayloadAction<GuestLoginFormInputPayload>) {
      const isLoggedIn = Boolean(localStorage.getItem('access_token'))
      if (!isLoggedIn) {
        console.log('[SLICE LOGGGING]')
        state.isLogging = true
      }
    },
    loginSuccess(state, action: PayloadAction<UserInfor>) {
      state.isLogging = false
      state.isLoggedIn = true
      state.currentUser = action.payload
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.isLogging = false
    },

    logout(state) {
      const isLoggedIn = Boolean(localStorage.getItem('access_token'))
      if (isLoggedIn) {
        console.log('[SLICE LOGOUT]')
        state.isLoggedIn = false
        state.currentUser = undefined
      }
    },
  },
})

// actions
export const authActions = authSlice.actions

// selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectIsLogging = (state: RootState) => state.auth.isLogging
export const selectCurrentUser = (state: RootState) => state.auth.currentUser

// reducer
export default authSlice.reducer
