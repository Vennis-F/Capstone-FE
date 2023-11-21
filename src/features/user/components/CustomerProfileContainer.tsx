import { Avatar, Container, Grid, Paper, Typography, Stack, Tabs, Tab, Box } from '@mui/material'
import React from 'react'

import TitleTypography from 'libs/ui/components/TitleTypography'

import CustomerListItemChoice from './CustomerListItemChoice'

// type Props = {}

const CustomerProfileContainer = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
        <Grid item xs={12} sm={12} md={9} sx={{ backgroundColor: 'yellow' }}>
          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} centered variant="fullWidth">
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CustomerProfileContainer
