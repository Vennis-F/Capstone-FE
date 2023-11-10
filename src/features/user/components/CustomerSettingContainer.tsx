import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useEffect, useState } from 'react'

import CustomTabPanel from 'libs/ui/custom-components/CustomTabPanel'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { changePasswordUser, getProfileUser, updateProfile } from '../apis'
import { UserFilterResponse } from '../types'

import { CustomerChangePasswordForm } from './CustomerChangePasswordForm'
import { UpdateProfileUserForm } from './UpdateProfileUserForm'

const CustomerSettingContainer = () => {
  const [value, setValue] = useState(0)
  const [userProfile, setUserProfile] = useState<UserFilterResponse | null>(null)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleGetUserProfile = async () => {
    const userProfileResponse = await getProfileUser()
    setUserProfile(userProfileResponse)
  }

  useEffect(() => {
    handleGetUserProfile()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} centered variant="fullWidth">
        <Tab label="Tổng quan" id="overview" />
        <Tab label="Câu hỏi" id="comment" />
        <Tab label="Đánh giá" id="review" />
      </Tabs>
      {/* eslint-disable @typescript-eslint/indent */}
      <CustomTabPanel value={value} index={0}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CustomerChangePasswordForm
          onSubmitClick={async (data, reset) => {
            try {
              await changePasswordUser(data)
              toastSuccess({ message: 'Đổi mật khẩu thành công' })
              reset()
            } catch (error) {
              console.log('[ChangePassword] ', error)
              toastError({ message: 'Đổi mật khẩu không thành công!' })
            }
          }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  )
}

export default CustomerSettingContainer
