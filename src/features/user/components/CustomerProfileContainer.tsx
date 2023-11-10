/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Container, Grid, Paper, Typography, Stack, Box } from '@mui/material'

import { MyLearningContainer } from 'features/learner/components/MyLearningContainer'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { TypeCustomerProfilePageParams } from 'types/params.enum'

import { CustomerAllCourseContainer } from './CustomerAllCourseContainer'
import CustomerEditProfileContainer from './CustomerEditProfileContainer'
import CustomerEditSecureContainer from './CustomerEditSecureContainer'
import CustomerListItemChoice from './CustomerListItemChoice'
import CustomerManagerLearnersContainer from './CustomerManagerLearnersContainer'
import CustomerSettingContainer from './CustomerSettingContainer'

interface Props {
  typePage: TypeCustomerProfilePageParams
}

const CustomerProfileContainer = ({ typePage }: Props) => {
  const renderRightComponent = () => {
    switch (typePage) {
      case 'edit-profile':
        return <CustomerEditProfileContainer />
      case 'edit-secure':
        return <CustomerEditSecureContainer />
      case 'edit-learner':
        return <CustomerManagerLearnersContainer />
      case 'all-course':
        return <CustomerAllCourseContainer />
      default:
        return <CustomerAllCourseContainer />
    }
  }

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
                src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?auto=format&fit=crop&q=80&w=1925&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Remy Sharp"
                variant="square"
                sx={{ width: 80, height: 80 }}
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
