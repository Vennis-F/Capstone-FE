import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { authActions, selectCurrentUser, selectIsLoggedIn, selectIsLogging } from '../store'
import { GuestLoginFormInputPayload, UserInfor } from '../types'

export type AuthServiceOperators = {
  isLoggedIn: boolean
  isLogging: boolean
  currentUser?: UserInfor
  guestLogin: (loginFormInput: GuestLoginFormInputPayload) => void
  guestLogout: () => void
}

export const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch()

  return {
    isLoggedIn: useAppSelector(selectIsLoggedIn),
    isLogging: useAppSelector(selectIsLogging),
    currentUser: useAppSelector(selectCurrentUser),

    guestLogin: useCallback(
      (loginFormInput: GuestLoginFormInputPayload) => {
        dispatch(authActions.login(loginFormInput))
      },
      [dispatch],
    ),
    guestLogout: useCallback(() => {
      dispatch(authActions.logout())
    }, [dispatch]),
  }
}

export default useAuthService
