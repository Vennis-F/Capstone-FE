import { ResponseError } from 'types'

import { toastError } from './handle-toast'

export const showErrorResponseSaga = (data: { error: unknown; defaultMessage: string }) => {
  const errorResponse = data.error as ResponseError
  const msgError = errorResponse?.response?.data?.message || data.defaultMessage
  toastError({ message: msgError })
}
