import { Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'

import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { getProfileUser, updateProfile } from '../apis'
import { UserFilterResponse } from '../types'

import { UpdateProfileUserForm } from './UpdateProfileUserForm'

const CustomerEditProfileContainer = () => {
  const [userProfile, setUserProfile] = useState<UserFilterResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetUserProfile = async () => {
    const userProfileResponse = await getProfileUser()
    setUserProfile(userProfileResponse)
  }

  useEffect(() => {
    handleGetUserProfile()
  }, [])

  return (
    <Box sx={{ width: '100%', paddingX: '50px' }}>
      {userProfile && (
        <Paper elevation={10} sx={{ padding: '40px' }}>
          <Typography variant="h5" fontWeight="bold" marginBottom="20px">
            Thông tin cơ bản
          </Typography>
          <UpdateProfileUserForm
            isLoading={isLoading}
            defaultValues={{
              firstName: userProfile?.firstName,
              lastName: userProfile?.lastName,
              middleName: userProfile?.middleName,
              phoneNumber: userProfile?.phoneNumber,
              userName: userProfile?.userName,
            }}
            otherValues={{ email: userProfile?.email }}
            onSubmitClick={async data => {
              setIsLoading(true)
              try {
                await updateProfile(data)
                toastSuccess({ message: 'Cập nhật thông tin cơ bản thành công' })
              } catch (error) {
                showErrorResponseSaga({
                  error,
                  defaultMessage: 'Không thể cập nhật thông tin cơ bản',
                  errorStatusMessages: [{ message: 'Tên đăng nhập đã tồn tại', status: 409 }],
                })
              }
              setIsLoading(false)
            }}
          />
        </Paper>
      )}
    </Box>
  )
}

export default CustomerEditProfileContainer
