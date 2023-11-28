import { ToastPosition, toast } from 'react-toastify'

export const toastError = (data: {
  message: string | React.ReactNode
  postion?: ToastPosition
}) => {
  toast.error(data.message, {
    // position: data.postion ? data.postion : 'top-right',
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    style: {
      width: '500px',
    },
  })
}

export const toastWarn = (data: { message: string }) => {
  toast.warn(data.message, {
    // position: 'top-right',
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}

export const toastSuccess = (data: { message: string }) => {
  toast.success(data.message, {
    // position: 'top-right',
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}
