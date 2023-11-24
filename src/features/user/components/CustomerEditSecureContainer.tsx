import { Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { UseFormReset } from 'react-hook-form'

import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { changePasswordUser } from '../apis'
import { ChangePasswordUserBodyRequest } from '../types'

import { CustomerChangePasswordForm } from './CustomerChangePasswordForm'

const CustomerEditSecureContainer = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitChangePassword = async (
    data: ChangePasswordUserBodyRequest,
    reset: UseFormReset<ChangePasswordUserBodyRequest>,
  ) => {
    setIsLoading(true)
    try {
      await changePasswordUser(data)
      toastSuccess({ message: 'Đổi mật khẩu thành công' })
      reset()
    } catch (error) {
      console.log('[ChangePassword] ', error)
      toastError({ message: 'Đổi mật khẩu không thành công!' })
    }
    setIsLoading(false)
  }

  return (
    <Paper elevation={10} sx={{ padding: '40px', marginX: '50px' }}>
      <Typography variant="h5" fontWeight="bold" marginBottom="20px">
        Đổi mật khẩu
      </Typography>
      <CustomerChangePasswordForm
        onSubmitClick={handleSubmitChangePassword}
        isLoading={isLoading}
      />
    </Paper>
  )
}

export default CustomerEditSecureContainer
