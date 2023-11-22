/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Container, Grid, Paper, Typography, Stack, Box } from '@mui/material'
import { useEffect, useState } from 'react'

import { getImage } from 'features/image/components/apis'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { TypeCustomerProfilePageParams } from 'types/params.enum'

import { getProfileUser } from '../apis'
import { UserFilterResponse } from '../types'

import { CustomerAllCourseContainer } from './CustomerAllCourseContainer'
import CustomerEditProfileContainer from './CustomerEditProfileContainer'
import CustomerEditSecureContainer from './CustomerEditSecureContainer'
import CustomerListItemChoice from './CustomerListItemChoice'
import CustomerManagerLearnersContainer from './CustomerManagerLearnersContainer'
import UserUploadAvatar from './UserUploadAvatar'

interface Props {
  typePage: TypeCustomerProfilePageParams
}

const CustomerProfileContainer = ({ typePage }: Props) => {
  const [userProfile, setUserProfile] = useState<UserFilterResponse>()
  const [forceRender, setForceRender] = useState(false)

  const handleForceRender = () => setForceRender(!forceRender)

  const renderRightComponent = () => {
    switch (typePage) {
      case TypeCustomerProfilePageParams.EditProfile:
        return <CustomerEditProfileContainer />
      case TypeCustomerProfilePageParams.EditSecure:
        return <CustomerEditSecureContainer />
      case TypeCustomerProfilePageParams.EditLearner:
        return <CustomerManagerLearnersContainer />
      case TypeCustomerProfilePageParams.EditPhoto:
        return <UserUploadAvatar avatar={userProfile?.avatar} otherAction={handleForceRender} />
      case TypeCustomerProfilePageParams.AllCourse:
        return <CustomerAllCourseContainer />
      default:
        return <CustomerAllCourseContainer />
    }
  }

  const handleGetUser = async () => {
    const useProfile = await getProfileUser()
    setUserProfile(useProfile)
  }

  useEffect(() => {
    handleGetUser()
  }, [forceRender])
  console.log(userProfile)

  return (
    <Container>
      <TitleTypography title="Hồ sơ"></TitleTypography>
      <Grid container>
        <Grid item xs={12} sm={12} md={3} sx={{ backgroundColor: 'pink' }}>
          <Paper elevation={5}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              sx={{ padding: '16px' }}
            >
              <Avatar
                alt="Remy Sharp"
                variant="square"
                sx={{ width: 80, height: 80 }}
                src={userProfile?.avatar ? getImage(userProfile?.avatar) : undefined}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                Nguyễn Hoàng Anh
              </Typography>
            </Stack>
            <CustomerListItemChoice />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Box sx={{ width: '100%' }}>{renderRightComponent()}</Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CustomerProfileContainer
