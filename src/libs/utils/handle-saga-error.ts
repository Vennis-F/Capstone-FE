import { toastError } from './handle-toast'

export type ResponseError = {
  response?: {
    data?: {
      message?: string
    }
    status?: number
  }
}

export type ErrorStatusMessage = {
  message: string
  status: number
}

export const showErrorResponseSaga = (data: {
  error: unknown
  defaultMessage: string
  errorStatusMessages?: ErrorStatusMessage[]
}) => {
  const { defaultMessage, errorStatusMessages } = data
  const error = data.error as ResponseError
  let msgError: string | undefined = ''

  if (errorStatusMessages && errorStatusMessages.length > 0) {
    errorStatusMessages.forEach(errStatusMsg => {
      if (error.response?.status === errStatusMsg.status) msgError = errStatusMsg.message
    })
  } else {
    msgError = error.response?.data?.message
  }

  if (!msgError) msgError = defaultMessage

  toastError({ message: msgError as string })
}
