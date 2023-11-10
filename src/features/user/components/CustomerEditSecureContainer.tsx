import Box from '@mui/material/Box'
import { UseFormReset } from 'react-hook-form'

import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { changePasswordUser } from '../apis'
import { ChangePasswordUserBodyRequest } from '../types'

import { CustomerChangePasswordForm } from './CustomerChangePasswordForm'

const CustomerEditSecureContainer = () => {
  const handleSubmitChangePassword = async (
    data: ChangePasswordUserBodyRequest,
    reset: UseFormReset<ChangePasswordUserBodyRequest>,
  ) => {
    try {
      await changePasswordUser(data)
      toastSuccess({ message: 'Đổi mật khẩu thành công' })
      reset()
    } catch (error) {
      console.log('[ChangePassword] ', error)
      toastError({ message: 'Đổi mật khẩu không thành công!' })
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <CustomerChangePasswordForm onSubmitClick={handleSubmitChangePassword} />
    </Box>
  )
}

export default CustomerEditSecureContainer
