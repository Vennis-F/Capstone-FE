import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'

import { getProfileUser, updateProfile } from '../apis'
import { UserFilterResponse } from '../types'

import { UpdateProfileUserForm } from './UpdateProfileUserForm'

const CustomerEditProfileContainer = () => {
  const [userProfile, setUserProfile] = useState<UserFilterResponse | null>(null)

  const handleGetUserProfile = async () => {
    const userProfileResponse = await getProfileUser()
    setUserProfile(userProfileResponse)
  }

  useEffect(() => {
    handleGetUserProfile()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      {userProfile && (
        <UpdateProfileUserForm
          defaultValues={{
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            middleName: userProfile?.middleName,
            phoneNumber: userProfile?.phoneNumber,
            userName: userProfile?.userName,
          }}
          otherValues={{ email: userProfile?.email }}
          onSubmitClick={data => {
            updateProfile(data)
          }}
        />
      )}
    </Box>
  )
}

export default CustomerEditProfileContainer
